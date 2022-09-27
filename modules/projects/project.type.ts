export interface Project {
  name: string;
  title: string;
  desc: string;
  component: React.FC;
  cardSize: "sm" | "md" | "lg";
  startDate: Date;
  endDate?: Date;
  path?: string;
}
