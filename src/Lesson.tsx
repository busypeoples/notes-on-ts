import { useEffect, useRef, useState } from "preact/hooks";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import { Uri } from "monaco-editor/esm/vs/editor/editor.api";
import TypeAssertions from "./TypeAssertions";
import lessons from "./lessons";
import classNames from "classnames";
import { ComponentChildren } from "preact";
import Sessions from "./Sessions";

type LessonProps = {
  id: number;
  darkMode: boolean;
  onBack: () => void;
};

const Lesson = ({ id, darkMode, onBack }: LessonProps) => {
  const [lessonCode, testCode] =
    Object.keys(lessons).length >= id ? lessons[id] : lessons[1];
  const [code, setCode] = useState(lessonCode);
  const [msgs, setMsgs] = useState<ComponentChildren[]>([]);
  const [markers, setMarkers] = useState<monaco.editor.IMarker[] | null>();
  const [viewTests, setViewTests] = useState(false);
  const [valid, setValid] = useState(false);

  const timeoutRef = useRef<number>();
  useEffect(() => {
    if (timeoutRef.current) {
      setMsgs([
        <div className="flex flex-row items-center text-orange-400">
          <span className="block rounded-full w-3 h-3 bg-orange-400 mr-2" />
          Loading Tests...
        </div>,
      ]);
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (!markers) {
        return;
      }
      const msgs = markers
        .filter(
          (marker) => marker.severity > 1 && marker.resource.path !== "/test.ts"
        )
        .map((marker) => {
          return (
            <div className="text-red-500">
              LN {marker.startLineNumber}, Col {marker.startColumn}:
              {marker.message}
            </div>
          );
        });

      const failedTests = markers.filter(
        (marker) => marker.severity > 1 && marker.resource.path === "/test.ts"
      ).length;

      setValid(failedTests === 0 && msgs.length === 0);

      setMsgs([
        ...msgs,
        ...(failedTests > 0
          ? [
              <div className="flex flex-row items-center text-red-500">
                <span className="block rounded-full w-3 h-3 bg-red-500 mr-2" />
                {failedTests} {failedTests === 0 ? "Test" : "Tests"} Failed
              </div>,
            ]
          : []),
      ]);
    }, 2000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [markers]);

  const editorDidMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    monaco: typeof monacoEditor
  ) => {
    editor.focus();
    editor.onDidChangeModelDecorations(() => {
      const markers = monaco.editor.getModelMarkers({ owner: "typescript" });
      setMarkers(markers);
    });
  };

  const editorWillMount = (monaco: typeof monacoEditor) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
    });

    const TypeAssertionsPath = `file:///node_modules/@types/TypeAssertions/index.d.ts`;
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      TypeAssertions,
      TypeAssertionsPath
    );
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

    monaco.editor.getModel(Uri.parse("file:///test.ts")) ||
      monaco.editor.createModel(
        testCode,
        "typescript",
        monaco.Uri.parse("file:///test.ts")
      );
  };

  const editorWillUnmount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor
  ) => {
    editor.onDidChangeModelDecorations(() => {});
  };

  const onChange = (newValue: string) => {
    if (viewTests) {
      return;
    }
    setCode(newValue);
    evaluate();
  };

  const evaluate = () => {
    const removable = monaco.editor.getModel(Uri.parse("file:///test.ts"));
    if (removable) {
      removable.dispose();
    }
    monaco.editor.createModel(
      testCode,
      "typescript",
      monaco.Uri.parse("file:///test.ts")
    );
  };

  const testAndSaveResult = () => {
    const markers = monaco.editor.getModelMarkers({});
    const failedTests = markers.filter(
      (marker) => marker.severity > 1 && marker.resource.path === "/test.ts"
    ).length;
    if (valid && failedTests === 0) {
      Sessions.writeLevel(id);
      onBack();
    }
  };

  const options = {
    selectOnLineNumbers: true,
    minimap: { enabled: false },
    renderValidationDecorations: "on" as const,
    readOnly: viewTests,
    model:
      monaco.editor.getModel(
        Uri.parse(viewTests ? "file:///test.ts" : "file:///main.ts")
      ) ||
      monaco.editor.createModel(
        code,
        "typescript",
        monaco.Uri.parse(viewTests ? "file:///test.ts" : "file:///main.ts")
      ),
  };

  return (
    <div className="flex flex-col items-center text-left">
      <div class="my-4 text-base">Lesson {id}</div>
      <div class="cursor-pointer mb-4 text-base" onClick={onBack}>
        Back to overview
      </div>
      <div class="flex w-full h-1/2 items-center justify-center">
        {!viewTests && (
          <MonacoEditor
            language="typescript"
            height={400}
            theme={darkMode ? "vs-dark" : "vs-light"}
            value={code}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
            editorWillMount={editorWillMount}
            editorWillUnmount={editorWillUnmount}
          />
        )}
        {viewTests && (
          <MonacoEditor
            language="typescript"
            height={400}
            theme={darkMode ? "vs-dark" : "vs-light"}
            value={testCode}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
            editorWillMount={editorWillMount}
            editorWillUnmount={editorWillUnmount}
          />
        )}
      </div>
      <div className="flex flex-row text-sm m-4">
        <div
          className={classNames("cursor-pointer hover:underline mr-4", {
            "text-black dark:text-white": !viewTests,
            "text-gray-600 dark:text-gray-400": viewTests,
          })}
          onClick={() => setViewTests(false)}
        >
          Code
        </div>
        <div
          className={classNames("cursor-pointer hover:underline", {
            "text-black dark:text-white": viewTests,
            "text-gray-600 dark:text-gray-400": !viewTests,
          })}
          onClick={() => setViewTests(true)}
        >
          Tests <span className="text-xs">(read only)</span>
        </div>
      </div>

      {msgs.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 w-full md:w-8/12 max-h-40 overflow-auto text-sm p-1 mt-4">
          {msgs.map((msg) => {
            return <div>{msg}</div>;
          })}
        </div>
      )}

      {valid && (
        <div
          onClick={testAndSaveResult}
          className="rounded cursor-pointer text-sm bg-gray-600 dark:bg-gray-500 text-gray-300 hover:bg-gray-700 p-2 mt-8"
        >
          Verify and Save Result
        </div>
      )}
    </div>
  );
};

export default Lesson;
