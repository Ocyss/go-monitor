import { JSX } from "solid-js/jsx-runtime";
import Menu from "./menu";
import Cards from "./cards";
import api from "@/api";
import { Card, View } from "@/types";
import { onMount } from "solid-js";

let views: Array<View> = $signal([
  {
    id: -1,
    created_at: -1,
    name: "Error",
    path: "err",
  },
]);
let cards: Array<Card> = $signal([]);

let viewIndex: number = $signal(0);
const switchView = (index: number, id: number) => {
  viewIndex = index;
  api.view.get(id).then((res) => {
    if (res.code == 200 && res.data?.cards) {
      cards = res.data.cards;
    }
  });
};

export default function Home(): JSX.Element {
  onMount(() => {
    api.view.gets().then((res) => {
      if (res.code == 200 && res.data) {
        if (res.data.length != 0) {
          views = res.data;
        }
      }
    });
  });
  switchView(0, 0);
  return (
    <div>
      <Menu menus={views} index={viewIndex} onSwitch={switchView}></Menu>
      <div class="cards">
        <Cards cards={cards}></Cards>
      </div>
    </div>
  );
}
