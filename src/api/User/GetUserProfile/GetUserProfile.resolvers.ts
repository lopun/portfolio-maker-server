import { Resolvers } from "src/types/resolvers";
import User from "src/entities/User";
import {
  GetUserProfileQueryArgs,
  GetUserProfileResponse
} from "src/types/graph";
import Like from "src/entities/Like";

const resolvers: Resolvers = {
  Query: {
    GetUserProfile: async (
      _,
      { id }: GetUserProfileQueryArgs
    ): Promise<GetUserProfileResponse> => {
      const user = await User.findOne(
        { id },
        { relations: ["resume", "projects"] }
      );
      const likes = await Like.find({ receiverId: id, state: "LIKE" });
      console.log(likes);
      let likeCount;
      if (likes) {
        likeCount = likes.length;
      } else {
        likeCount = 0;
      }
      if (user) {
        return {
          ok: true,
          error: null,
          user,
          likeCount
        };
      } else {
        return {
          ok: false,
          error: "User not found!",
          user: null,
          likeCount
        };
      }
    }
  }
};

export default resolvers;
