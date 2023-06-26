import { createLocalStore } from "@/utils";
import { createEffect } from "solid-js";

const init = {
  body: {
    "background-color": "rgb(222, 225, 230)",
  },
};

function setBodyStyle(css: any) {
  const body = document.body.style;
  for (let name in css) {
    body.setProperty(name, css[name]);
  }
}

export function initBodyStyle() {
  const [designSetting, _] = designSettingStroe();
  setBodyStyle(designSetting.body);
  createEffect(() => {
    setBodyStyle(designSetting.body);
  }, designSetting.body);
}

export default function designSettingStroe() {
  return createLocalStore("design", init);
}
