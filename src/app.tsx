import { useEffect, useState } from "preact/hooks";
import classNames from "classnames";
import Lesson from "./Lesson";
import LessonsList from "./Overview";
import Sessions from "./Sessions";

export function App() {
  const currentDarkMode = Sessions.readDarkMode();
  const [darkMode, setDarkMode] = useState(currentDarkMode);

  useEffect(() => {
    Sessions.writeDarkMode(darkMode);
  }, [darkMode]);

  const [view, setView] = useState<
    { type: "List" } | { type: "Lesson"; lessonId: number }
  >({ type: "List" });
  return (
    <div
      className={classNames("absolute w-full h-fit min-h-full", {
        "dark bg-gray-900 text-white": darkMode,
        "bg-white text-black": !darkMode,
      })}
    >
      <div className={classNames("p-10 text-center text-2xl")}>
        <div className="absolute flex items-center justify-center h-8 right-10">
          <span
            className="cursor-pointer text-sm"
            onClick={() => setDarkMode((mode) => !mode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </div>
        <p>TypeScript Training Ground</p>
        <p className="text-lg">60 Sessions</p>
        {view.type === "Lesson" ? (
          <Lesson
            id={view.lessonId}
            darkMode={darkMode}
            onNextLesson={() =>
              setView({ type: "Lesson", lessonId: view.lessonId + 1 })
            }
            onBack={() => setView({ type: "List" })}
          />
        ) : (
          <LessonsList
            setLesson={(lessonId: number) =>
              setView({ type: "Lesson", lessonId })
            }
          />
        )}
      </div>
    </div>
  );
}
