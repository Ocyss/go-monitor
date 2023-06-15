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
import style from "./menu.module.scss";
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

  const dialogClone = (index: number, id: number) => {
    dialog_show = false;
    if (index >= 0 && id > 0) {
      props.onSwitch(index, id);
      navigate(`/view/${id}`, { replace: true });
    }
  };
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
