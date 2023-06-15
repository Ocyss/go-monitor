import request from "@/utils/request";
import { Resp, CardAddRequ } from "@/types";

export function add(data: CardAddRequ): Resp<number> {
  return request({
    method: "post",
    url: "card/add",
    data,
  });
}
