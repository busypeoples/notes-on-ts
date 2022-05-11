import { render } from "preact";
import { App } from "./app";
import "./index.css";
import "./userWorker";
const element = document.getElementById("app");
if (element) {
  render(<App />, element);
}
