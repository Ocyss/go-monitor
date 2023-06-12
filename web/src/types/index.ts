import { AxiosResponse } from "axios";
export type Resp<T = any> = Promise<{
  code: number;
  msg?: string;
  data?: T;
  errmsg?: Array<string>;
}>;

export * from "./card";
export * from "./view";
export * from "./home";
