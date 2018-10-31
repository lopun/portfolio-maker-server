import { Resolvers } from "src/types/resolvers";
import { AllLikesResponse } from "src/types/graph";
import Like from "src/entities/Recommend";
import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    AllLikes: async (): Promise<AllLikesResponse> => {
      try {
        const likes = await getRepository(Like).find();
        if (likes) {
          return { ok: true, error: null, likes };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          likes: null
        };
      }
    }
  }
};

export default resolvers;
