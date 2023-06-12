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
        {/* <ListItem
          onClick={() => handleListItemClick("addAccount")}
          disablePadding
        >
          <ListItemButton autoFocus>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem> */}
      </List>
    </Dialog>
  );
}

export default function ViewMenu(props: MenuProps) {
  let dialog_show: boolean = $signal(false);

  const dialogClone = (index: number, id: number) => {
    dialog_show = false;
    if (index > 0 && id > 0) {
      props.onSwitch(index, id);
    }
  };
  return (
    <div class="menu">
      <Typography
        variant="h5"
        component="div"
        onClick={() => {
          dialog_show = true;
        }}
        style={"display: inline-block;cursor:pointer"}
      >
        {props.menus[props.index].name}
      </Typography>
      <br />
      <MenuDialog
        open={dialog_show}
        onClose={dialogClone}
        menus={props.menus}
      />
    </div>
  );
}
