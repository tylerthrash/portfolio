import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useEffect, useState } from 'react';
import { Project } from '../project.type';

async function uniquePathsWithObstaclesRecursion(
  col: number,
  row: number,
  curCol: number,
  curRow,
  obstaclesGrid: number[][],
  resultArr: number[][],
  gridCellRefs: { [key: string]: React.RefObject<HTMLDivElement> },
  resultRef: React.RefObject<HTMLDivElement>
) {
  if (curCol > col - 1 || curRow > row - 1) {
    return 0;
  }

  if (obstaclesGrid[curCol][curRow] === 1) {
    return 0;
  }

  const cellRef = gridCellRefs[`${curCol}-${curRow}`];

  if (cellRef) {
    cellRef.current.style.backgroundColor = 'salmon';
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (cellRef) {
    cellRef.current.style.backgroundColor = 'hsla(223, 11%, 63%, 1)';
  }

  if (curCol === col - 1 && curRow === row - 1) {
    resultArr[curCol][curRow] = 1;
    return resultArr[curCol][curRow];
  }

  resultArr[curCol][curRow] =
    (await uniquePathsWithObstaclesRecursion(
      col,
      row,
      curCol + 1,
      curRow,
      obstaclesGrid,
      resultArr,
      gridCellRefs,
      resultRef
    )) +
    (await uniquePathsWithObstaclesRecursion(
      col,
      row,
      curCol,
      curRow + 1,
      obstaclesGrid,
      resultArr,
      gridCellRefs,
      resultRef
    ));

  if (cellRef) {
    cellRef.current.style.backgroundColor = 'green';
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (cellRef) {
    cellRef.current.style.backgroundColor = 'hsla(223, 11%, 63%, 1)';
  }

  if (cellRef) {
    cellRef.current.innerText = `${resultArr[curCol][curRow]}`;
  }

  if (curCol === 0 && curRow === 0) {
    resultRef.current.innerText = `Result: ${resultArr[curCol][curRow]}`;
  }

  return resultArr[curCol][curRow];
}

async function uniquePathsWithObstacles(
  obstacleGrid: number[][],
  gridCellRefs: { [key: string]: React.RefObject<HTMLDivElement> },
  resultRef: React.RefObject<HTMLDivElement>
) {
  const cols = obstacleGrid.length;
  const rows = obstacleGrid[0].length;

  const resultTable = [];

  for (let col = 0; col < cols; ++col) {
    resultTable[col] = [];

    for (let row = 0; row < rows; ++row) {
      const cellRef = gridCellRefs[`${col}-${row}`];

      if (cellRef) {
        cellRef.current.style.backgroundColor = 'salmon';
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (row === 0 && col === 0) {
        resultTable[col][row] = 1;
      } else if (obstacleGrid[col][row] === 1) {
        resultTable[col][row] = 0;
      } else {
        const above = row - 1 >= 0 ? resultTable[col][row - 1] : 0;
        const left = col - 1 >= 0 ? resultTable[col - 1][row] : 0;
        resultTable[col][row] = above + left;
      }

      if (cellRef) {
        if (obstacleGrid[col][row] === 1) {
          cellRef.current.style.backgroundColor = 'purple';
        } else {
          cellRef.current.style.backgroundColor = 'hsla(223, 11%, 63%, 1)';
        }

        cellRef.current.innerText = `${resultTable[col][row]}`;
      }
    }
  }

  resultRef.current.innerText = `Result ${resultTable[cols - 1][rows - 1]}`;
}

const UniquePathsWithObstaclesComp = () => {
  const [runs, setRuns] = useState(1);
  const [algo, setAlgo] = useState<'iterative-dp' | 'recursive'>(
    'iterative-dp'
  );

  const arr = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];

  const resultsArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const gridCellRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {};
  const resultRef = React.createRef<HTMLDivElement>();

  const gridStyle = {
    gridTemplateColumns: `repeat(${arr.length}, 1fr)`,
  };

  const resultDisplay = (
    <div className="test-grid" style={gridStyle}>
      {arr.map((a1, i1) => {
        return a1.map((num, i2) => {
          const id = `${i1}-${i2}`;

          const ref = React.createRef<HTMLDivElement>();

          gridCellRefs[id] = ref;

          const cellStyle =
            num === 1
              ? {
                  backgroundColor: `purple`,
                }
              : null;

          return (
            <div
              key={id}
              id={id}
              className="test-grid-cell"
              style={cellStyle}
              ref={ref}
            >
              {0}
            </div>
          );
        });
      })}
    </div>
  );

  useEffect(() => {
    for (const [key, value] of Object.entries(gridCellRefs)) {
      value.current.innerText = `0`;
    }
    resultRef.current.innerText = "";

    if (algo === 'iterative-dp') {
      uniquePathsWithObstacles(arr, gridCellRefs, resultRef);
    } else if (algo === 'recursive') {
      uniquePathsWithObstaclesRecursion(
        arr.length,
        arr[0].length,
        0,
        0,
        arr,
        resultsArr,
        gridCellRefs,
        resultRef
      );
    }
  }, [runs]);

  const handleAlgoChange = (event) => {
    setAlgo(event.target.value);
  };

  return (
    <>
      <div className="project-header">
        <div className="project-header-title">
          {uniquePathsWithObstaclesProject.title}
        </div>
        <div className="project-header-desc">
          {uniquePathsWithObstaclesProject.desc}
        </div>
      </div>
      <div className="flex flex-col">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="algo-radio-group"
          defaultValue="iterative-dp"
          onChange={(e) => handleAlgoChange(e)}
        >
          <FormControlLabel
            value="iterative-dp"
            control={<Radio />}
            label="Iterative DP"
          />
          <FormControlLabel
            value="recursive"
            control={<Radio />}
            label="Recursive"
          />
        </RadioGroup>

        {resultDisplay}

        <code style={{ marginTop: '2rem' }}>
          <span ref={resultRef}></span>
        </code>

        <Button variant="contained" onClick={() => setRuns(runs + 1)}>
          Rerun
        </Button>
      </div>
    </>
  );
};

const uniquePathsWithObstaclesProject: Project = {
  name: 'unique-paths-with-obstacles',
  title: 'Unique Paths with Obstacles',
  desc: `You are given an col x row integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[col-1][row-1]). The robot can only move either down or right at any point in time.

  An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

  Return the number of possible unique paths that the robot can take to reach the bottom-right corner.`,
  component: UniquePathsWithObstaclesComp,
  cardSize: 'sm',
  startDate: new Date('9/3/22'),
};

export default uniquePathsWithObstaclesProject;
