import type { NextPage } from 'next';
import Projects from '../../modules/projects';

const ProjectsPage: NextPage = () => {
  return (
    <Projects></Projects>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: "Projects"
    },
  }
}

export default ProjectsPage
