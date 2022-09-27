import { Project } from './project.type';

const generateParenthesis = (n: number): string[] => {
  const result = [];
  const parentheses = '';
  const opened = 0;
  const closed = 0;

  backtrack(n, result, parentheses, opened, closed);

  return result;
};

function backtrack(
  n: number,
  result: string[],
  parentheses: string,
  opened: number,
  closed: number
): number {
  if (parentheses.length === n * 2) {
    result.push(parentheses);
    return;
  }

  // decision
  if (opened < n) {
    backtrack(n, result, parentheses + '(', opened + 1, closed);
  }

  if (closed < opened) {
    backtrack(n, result, parentheses + ')', opened, closed + 1);
  }
}

const generateParenthesisComp = () => {
  const result = generateParenthesis(4);

  const style = { marginBottom: '1rem' };

  let resultDisplay = result.map((element, i) => {
    return (
      <div key={i} style={style}>
        {element}&#44;
      </div>
    );
  });

  return <code>{resultDisplay}</code>;
};

const generateParenthesisProject: Project = {
  name: 'generate-parenthesis',
  title: 'Generate Parenthesis',
  desc: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
  component: generateParenthesisComp,
  cardSize: 'sm',
  startDate: new Date('9/2/22'),
};

export default generateParenthesisProject;
