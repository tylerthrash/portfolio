export interface Experience {
  key: number;
  position: string;
  company: string;
  startDate: Date;
  endDate: Date;
  shortDesc: string;
  longDesc?: string;
  accomplishments?: string[];
}

export const ExperienceList: Experience[] = [
  {
    key: 1,
    position: 'Full Stack Developer',
    company: 'The Sartell Group',
    startDate: new Date(2018, 7, 0),
    endDate: new Date(),
    shortDesc: `Worked on three large projects (130,000 - 500,000 lines of code)
                across tech stacks of Angular, .NET, SQL, Teradata DB, Nx Monorepo,
                Sass, Docker, and IIS. Specialized in front-end Angular development.`,
    longDesc: `
                Worked on three large projects (130,000 - 500,000 lines of code)
                across tech stacks of Angular, .NET, SQL, Teradata DB, Nx Monorepo,
                Sass, Docker, and IIS. Specialized in front-end Angular development.

      Exclusively developed a ~130,000 lines of code PWA hybrid mobile/desktop front-end for
      health care scheduling project.
    `,
    accomplishments: [
      `Developed a new branching and release process across all projects at the company,
      which was significantly more streamlined and less error prone than the previous process.`,
      `Created libraries of reusable code, components, and CSS/SASS styles for faster and
      better development.`,
      `Created novel frontend architecture that encouraged reuse and modularity, which
      improved code quality, performance, and reduced bundle size by 85%.`,
    ],
  },
];
