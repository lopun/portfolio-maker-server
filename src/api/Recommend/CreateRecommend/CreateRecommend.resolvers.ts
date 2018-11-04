import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import {
  CreateRecommendMutationArgs,
  CreateRecommendResponse
} from "src/types/graph";
import User from "src/entities/User";
import Recommend from "src/entities/Recommend";

const resolvers: Resolvers = {
  Mutation: {
    CreateRecommend: privateResolver(
      async (
        _,
        { content, receiverId }: CreateRecommendMutationArgs,
        { req: { user } }
      ): Promise<CreateRecommendResponse> => {
        try {
          const receiver = await User.findOne({ id: receiverId });
          if (receiver) {
            const createdRecommend = await Recommend.create({
              content,
              creator: user,
              creatorId: user.id,
              receiverId,
              receiver
            }).save();
            await User.update(
              { id: receiverId },
              {
                recommendAsReceiver: receiver.recommendAsReceiver
                  ? [...receiver.recommendAsReceiver, createdRecommend]
                  : [createdRecommend]
              }
            );
            return { ok: true, error: null };
          } else {
            return {
              ok: false,
              error: "Recommend Receiver Not Found"
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
