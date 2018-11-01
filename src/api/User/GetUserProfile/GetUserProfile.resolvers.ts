import { Resolvers } from "src/types/resolvers";
import User from "src/entities/User";
import {
  GetUserProfileQueryArgs,
  GetUserProfileResponse
} from "src/types/graph";

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
      if (user) {
        return {
          ok: true,
          error: null,
          user
        };
      } else {
        return {
          ok: false,
          error: "User not found!",
          user: null
        };
      }
    }
  }
};

export default resolvers;
