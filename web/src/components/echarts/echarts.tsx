import { onMount } from "solid-js";
import * as echarts from "echarts";
import { CardData } from "@/types";

interface echartsProps {
  data: CardData;
}

export default function E(props: echartsProps) {
  let e!: HTMLDivElement;

  onMount(() => {
    var myChart = echarts.init(e);
    myChart.setOption(props.data.data);
  });

  return (
    <div
      ref={e}
      style={{ width: props.data.width, height: props.data.height }}
    ></div>
  );
}
