import { JSX } from "solid-js/jsx-runtime";
import "./index.scss";
import { Routes, Route } from "@solidjs/router";
import Home from "@/pages/home";

export default function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path={["/", "/view/:path"]} component={Home} />
      </Routes>
    </div>
  );
}
