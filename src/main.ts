import {
  initPort,
  createMidiMessageRouter,
  createMidiMessageHandler,
  createExitHandler,
} from "./midi";
import { showStartupBanner } from "./cli";
import { portName } from "./constants";
import type { Input, Output } from "midi";
import process from "node:process";

export async function main() {
  const input = initPort<Input>(portName.input, "input");

  const outputs = portName.output.map((outputPortName) =>
    initPort<Output>(outputPortName, "output"),
  );

  showStartupBanner();

  const midiMessageRouter = createMidiMessageRouter(outputs);
  const midiMessageHandler = createMidiMessageHandler({ midiMessageRouter });
  input.on("message", midiMessageHandler);

  const exitHandler = createExitHandler({ input, outputs });
  process.on("exit", exitHandler);
}
