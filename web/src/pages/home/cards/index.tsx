import { CardData, CardsProps } from "@/types";
import ThemeProvider from "@suid/system/ThemeProvider";
import createTheme from "@suid/system/createTheme";
import Card from "@/components/card/card";
import { Grid } from "@suid/material";
import { Base64 } from "js-base64";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
});

export default function Cards(props: CardsProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <Grid container spacing={2}>
        {props.cards.map((data) => {
          let s = Base64.decode(data.data);
          let decStr: CardData = eval("(" + s + ")");
          return (
            <Grid item>
              <Card data={decStr}></Card>
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
}
