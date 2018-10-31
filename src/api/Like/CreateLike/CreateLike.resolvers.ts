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
              { state: existingLike.state === 0 ? 1 : 0 }
            );
          } else {
            const receiver = await User.findOne({ id: receiverId });
            if (receiver) {
              const like = await Like.create({
                creator: user,
                creatorId: user.id,
                receiverId,
                receiver,
                state: 1
              }).save();
              console.log(like);
              console.log(user.createdLikes);
              console.log(receiver.receivedLikes);
              await User.update(
                { id: user.id },
                {
                  createdLikes: user.createdLikes
                    ? [...user.createdLikes, like]
                    : [like]
                }
              );
              await User.update(
                { id: user.id },
                {
                  receivedLikes: receiver.receivedLikes
                    ? [...receiver.receivedLikes, like]
                    : [like]
                }
              );
              console.log(user.createdLikes);
              console.log(receiver.receivedLikes);
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
