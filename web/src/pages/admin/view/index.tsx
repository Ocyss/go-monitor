import { useParams } from "@solidjs/router";

export default function adminView() {
  const params = useParams();
  console.log(params.id);

  return <div>666</div>;
}
