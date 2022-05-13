import { code as lesson1, test as test1 } from "./lesson1";
import { code as lesson2, test as test2 } from "./lesson2";
import { code as lesson3, test as test3 } from "./lesson2";

type Lessons = Record<number, string[]>;
const lessons: Lessons = {
  1: [lesson1, test1],
  2: [lesson2, test2],
  3: [lesson3, test3],
};

export default lessons;
