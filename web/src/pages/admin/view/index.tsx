import { useParams } from "@solidjs/router";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  createTheme,
  ThemeProvider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@suid/material";
import style from "./style.module.scss";
import Card from "@/components/home/card/card";
import { CardData } from "@/types";
import { Base64 } from "js-base64";
import api from "@/api";
import toast from "solid-toast";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
});

export default function adminView() {
  const params = useParams();
  const vid = params.id;
  let open = $signal(false);
  let name = $signal("");
  let width = $signal("500px");
  let height = $signal("300px");
  let type: "text" | "picture" | "echarts" = $signal("text");
  let data = $signal("");
  let cardData: CardData = $signal({
    type: "text",
    data: "",
  });
  const handleClose = () => {
    open = false;
  };
  const handleSubmit = async () => {
    preview();
    const res = await api.card.add({
      vid: Number(vid),
      name,
      data: Base64.encode(JSON.stringify(cardData)),
    });
    if (res.code == 200) {
      toast.success("Added successfully!");
      open = false;
    }
  };
  const preview = () => {
    let temp: CardData = { type, width, height, data: "" };
    const regex = /^\d+(\.\d+)?([A-Za-z%]+)$/;
    if (!regex.test(width) || !regex.test(height)) {
      temp.type = "text";
      temp.data = "the width or height are illegal please check";
      temp.width = "300px";
      temp.height = "120px";
    } else {
      if (type == "echarts") {
        try {
          temp.data = eval("(" + data + ")");
        } catch (err) {
          temp.type = "text";
          temp.data = "the eccharts data you entered has an error please check";
        }
      } else {
        temp.data = data;
      }
    }

    cardData = temp;
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          open = true;
        }}
      >
        Add Card
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>Add Card</DialogTitle>
        <DialogContent class={style.content}>
          <div class={style.input}>
            <TextField
              margin="dense"
              autoFocus
              label="Name"
              fullWidth
              value={name}
              onChange={(event) => {
                name = event.target.value;
              }}
            />
            <TextField
              margin="dense"
              label="width"
              fullWidth
              value={width}
              onChange={(event) => {
                width = event.target.value;
              }}
            />
            <TextField
              margin="dense"
              label="height"
              fullWidth
              value={height}
              onChange={(event) => {
                height = event.target.value;
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="type-select-label">Type</InputLabel>
              <Select
                value={type}
                id="type-select-label"
                label="Type"
                onChange={(event) => {
                  type = event.target.value;
                }}
              >
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"picture"}>Picture</MenuItem>
                <MenuItem value={"echarts"}>Echarts</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={preview}>
              Preview
            </Button>
            <TextField
              margin="dense"
              label="Data"
              fullWidth
              multiline
              value={data}
              onChange={(event) => {
                data = event.target.value;
              }}
              rows={6}
            />
          </div>
          <div>
            <ThemeProvider theme={customTheme}>
              <Card {...cardData}></Card>
            </ThemeProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Clone
          </Button>
          <Button onClick={handleSubmit} variant="outlined">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
