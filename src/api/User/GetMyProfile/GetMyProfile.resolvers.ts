import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Like from "src/entities/Like";
import { GetMyProfileResponse } from "src/types/graph";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(
      async (_, __, { req }): Promise<GetMyProfileResponse> => {
        const { user } = req;
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
          user,
          likeCount
        };
      }
    )
  }
};

export default resolvers;
