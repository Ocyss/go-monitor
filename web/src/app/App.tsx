import { JSX } from "solid-js/jsx-runtime";
import "./index.scss";
import { useRoutes } from "@solidjs/router";
import { routes } from "@/router";
import { Toaster } from "solid-toast";
import { initBodyStyle } from "@/store/designSetting";
export default function App(): JSX.Element {
  const Routes = useRoutes(routes);
  initBodyStyle();
  return (
    <>
      <Toaster></Toaster>
      <Routes />
    </>
  );
}
