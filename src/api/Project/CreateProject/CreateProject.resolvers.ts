import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import {
  CreateProjectMutationArgs,
  CreateProjectResponse
} from "src/types/graph";
import Project from "src/entities/Project";

const resolvers: Resolvers = {
  Mutation: {
    CreateProject: privateResolver(
      async (
        _,
        { name, content }: CreateProjectMutationArgs,
        { req }
      ): Promise<CreateProjectResponse> => {
        try {
          const { user } = req;
          if (user) {
            console.log(user);
            await Project.create({
              name,
              content,
              authorId: user.id,
              author: user
            }).save();
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "You are not authorized"
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
