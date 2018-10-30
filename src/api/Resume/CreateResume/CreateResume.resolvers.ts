import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import Resume from "src/entities/Resume";
import {
  CreateResumeMutationArgs,
  CreateResumeResponse
} from "src/types/graph";
import User from "src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CreateResume: privateResolver(
      async (
        _,
        { name, content, authorId }: CreateResumeMutationArgs,
        { req }
      ): Promise<CreateResumeResponse> => {
        try {
          const { user } = req;
          if (user.id === authorId) {
            const newresume = await Resume.create({
              name,
              content,
              authorId: user.id,
              author: user
            }).save();
            await User.update(
              { id: user.id },
              { lastName: "Kooo", resume: newresume }
            );
            console.log(newresume, user.resume, user.id);
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "You are not authorized to create Resume."
            };
          }
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
