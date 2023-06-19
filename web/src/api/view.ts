import request from "@/utils/request";
import { View, Resp, ViewAddRequ } from "@/types";

export function gets(): Resp<Array<View>> {
  return request({
    method: "get",
    url: "view/gets",
  });
}

export function get(id: number): Resp<View> {
  return request({
    method: "get",
    url: "view/get",
    params: { id },
  });
}

export function add(data: ViewAddRequ): Resp<number> {
  return request({
    method: "post",
    url: "view/add",
    data,
  });
}

export function check(id: any): Resp<boolean> {
  return request({
    method: "get",
    url: "view/check",
    params: { id },
  });
}
