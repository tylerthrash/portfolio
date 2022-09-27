import { Project } from '../project.type';

const _Comp = () => {
  const resultDisplay = <div></div>;

  return <code>{resultDisplay}</code>;
};

const _Project: Project = {
  name: '',
  title: '',
  desc: '',
  component: _Comp,
  cardSize: 'sm',
  startDate: new Date('9/2/22'),
};

export default _Project;
