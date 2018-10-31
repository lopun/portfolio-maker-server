import { Resolvers } from "src/types/resolvers";
import Resume from "src/entities/Resume";
import { GetResumeResponse, GetResumeQueryArgs } from "src/types/graph";

const resolvers: Resolvers = {
  Query: {
    GetResume: async (
      _,
      { id }: GetResumeQueryArgs,
      ___
    ): Promise<GetResumeResponse> => {
      try {
        const resume = await Resume.findOne({ id }, { relations: ["author"] });
        if (resume) {
          return {
            ok: true,
            error: null,
            resume
          };
        } else {
          return {
            ok: false,
            error: "Resume Not Found",
            resume: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          resume: null
        };
      }
    }
  }
};

export default resolvers;
