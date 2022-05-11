import lesson1 from "./lesson1";
import test1 from "./test1";
import lesson2 from "./lesson2";
import test2 from "./test2";

type Lessons = Record<number, string[]>;
const lessons: Lessons = {
  1: [lesson1, test1],
  2: [lesson2, test2],
};

export default lessons;
