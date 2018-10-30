import { Resolvers } from "src/types/resolvers";
import Resume from "src/entities/Resume";
import { AllResumesResponse } from "src/types/graph";

const resolvers: Resolvers = {
  Query: {
    AllResumes: async (_, __, ___): Promise<AllResumesResponse> => {
      try {
        const resumes = await Resume.find({
          relations: ["author"]
        });
        console.log(resumes);
        return {
          ok: true,
          error: null,
          resumes
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          resumes: null
        };
      }
    }
  }
};

export default resolvers;
