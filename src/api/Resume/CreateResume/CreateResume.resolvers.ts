import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import Resume from "src/entities/Resume";
import {
  CreateResumeMutationArgs,
  CreateResumeResponse
} from "src/types/graph";

const resolvers: Resolvers = {
  Mutation: {
    CreateResume: privateResolver(
      async (
        _,
        { name, content, authorId }: CreateResumeMutationArgs,
        { req }
      ): Promise<CreateResumeResponse> => {
        try {
          const {
            user: { id }
          } = req;
          if (id === authorId) {
            Resume.create({
              name,
              content,
              authorId
            });
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
