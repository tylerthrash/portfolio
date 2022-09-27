import router from 'next/router';
import { isDefined } from '../../utils/common.util';
import { displayDates } from '../../utils/date-time.util';
import { Project } from './project.type';
import { projectsList } from './projects-list.type';

const Projects = () => {
  const openProject = (project: Project) => {
    console.log(`go to ${project.name}`);
    router.push(`projects/${project.name}`, undefined, { shallow: true });
  };

  const projectsListCards = projectsList.map((project) => {
    let classNames = 'simple-card project hvr-sink ';
    classNames += isDefined(project.cardSize)
      ? `project-${project.cardSize}`
      : 'project-sm';

    return (
      <div
        key={project.name}
        className={classNames}
        onClick={() => openProject(project)}
      >
        <div className="simple-card-header">
          <div className="simple-card-header-title">{project.title}</div>
          <div className="simple-card-header-subtitle">
            {displayDates(
              project.startDate,
              project.endDate,
              isDefined(project.endDate) === false ? 'day' : 'week'
            )}
          </div>
        </div>
        <div className="simple-card-content">
          {/* <Typography gutterBottom variant="h5" component="div">
            {project.title}
          </Typography> */}
          <div>
            {project.desc}
          </div>
        </div>
      </div>
    );
  });

  return <div className="projects-grid">{projectsListCards}</div>;
};

export default Projects;
