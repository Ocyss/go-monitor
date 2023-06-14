import Views from "@/components/admin/view/views";
import AddView from "@/components/admin/view/add";
export default function Admin() {
  return (
    <div class="admin-main">
      <AddView />
      <Views />
    </div>
  );
}
