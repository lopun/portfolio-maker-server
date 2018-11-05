import { Resolvers } from "src/types/resolvers";
import { GetProjectsByIdResponse } from "src/types/graph";
import Project from "src/entities/Project";
import privateResolver from "src/utils/privateResolver";
import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetProjectsById: privateResolver(
      async (_, __, { req }): Promise<GetProjectsByIdResponse> => {
        try {
          const { user } = req;
          const projects = await getRepository(Project).find({
            where: { authorId: user.id },
            relations: ["author"]
          });
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
