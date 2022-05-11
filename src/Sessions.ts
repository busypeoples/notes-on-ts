import * as t from "io-ts";

const Levels_Key = "LEVELS";

const writeLevel = (id: number) => {
  const levels = readLevels();
  localStorage.setItem(Levels_Key, JSON.stringify([...levels, id]));
};

const readLevels = () => {
  const levels = localStorage.getItem(Levels_Key);
  if (levels) {
    try {
      const result = t.array(t.number).decode(JSON.parse(levels));
      if (result._tag === "Right") {
        return result.right;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  }

  return [];
};

const DarkModeKey = "DARK_MODE";

const writeDarkMode = (darkMode: boolean) => {
  localStorage.setItem(DarkModeKey, JSON.stringify(darkMode));
};

const readDarkMode = (): boolean => {
  const darkMode = localStorage.getItem(DarkModeKey);
  if (darkMode) {
    return JSON.parse(darkMode);
  }
  return false;
};

export default {
  writeLevel,
  readLevels,
  writeDarkMode,
  readDarkMode,
};
