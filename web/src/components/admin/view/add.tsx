import api from "@/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@suid/material";
import toast from "solid-toast";

export default function FormDialog() {
  let open: boolean = $signal(false);
  let name = $signal("");
  let path = $signal("");
  const handleClose = () => {
    open = false;
  };

  const handleSubmit = async () => {
    const res = await api.view.add({ name, path });
    if (res.code == 200) {
      open = false;
      toast.success("Added successfully!");
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          open = true;
        }}
      >
        Add View
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add View</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => {
              name = event.target.value;
            }}
          />
          <TextField
            margin="dense"
            id="path"
            label="Path"
            fullWidth
            variant="standard"
            value={path}
            onChange={(event) => {
              path = event.target.value;
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Clone</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
