import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import { CreateLikeResponse, CreateLikeMutationArgs } from "src/types/graph";
import Like from "src/entities/Like";
import Project from "src/entities/Project";
import User from "src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CreateLike: privateResolver(
      async (
        _,
        { projectId }: CreateLikeMutationArgs,
        { req }
      ): Promise<CreateLikeResponse> => {
        try {
          const { user } = req;
          if (user) {
            const existingLike = await Like.findOne({
              creatorId: user.id,
              projectId
            });
            const project = await Project.findOne({
              id: projectId
            });
            if (project) {
              let latestLike: Like;
              if (existingLike) {
                await Like.update(
                  { id: existingLike.id },
                  { state: existingLike.state === 0 ? 1 : 0 }
                );
                latestLike = existingLike;
              } else {
                latestLike = await Like.create({
                  creator: user,
                  creatorId: user.id,
                  project,
                  projectId: projectId,
                  state: 1
                }).save();
              }
              await User.update(
                { id: user.id },
                { likes: [...user.likes, latestLike] }
              );
              await Project.update(
                { id: projectId },
                { likes: [...project.likes, latestLike] }
              );
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "There's no project!"
              };
            }
          } else {
            return {
              ok: false,
              error: "You are not authorized!"
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
