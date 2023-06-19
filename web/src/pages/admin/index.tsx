import ViewTable from "@/components/admin/view/ViewTable";
import AddView from "@/components/admin/view/AddView";
export default function Admin() {
  return (
    <div class="admin-main">
      <AddView />
      <ViewTable />
    </div>
  );
}
