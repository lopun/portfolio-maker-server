import { Resolvers } from "src/types/resolvers";
import { GetRecommendQueryArgs, GetRecommendResponse } from "src/types/graph";
import Recommend from "src/entities/Recommend";

const resolvers: Resolvers = {
  Query: {
    GetRecommend: async (
      _,
      { id }: GetRecommendQueryArgs
    ): Promise<GetRecommendResponse> => {
      const recommend = await Recommend.findOne({ id });
      if (recommend) {
        return { ok: true, error: null, recommend };
      } else {
        return { ok: false, error: "Recommend Not Found", recommend: null };
      }
    }
  }
};

export default resolvers;
