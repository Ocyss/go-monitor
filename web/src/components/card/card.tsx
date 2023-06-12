import { CardData } from "@/types";
import styled from "@suid/system/styled";
import Echarts from "@/components/echarts/echarts";

const CardComponent = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

interface cardProps {
  data: CardData;
}

export default function Card(props: cardProps) {
  const { width, height, type, data } = props.data;

  return (
    <CardComponent style={{ width, height }}>
      <Switch fallback={data}>
        <Match when={type == "text"}>{data}</Match>
        <Match when={type == "picture"}>
          <image href={data}></image>
        </Match>
        <Match when={type == "echarts"}>
          <Echarts data={props.data}></Echarts>
        </Match>
      </Switch>
    </CardComponent>
  );
}
