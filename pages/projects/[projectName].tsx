import type { GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import Projects from '../../modules/projects';
import { projectsList } from '../../modules/projects/projects-list.type';
import { isDefined } from '../../utils/common.util';

interface ProjectPageProps {
  pageTitle: string;
  projectName: string;
}

const ProjectPage: NextPage = (props: ProjectPageProps) => {
  const router = useRouter();

  if (isDefined(props.projectName) === false) {
    return <div>Error</div>;
  }

  const comp = projectsList.find((x) => x.name === props.projectName);

  const ProjectComponent = comp.component;

  return <>{<ProjectComponent></ProjectComponent>}</>;
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: projectsList.map((x) => `/projects/${x.name}`),
    fallback: 'blocking', //indicates the type of fallback
  };
};

export async function getStaticProps({ params }) {
  const projectName = params.projectName;

  const project = projectsList.find((x) => x.name === projectName);

  if (project) {
    return {
      props: {
        pageTitle: project.title,
        projectName: project.name,
      },
    };
  } else {
    return {
      props: {
        pageTitle: projectName,
        projectName: null,
      },
    };
  }
}

export default ProjectPage;
