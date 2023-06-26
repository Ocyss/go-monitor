import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

export const StoObject = (s: string) => {
  return Function('"use strict";return (' + s + ")")();
};

export function createLocalStore<T extends object>(
  name: string,
  init: T
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name);
  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : init
  );
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
  return [state, setState];
}

export function getKebabCase(str: string) {
  let temp = str.replace(/[A-Z]/g, function (i) {
    return "_" + i.toLowerCase();
  });
  if (temp.slice(0, 1) === "_") {
    temp = temp.slice(1); //如果首字母是大写，执行replace时会多一个_，需要去掉
  }
  return temp;
}
export function getCamelCase(str: string) {
  return str.replace(/-([a-z])/g, function (all, i) {
    return i.toLowerCase();
  });
}
