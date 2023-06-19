import { CardData, CardsProps } from "@/types";
import ThemeProvider from "@suid/system/ThemeProvider";
import createTheme from "@suid/system/createTheme";
import Card from "@/components/home/card/card";
import { Grid } from "@suid/material";
import { Base64 } from "js-base64";
import { StoObject } from "@/utils";

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

export default function Cards(props: CardsProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <Grid container spacing={2}>
        {props.cards.map((item) => {
          if (item.data == null) {
            return <Grid item>{item.name}</Grid>;
          }
          let decStr: CardData = StoObject(Base64.decode(item.data));
          return (
            <Grid item>
              <Card {...decStr}></Card>
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
}
