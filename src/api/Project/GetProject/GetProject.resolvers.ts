import { Resolvers } from "src/types/resolvers";
import { GetProjectResponse, GetProjectQueryArgs } from "src/types/graph";
import Project from "src/entities/Project";

const resolvers: Resolvers = {
  Query: {
    GetProject: async (
      _,
      { id }: GetProjectQueryArgs
    ): Promise<GetProjectResponse> => {
      try {
        const project = await Project.findOne({ id });
        if (project) {
          return {
            ok: true,
            error: null,
            project
          };
        } else {
          return {
            ok: false,
            error: "Project not found!",
            project: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          project: null
        };
      }
    }
  }
};

export default resolvers;
