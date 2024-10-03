import {
  initPort,
  createMidiMessageRouter,
  createMidiMessageHandler,
  createExitHandler,
  sendAllNotesOff,
} from "./midi";
import { showStartupBanner } from "./cli";
import { portName } from "./constants";
import type { Input, Output } from "midi";
import process from "node:process";
import { programVersion } from "./constants";

export async function main(options: ProgramOptions) {
  if (options.version) {
    console.log(programVersion);
    process.exit(0);
  }

  const outputs = portName.output.map((outputPortName) =>
    initPort<Output>(outputPortName, "output"),
  );

  if (options.off) {
    sendAllNotesOff({ outputs });
    process.exit(0);
  }

  const input = initPort<Input>(portName.input, "input");

  showStartupBanner();

  const { handleExit, observeMessage } = createExitHandler({ input, outputs });
  const midiMessageRouter = createMidiMessageRouter({ outputs });
  const midiMessageHandler = createMidiMessageHandler({
    midiMessageRouter,
    observeMessage,
  });
  input.on("message", midiMessageHandler);

  process.on("exit", handleExit);
}
