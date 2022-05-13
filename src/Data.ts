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
    title: "Lesson 1: Make Properties Optional",
    label: "Medium",
    description: "Implement your own MakeOptional type",
    id: 2,
    level: 2,
  },
  {
    title: "Lesson 1: Make Properties Optional",
    label: "Medium",
    description: "Implement your own MakeOptional type",
    id: 3,
    level: 3,
  },
  {
    title: "Lesson 1: Make Properties Optional",
    label: "Medium",
    description: "Implement your own MakeOptional type",
    id: 4,
    level: 4,
  },
];

export default lessons;
