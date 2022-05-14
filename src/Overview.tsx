import classNames from "classnames";
import { Fragment } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import lessons, { Lesson as LessonType } from "./Data";
import Sessions from "./Sessions";

const isElementVisible = (element: HTMLElement) => {
  if (!element) {
    return false;
  }
  const rect = element.getBoundingClientRect();
  const width = window.innerWidth || document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;

  return !(
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > width ||
    rect.top > height
  );
};

const useTimeline = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (ref.current !== null) {
      setIsInView(isElementVisible(ref.current));
    }
    const onScroll = () => {
      if (ref.current) {
        setIsInView(isElementVisible(ref.current));
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  const timelineRef = (node: HTMLDivElement | null) => {
    ref.current = node;
  };

  return { isInView, timelineRef };
};

export const Lesson = ({
  index,
  id,
  title,
  label,
  description,
  level,
  finished,
  setLesson,
}: LessonType & {
  index: number;
  finished: boolean;
  setLesson: (id: number) => void;
}) => {
  const { isInView, timelineRef } = useTimeline();
  const inViewClass = isInView ? "in" : "out";
  const isEven = index % 2 === 0;

  return (
    <div
      ref={timelineRef}
      className="relative my-8 mx-0 before:content-[''] before:clear-both before:table after:content-[''] after:clear-both after:table"
    >
      <Fragment>
        <span
          className={classNames(
            "flex items-center justify-center absolute left-0 lg:left-1/2 top-1/2 rounded-full bg-black dark:bg-gray-900 dark:border dark:border-gray-500 text-white dark:text-gray-200 z-50 -ml-6 -mt-6 w-12 h-12",
            { "animate-move1": isInView, "dark:border-green-400  bg-green-800": finished }
          )}
        >
          {id}
        </span>
        <div
          className={classNames(
            "border dark:border-gray-500 p-1 rounded shadow ml-12 lg:ml-2 lg:ml-0 relative line-1 text-base lg:w-96 lg:top-50 lg:-mt-2",
            {
              "lg:float-right lg:mr-4": !isEven,
              visible: isInView,
              invisible: !isInView,
              "animate-move2": isEven && isInView,
              "animate-move2Inverse": !isEven && isInView,
            },
            inViewClass
          )}
        >
          <div
            className={classNames(
              "absolute top-1/2 h-0 w-10 border border-gray-200 dark:border-gray-600",
              {
                "right-full left-auto": !isEven,
                "lg:left-full right-full left-auto": isEven,
              }
            )}
          />
          <h4 className="flex flex-row items-center justify-center">
            {title}{" "}
            {finished && (
              <span className={classNames("text-green-700 pl-2")}>
                <CheckIcon />
              </span>
            )}
          </h4>
          <p className="text-sm">{description}</p>
          <div
            className={classNames(
              "absolute bottom-1/2 -m-3 h-6 right-0 -mr-2 rounded bg-black dark:bg-gray-700 w-fit text-white p-1 text-xs",
              {
                "lg:left-0 lg:-ml-2": isEven,
              }
            )}
          >
            {label}
          </div>
          <a
            className="cursor-pointer underline hover:text-gray-400"
            onClick={() => setLesson(id)}
          >
            Start Lesson
          </a>
        </div>
      </Fragment>
    </div>
  );
};

const ITEM_GROUP = 25;

export const LessonsList = ({
  setLesson,
}: {
  setLesson: (id: number) => void;
}) => {
  const finshedLessons = Sessions.readLevels();
  const [level, setLevel] = useState(1);
  const incLevel = () => {
    setLevel(level + 1);
  };

  const items = lessons.slice(0, ITEM_GROUP * level).map((lesson) => ({
    ...lesson,
    finished: finshedLessons.includes(lesson.id),
  }));
  return (
    <div className="p-1 text-center w-full max-w-[1000px] h-fit my-0 mx-auto relative py-2 px-0">
      <div className="text-center font-bold py-1 mx-1">Lessons</div>
      <div
        className={
          "before:content-[''] before:absolute before:top-0 before:left-0 lg:before:left-1/2 before:h-full before:w-0.5 before:bg-gray-100 dark:before:bg-gray-600 after:clear-both p-1 text-center w-11/12 max-w-[1000px] my-0 mx-auto relative py-2 px-0 lessons-items"
        }
      >
        {items.map((lesson, index) => (
          <Lesson {...lesson} setLesson={setLesson} index={index} />
        ))}
      </div>
      <div className="text-base">
        More coming soon
      </div>
      {items.length < lessons.length && (
        <div className="cursor-pointer text-base" onClick={incLevel}>
          Load More
        </div>
      )}
    </div>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default LessonsList;
