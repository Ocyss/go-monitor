import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@suid/material";
import { MenuDialogProps, MenuProps } from "@/types";
import style from "./style.module.scss";
import { useNavigate } from "@solidjs/router";

function MenuDialog(props: MenuDialogProps) {
  return (
    <Dialog onClose={() => props.onClose(-1, -1)} open={props.open}>
      <DialogTitle>Switch view</DialogTitle>
      <List sx={{ pt: 0 }}>
        {props.menus.map((val, index) => (
          <ListItem onClick={() => props.onClose(index, val.id)} disablePadding>
            <ListItemButton selected>
              <ListItemText primary={val.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function ViewMenu(props: MenuProps) {
  let dialog_show: boolean = $signal(false);
  const navigate = useNavigate();
  let time = $signal("");
  const dialogClone = (index: number, id: number) => {
    dialog_show = false;
    if (index >= 0 && id > 0) {
      props.onSwitch(index, id);
      navigate(`/view/${id}`, { replace: true });
    }
  };
  setInterval(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    time = `${hours}:${minutes}:${seconds}`;
  }, 1000);

  return (
    <div class={style.menu}>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        onClick={() => {
          dialog_show = true;
        }}
        class={style.title}
      >
        {props.menus[props.index].name}
      </Typography>
      <div>{time}</div>
      <Typography
        component="a"
        gutterBottom
        href="/admin"
        class={style.title}
        target="_blank"
      >
        Admin
      </Typography>
      <MenuDialog
        open={dialog_show}
        onClose={dialogClone}
        menus={props.menus}
      />
    </div>
  );
}
