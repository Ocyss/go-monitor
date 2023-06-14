import Views from "./view/views";
import AddView from "./view/add";
export default function Admin() {
  return (
    <div class="admin-main">
      <AddView />
      <Views />
    </div>
  );
}
