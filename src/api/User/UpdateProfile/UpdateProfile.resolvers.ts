import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateProfileMutationArgs,
  UpdateProfileResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateProfile: privateResolver(
      async (
        _,
        args: UpdateProfileMutationArgs,
        { req }
      ): Promise<UpdateProfileResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);
        if (notNull.password) {
          user.password = notNull.password;
          user.save();
          delete notNull.password;
        }
        try {
          await User.update({ id: user.id }, { ...notNull });
          return { ok: true, error: null };
        } catch (error) {
          return { ok: false, error: error.message };
        }
      }
    )
  }
};

export default resolvers;
