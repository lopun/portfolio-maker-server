import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import {
  UpdateRecommendMutationArgs,
  UpdateRecommendResponse
} from "src/types/graph";
import Recommend from "src/entities/Recommend";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRecommend: privateResolver(
      async (
        _,
        { id, content }: UpdateRecommendMutationArgs,
        { req: { user } }
      ): Promise<UpdateRecommendResponse> => {
        try {
          const recommend = await Recommend.findOne({ id });
          if (recommend) {
            if (recommend.creatorId === user.id) {
              await Recommend.update({ id }, { content });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "You are not authorized!"
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
