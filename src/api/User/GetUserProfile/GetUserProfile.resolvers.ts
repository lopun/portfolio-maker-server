import { Resolvers } from "src/types/resolvers";
import User from "src/entities/User";
import {
  GetUserProfileQueryArgs,
  GetUserProfileResponse
} from "src/types/graph";
import Like from "src/entities/Like";
import Recommend from "src/entities/Recommend";

const resolvers: Resolvers = {
  Query: {
    GetUserProfile: async (
      _,
      { id }: GetUserProfileQueryArgs,
      { req }
    ): Promise<GetUserProfileResponse> => {
      const user = await User.findOne(
        { id },
        { relations: ["resume", "projects", "recommendAsReceiver"] }
      );
      const likes = await Like.find({ receiverId: id, state: "LIKE" });
      let myLike;
      let existingRecommend;
      if (req.user) {
        myLike = await Like.findOne({ creatorId: req.user.id, receiverId: id });
        existingRecommend = await Recommend.findOne({
          creatorId: req.user.id,
          receiverId: id
        });
      }
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
          likeCount,
          myLike,
          existingRecommend
        };
      } else {
        return {
          ok: false,
          error: "User not found!",
          user: null,
          likeCount,
          myLike: null,
          existingRecommend
        };
      }
    }
  }
};

export default resolvers;
