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
        try {
          await User.update(
            {
              id: user.id
            },
            { ...notNull }
          );
          if (notNull.password !== null) {
            // User Entity를 보면 @BeforeUpdate Decorator이 있다.
            // 이부분은 user instance를 건들여야만 실행되는데, 아래에 있는 User.update는
            // instance를 건들이지 않는다.(hash가 되지 않음) 고로 password는 직접 업데이트를 해줌으로써
            // @BeforeUpdate가 실행되도록! 해야함.
            user.password = notNull.password;
            await user.save();
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
