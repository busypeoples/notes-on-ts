export type Lesson = {
  title: string;
  label: string;
  description: string;
  id: number;
  level: number;
};

const lessons: Lesson[] = [
  {
    title: "Lesson 1: Basic Type Definitions",
    label: "Easy",
    description: "Define basic types",
    id: 1,
    level: 1,
  },
  {
    title: "Lesson 2: Make Properties Optional",
    label: "Medium",
    description: "Implement your own MakeOptional type",
    id: 2,
    level: 2,
  },
];

export default lessons;
