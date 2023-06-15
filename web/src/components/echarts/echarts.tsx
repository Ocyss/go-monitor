import { onMount } from "solid-js";
import * as echarts from "echarts";
import { CardData } from "@/types";

export default function E(props: CardData) {
  let e!: HTMLDivElement;

  onMount(() => {
    var myChart = echarts.init(e);
    myChart.setOption(props.data);
  });

  return (
    <div ref={e} style={{ width: props.width, height: props.height }}></div>
  );
}
