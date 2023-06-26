import { CardData } from "@/types";
import styled from "@suid/system/styled";
import Echarts from "@/components/echarts/echarts";
import "./style.scss";
const CardComponent = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  // backgroundColor: theme.palette.primary.main,
  // padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.palette.boxShadow,
  transition: theme.palette.transition,
  // "&:hover": {
  //   boxShadow: theme.palette.boxShadowHover,
  // },
}));

function CardShowData(props: CardData) {
  return (
    <Switch fallback={props.data}>
      <Match when={props.type == "text"}>{props.data}</Match>
      <Match when={props.type == "picture"}>
        <img src={props.data} style="width: 100%;height: 100%;"></img>
      </Match>
      <Match when={props.type == "echarts"}>
        <Echarts {...props} data={props.data}></Echarts>
      </Match>
    </Switch>
  );
}

export default function Card(props: CardData) {
  return (
    <CardComponent
      class="card"
      style={{ width: props.width, height: props.height }}
    >
      <Show when={!props.err} fallback={<div>{props.err}</div>}>
        <Switch
          fallback={
            <div class="content">
              <CardShowData {...props} />
            </div>
          }
        >
          <Match when={props.style && props.style >= 2 && props.style <= 7}>
            <div class={`double double${props.style ? props.style - 1 : 1}`}>
              <div class="content">
                <div class="card1">
                  <CardShowData {...props} data={props.data[0]} />
                </div>
                <div class="card2">
                  <CardShowData {...props} data={props.data[1]} />
                </div>
              </div>
            </div>
          </Match>
        </Switch>
      </Show>
    </CardComponent>
  );
}
