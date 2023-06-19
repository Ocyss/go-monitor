import api from "@/api";
import AddCard from "@/components/admin/view/AddCard";
import Cards from "@/components/home/card/cards";
import { Card } from "@/types";
import { useNavigate, useParams } from "@solidjs/router";
import { Box } from "@suid/material";
import { onMount } from "solid-js";

export default function adminView() {
  const params = useParams();
  const navigate = useNavigate();
  const vid = params.id;
  let cards: Array<Card> = $signal([]);
  onMount(async () => {
    const checkRes = await api.view.check(vid);
    if (!checkRes.data) {
      navigate("/err/404", { resolve: false });
    }
    api.view.get(vid as unknown as number).then((res) => {
      if (res.code == 200 && res.data?.cards) {
        cards = res.data.cards;
      }
    });
  });
  return (
    <Box>
      <AddCard />
      <div class="cards">
        <Cards cards={cards}></Cards>
      </div>
    </Box>
  );
}
