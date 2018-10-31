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
        args: UpdateResumeMutationArgs,
        { req: { user } }
      ): Promise<UpdateResumeResponse> => {
        try {
          const resume = await Resume.findOne(
            {
              id: args.id
            },
            { relations: ["author"] }
          );
          if (resume) {
            if (resume.author.id === user.id) {
              const notNull = cleanNullArgs(args);
              await Resume.update({ id: args.id }, { ...notNull });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "You are not authorized!"
              };
            }
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
