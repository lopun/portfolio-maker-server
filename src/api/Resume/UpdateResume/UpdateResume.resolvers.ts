import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import {
  UpdateResumeMutationArgs,
  UpdateResumeResponse
} from "src/types/graph";
import Resume from "src/entities/Resume";
import cleanNullArgs from "src/utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateResume: privateResolver(
      async (
        _,
        args: UpdateResumeMutationArgs
      ): Promise<UpdateResumeResponse> => {
        try {
          const resume = Resume.findOne({
            id: args.id
          });
          if (resume) {
            const notNull = cleanNullArgs(args);
            await Resume.update({ id: args.id }, { ...notNull });
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "Resume Not Found"
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
