import { Card } from "./card";
import { View } from "./view";

export interface MenuDialogProps {
  open: boolean;
  menus: Array<View>;
  onClose: (index: number, id: number) => void;
}
export interface MenuProps {
  menus: Array<View>;
  index: number;
  onSwitch: (index: number, id: number) => void;
}
export interface CardsProps {
  cards: Array<Card>;
}
