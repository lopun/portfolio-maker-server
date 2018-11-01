import { Resolvers } from "src/types/resolvers";
import { AllUsersResponse } from "src/types/graph";
import User from "src/entities/User";

const resolvers: Resolvers = {
  Query: {
    AllUsers: async (): Promise<AllUsersResponse> => {
      try {
        const users = await User.find();
        return {
          ok: true,
          error: null,
          users
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          users: null
        };
      }
    }
  }
};

export default resolvers;
