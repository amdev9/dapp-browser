import { action } from "typesafe-actions";
import { TOGGLE_SETTINGS_PANEL } from "../constants";
 
export const toggle = (openStatus: boolean) => action(TOGGLE_SETTINGS_PANEL, { isOpen: openStatus });
