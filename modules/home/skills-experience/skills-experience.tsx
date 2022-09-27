import { useEffect, useState } from 'react';
import useBreakpoints from '../../../hooks/getWindowDimensions';
import { isDefined } from '../../../utils/common.util';
import { displayDates } from '../../../utils/date-time.util';
import { Experience, ExperienceList } from './experience.type';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';

const SkillProgress = (props: {
  value: number;
  label: string;
  color: string;
}) => {
  return (
    <div className="se-skill">
      <div className="se-skill-label">{props.label}</div>
      <div className="skill-progress-container">
        <div
          className="skill-progress"
          style={{ backgroundColor: props.color, width: props.value + '%' }}
        ></div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const projectsListCards = ExperienceList.map((exp) => (
    <WorkExpCard key={exp.key} exp={exp} />
  ));

  return <div className="se-experience">{projectsListCards}</div>;
};

const WorkExpCard = (props: { exp: Experience }) => {
  const [expanded, setExpanded] = useState(false);
  const exp = props.exp;

  let classNames = 'simple-card experience ';

  let accomplishments = <></>;

  if (expanded === true) {
    const accomplishmentsList = exp.accomplishments.map((a, i) => {
      return <li key={i}>{a}</li>;
    });

    accomplishments = <ul>{accomplishmentsList}</ul>;
  }

  return (
    <div key={exp.key} className={classNames}>
      <div className="simple-card-header">
        <div className="simple-card-header-title">{exp.position}</div>
        <div className="simple-card-header-subtitle">
          {displayDates(
            exp.startDate,
            exp.endDate,
            isDefined(exp.endDate) === false ? 'day' : 'week',
            true
          )}
        </div>
      </div>

      <div className="simple-card-content">
        <p>{exp.shortDesc}</p>

        {expanded === true && <p>{exp.longDesc}</p>}
        {expanded === true && accomplishments}
      </div>

      <div className="simple-card-actions center">
        {expanded === false && (
          <IconButton aria-label="Expand Card" onClick={() => setExpanded(true)}>
            <ExpandMoreIcon className="medium-icon-size icon-dark" />
          </IconButton>
        )}
        {expanded === true && (
          <IconButton aria-label="Collapse Card" onClick={() => setExpanded(false)}>
            <ExpandLessIcon
              className="medium-icon-size icon-dark"
              onClick={() => setExpanded(false)}
            />
          </IconButton>
        )}
      </div>
    </div>
  );
};

const SkillsExperience = () => {
  const breakpoint = useBreakpoints();
  const [title, setTitle] = useState('Skills & Experience'.split(''));
  const [titleElements, setTitleElements] = useState(null);

  useEffect(() => {
    setTitleElements(
      title.map((letter, i) => {
        const classes = isDefined(letter)
          ? 'animated-el animated rubberBand'
          : '';

        return (
          <span key={i} className={classes}>
            {letter}
          </span>
        );
      })
    );
  }, [title]);

  return (
    <>
      <div className="skills-experience-container">
        <h1 className="title">
          {breakpoint.isHandset ? 'Skills & Experience' : titleElements}
        </h1>
        <div className="se-content">
          <p className="se-summary">
            A passionate Full-Stack Developer with 4 years of experience doing
            what I love to do. I specialize in front-end development, and have
            worked with various technologies, languages, and frameworks (client
            side, server side, database, as well as DevOps); able to learn and
            adjust to new tools, processes and techniques quickly and deeply as
            needed. High effort and passionate developer who's willing to go the
            extra mile to get things done fast and right, with best practices
            and maintainability top of mind.
          </p>

          <div className="se-skills">
            <SkillProgress
              value={100}
              label={'React/Next.js'}
              color="#F6C708"
            />

            <SkillProgress
              value={100}
              label={'JavaScript/TypeScript'}
              color={'#70E000'}
            />

            <SkillProgress value={85} label={'CSS/SCSS'} color={'#55D2EE'} />

            <SkillProgress
              value={90}
              label={'Back-end (.NET)'}
              color="#FFBE0B"
            />

            <SkillProgress
              value={80}
              label={'Database (SQL)'}
              color="#00d3e0"
            />
          </div>

          <ExperienceSection />
        </div>
      </div>
    </>
  );
};

export default SkillsExperience;
