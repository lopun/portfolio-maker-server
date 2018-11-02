import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import { CreateLikeResponse, CreateLikeMutationArgs } from "src/types/graph";
import Like from "src/entities/Like";
import User from "src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CreateLike: privateResolver(
      async (
        _,
        { receiverId }: CreateLikeMutationArgs,
        { req }
      ): Promise<CreateLikeResponse> => {
        try {
          const { user } = req;
          const existingLike = await Like.findOne({
            creatorId: user.id,
            receiverId
          });
          if (existingLike) {
            await Like.update(
              { id: existingLike.id },
              { state: existingLike.state === "LIKE" ? "DISLIKE" : "LIKE" }
            );
          } else {
            const receiver = await User.findOne({ id: receiverId });
            if (receiver) {
              const like = await Like.create({
                creator: user,
                creatorId: user.id,
                receiverId,
                receiver,
                state: "LIKE"
              }).save();
              console.log(like);
              await User.update(
                { id: receiverId },
                {
                  likeAsReceiver: receiver.likeAsReceiver
                    ? [...receiver.likeAsReceiver, like]
                    : [like]
                }
              );
              await User.update(
                { id: user.id },
                {
                  likeAsCreator: user.likeAsCreator
                    ? [...user.likeAsCreator, like]
                    : [like]
                }
              );
            } else {
              return {
                ok: false,
                error: "User does not exist."
              };
            }
          }
          return {
            ok: true,
            error: null
          };
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
