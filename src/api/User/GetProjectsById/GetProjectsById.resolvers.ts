import { Resolvers } from "src/types/resolvers";
import { GetProjectsByIdResponse } from "src/types/graph";
import Project from "src/entities/Project";
import privateResolver from "src/utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetProjectsById: privateResolver(
      async (_, __, { req }): Promise<GetProjectsByIdResponse> => {
        try {
          const { user } = req;
          const projects = await Project.find({ authorId: user.id });
          if (projects) {
            return {
              ok: true,
              error: null,
              projects
            };
          } else {
            return {
              ok: false,
              error: "Projects Not Found",
              projects: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            projects: null
          };
        }
      }
    )
  }
};

export default resolvers;
