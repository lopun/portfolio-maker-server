import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import { CrawlerResponse, CrawlerMutationArgs } from "src/types/graph";
import Project from "src/entities/Project";
import { crawler } from "src/utils/crawler";

const resolvers: Resolvers = {
  Mutation: {
    Crawler: privateResolver(
      async (
        _,
        { username }: CrawlerMutationArgs,
        { req: { user } }
      ): Promise<CrawlerResponse> => {
        try {
          const results = await crawler(username);
          results.map(async project => {
            await Project.create({
              name: project.title,
              content: project.markdown,
              authorId: user.id,
              author: user,
              stack: [project.language]
            }).save();
          });
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
