import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@suid/material";
import { TransitionProps } from "@suid/material/transitions";
import { createSignal, JSXElement } from "solid-js";

const Transition = function Transition(
  props: TransitionProps & {
    children: JSXElement;
  }
) {
  return <Slide direction="up" {...props} />;
};

interface AddViewProps {
  open: boolean;
  Close(): void;
  Sure(): void;
}
export default function AddView(props: AddViewProps) {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      onClose={props.Close}
    >
      <DialogTitle>{"create a new view"}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={props.Close}>cancel</Button>
        <Button onClick={props.Sure}>Sure</Button>
      </DialogActions>
    </Dialog>
  );
}
