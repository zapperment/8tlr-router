import type { MidiMessage } from "midi";
import { isControlChange } from "./isControlChange";

export function isSketchSwitch(message: MidiMessage) {
  if (!isControlChange(message)) {
    return false;
  }
  return message[1] === 119;
}
