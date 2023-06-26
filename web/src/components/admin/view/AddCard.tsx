import { useParams } from "@solidjs/router";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
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
import { StoObject } from "@/utils";
import { createSignal } from "solid-js";
import createTheme from "@suid/system/createTheme";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "black",
    },
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    boxShadowHover: "0 4px 9px rgba(0, 0, 0, 0.3)",
    transition: "0.2s ease-in-out;",
  },
  shape: {
    borderRadius: 8,
  },
});

export default function adminView() {
  const params = useParams();
  const vid = params.id;
  let open = $signal(false);
  let name = $signal("");
  let [data, setData] = createSignal<CardData>(
    {
      type: "text",
      data: "",
      width: "500px",
      height: "300px",
      style: 0,
    },
    { equals: false }
  );
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
    let temp: CardData = { ...data() };
    const regex = /^\d+(\.\d+)?([A-Za-z%]+)$/;
    if (!temp.width || !regex.test(temp.width)) {
      temp.width = "300px";
      temp.err += "the width value is illegal;";
    }
    if (!temp.height || !regex.test(temp.height)) {
      temp.height = "120px";
      temp.err += "the height value is illegal;";
    }

    if (temp.type == "echarts") {
      try {
        temp.data = StoObject(temp.data);
      } catch (err) {
        temp.err += "the eccharts data you entered has an error please check;";
      }
    } else if (temp.style && temp.style >= 2 && temp.style <= 7) {
      temp.data = temp.data.split("\n");
    }

    cardData = temp;
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          open = true;
        }}
        sx={{ my: 2 }}
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
              value={data().width}
              onChange={(event) => {
                setData((cur) => {
                  cur.width = event.target.value;
                  return cur;
                });
              }}
            />
            <TextField
              margin="dense"
              label="height"
              fullWidth
              value={data().height}
              onChange={(event) => {
                setData((cur) => {
                  cur.height = event.target.value;
                  return cur;
                });
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="type-select-label">style</InputLabel>
              <Select
                value={data().style}
                id="type-select-label"
                label="Type"
                onChange={(event) => {
                  setData((cur) => {
                    cur.style = event.target.value;
                    return cur;
                  });
                }}
              >
                <MenuItem value={0}>default(single)</MenuItem>
                <MenuItem value={1}>weather</MenuItem>
                <MenuItem value={2}>double1</MenuItem>
                <MenuItem value={3}>double2</MenuItem>
                <MenuItem value={4}>double3</MenuItem>
                <MenuItem value={5}>double4</MenuItem>
                <MenuItem value={6}>double5</MenuItem>
                <MenuItem value={7}>double6</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel id="type-select-label">Type</InputLabel>
              <Select
                value={data().type}
                id="type-select-label"
                label="Type"
                onChange={(event) => {
                  setData((cur) => {
                    cur.type = event.target.value;
                    return cur;
                  });
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
              value={data().data}
              onChange={(event) => {
                setData((cur) => {
                  cur.data = event.target.value;
                  return cur;
                });
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
    </>
  );
}
