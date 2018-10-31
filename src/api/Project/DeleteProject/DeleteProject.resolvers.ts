import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import {
  DeleteProjectMutationArgs,
  DeleteProjectResponse
} from "src/types/graph";
import Project from "src/entities/Project";

const resolvers: Resolvers = {
  Mutation: {
    DeleteProject: privateResolver(
      async (
        _,
        { id }: DeleteProjectMutationArgs,
        { req: { user } }
      ): Promise<DeleteProjectResponse> => {
        const project = await Project.findOne({ id });
        if (project) {
          if (user.id === project.authorId) {
            await Project.delete({ id });
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
        } else {
          return {
            ok: false,
            error: "Project Not Found"
          };
        }
      }
    )
  }
};

export default resolvers;
