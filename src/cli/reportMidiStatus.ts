import { resetLine } from "./resetLine";
import { writeLine } from "./writeLine";

export function reportMidiStatus(message: string) {
  resetLine();
  writeLine(message);
}
