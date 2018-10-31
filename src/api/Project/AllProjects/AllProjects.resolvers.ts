import { Resolvers } from "src/types/resolvers";
import { AllProjectsResponse } from "src/types/graph";
import Project from "src/entities/Project";

const resolvers: Resolvers = {
  Query: {
    AllProjects: async (_, __, { req }): Promise<AllProjectsResponse> => {
      try {
        const projects = await Project.find();
        return {
          ok: true,
          error: null,
          projects
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          projects: null
        };
      }
    }
  }
};

export default resolvers;
