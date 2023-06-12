import { Card } from "./card";

export interface View {
  id: number;
  created_at: number;
  updated_at?: number;
  name: string;
  path: string;
  sort?: number;
  cards?: Array<Card>;
}

export interface ViewAddRequ {
  name: string;
  path: string;
}
