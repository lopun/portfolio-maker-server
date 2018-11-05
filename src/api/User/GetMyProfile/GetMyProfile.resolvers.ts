import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Like from "src/entities/Like";
import { GetMyProfileResponse } from "src/types/graph";
import User from "src/entities/User";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(
      async (_, __, { req }): Promise<GetMyProfileResponse> => {
        const { user } = req;
        const foundUser = await User.findOne(
          { id: user.id },
          { relations: ["resume"] }
        );
        const likes = await Like.find({ receiverId: user.id, state: "LIKE" });
        console.log(likes);
        let likeCount;
        if (likes) {
          likeCount = likes.length;
        } else {
          likeCount = 0;
        }
        return {
          ok: true,
          error: null,
          user: foundUser!,
          likeCount
        };
      }
    )
  }
};

export default resolvers;
