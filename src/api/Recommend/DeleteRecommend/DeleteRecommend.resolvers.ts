import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import {
  DeleteRecommendMutationArgs,
  DeleteRecommendResponse
} from "src/types/graph";
import Recommend from "src/entities/Recommend";

const resolvers: Resolvers = {
  Mutation: {
    DeleteRecommend: privateResolver(
      async (
        _,
        { id }: DeleteRecommendMutationArgs,
        { req: { user } }
      ): Promise<DeleteRecommendResponse> => {
        try {
          const recommend = await Recommend.findOne({ id });
          if (recommend) {
            if (user.id === recommend.creatorId) {
              await Recommend.delete({ id });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "You are not authorized"
              };
            }
          } else {
            return {
              ok: false,
              error: "Recommend Not Found"
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
