export interface Card {
  id: number;
  created_at: number;
  updated_at?: number;
  vid: number;
  sort: number;
  name?: string;
  data: string;
  link?: number;
}

export interface CardAddRequ {
  vid: number;
  name?: string;
  data?: any;
  link?: number;
}

export interface CardData {
  width?: string;
  height?: string;
  type: "echarts" | "text" | "picture";
  data: any;
  err?: string;
  style?: number;
}
