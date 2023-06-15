import { CardData } from "@/types";
import styled from "@suid/system/styled";
import Echarts from "@/components/echarts/echarts";

const CardComponent = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

export default function Card(props: CardData) {
  return (
    <CardComponent style={{ width: props.width, height: props.height }}>
      <Switch fallback={props.data}>
        <Match when={props.type == "text"}>{props.data}</Match>
        <Match when={props.type == "picture"}>
          <img src={props.data} style="width: 100%;height: 100%;"></img>
        </Match>
        <Match when={props.type == "echarts"}>
          <Echarts {...props} data={props.data}></Echarts>
        </Match>
      </Switch>
    </CardComponent>
  );
}
