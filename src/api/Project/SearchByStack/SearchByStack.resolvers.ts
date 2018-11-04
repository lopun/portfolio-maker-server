import { Resolvers } from "src/types/resolvers";
import { SearchByStackQueryArgs, SearchByStackResponse } from "src/types/graph";
import Project from "src/entities/Project";
import { getRepository, Like } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    SearchByStack: async (
      _,
      { input }: SearchByStackQueryArgs
    ): Promise<SearchByStackResponse> => {
      try {
        const projects = await getRepository(Project).find({
          where: { stack: Like(`%${input}%`) },
          relations: ["author"]
        });
        console.log(projects);
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
