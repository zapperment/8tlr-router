import createDebug from "debug";
import type { Input, Output } from "midi";
import { sendAllNotesOff } from "./sendAllNotesOff";

const debug = createDebug("8tlr-router:midi:exitHandler");

interface Args {
  input: Input;
  outputs: Output[];
}

export function createExitHandler({ input, outputs }: Args) {
  return () => {
    sendAllNotesOff(outputs);
    debug("Close MIDI ports");
    input.closePort();
    outputs.forEach((output) => output.closePort());
    debug("Program terminated");
  };
}
