/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./app/App";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
