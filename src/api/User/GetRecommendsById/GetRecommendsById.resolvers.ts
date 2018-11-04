import { Resolvers } from "src/types/resolvers";
import {
  GetRecommendsByIdQueryArgs,
  GetRecommendsByIdResponse
} from "src/types/graph";
import Recommend from "src/entities/Recommend";

const resolvers: Resolvers = {
  Query: {
    GetRecommendsById: async (
      _,
      { id }: GetRecommendsByIdQueryArgs
    ): Promise<GetRecommendsByIdResponse> => {
      try {
        const recommends = await Recommend.find({ receiverId: id });
        return {
          ok: true,
          error: null,
          recommends
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          recommends: null
        };
      }
    }
  }
};

export default resolvers;
