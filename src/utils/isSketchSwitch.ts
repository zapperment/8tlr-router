import type { MidiMessage } from "midi";
import { isControlChange } from "./isControlChange";
import { sketchSwitchControlChangeNumber } from "../constants";

export function isSketchSwitch(message: MidiMessage) {
  if (!isControlChange(message)) {
    return false;
  }
  return message[1] === sketchSwitchControlChangeNumber;
}
