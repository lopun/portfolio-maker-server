import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import {
  UpdateProjectResponse,
  UpdateProjectMutationArgs
} from "src/types/graph";
import Project from "src/entities/Project";
import User from "src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    UpdateProject: privateResolver(
      async (
        _,
        { id, content, stack, name }: UpdateProjectMutationArgs,
        { req: { user } }
      ): Promise<UpdateProjectResponse> => {
        try {
          const project = await Project.findOne({ id });
          if (project) {
            await Project.update(
              { id },
              { content, stack: stack ? stack : undefined, name }
            );
            const projects = await Project.find({ id: user.id });
            const filteredProjects = projects.map(
              pj => (pj.id === id ? project : pj)
            );
            await User.update(
              { id: user.id },
              { ...user, projects: filteredProjects }
            );
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "Project not found!"
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
