import { JSX } from "solid-js/jsx-runtime";
import "./index.scss";
import { useRoutes } from "@solidjs/router";
import { routes } from "@/router";
import { Toaster } from "solid-toast";

export default function App(): JSX.Element {
  const Routes = useRoutes(routes);
  return (
    <>
      <Toaster></Toaster>
      <Routes />
    </>
  );
}
