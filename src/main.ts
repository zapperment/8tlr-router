import {
  initPort,
  createMidiMessageRouter,
  createMidiMessageHandler,
  createExitHandler,
  sendAllNotesOff,
} from "./midi";
import { showStartupBanner } from "./cli";
import type { Input, Output } from "midi";
import process from "node:process";
import { programVersion } from "./constants";
import { readConfig } from "./file";
import { configFileName } from "./constants";
import createDebug from "debug";

const debug = createDebug("8tlr-router:main");

export async function main(options: ProgramOptions) {
  const config = readConfig();
  if (config === null) {
    console.error(
      `File ${configFileName} cannot be found or read, did you forget to create one?`,
    );
    process.exit(1);
  }
  debug(JSON.stringify(config, null, 2));

  const { portName } = config;

  if (options.version) {
    console.log(programVersion);
    process.exit(0);
  }

  const outputs = portName.output.map((outputPortName) => {
    debug(`Initialise output port ${outputPortName}`);
    return initPort<Output>(outputPortName, "output");
  });

  if (options.off) {
    sendAllNotesOff({ outputs });
    process.exit(0);
  }

  debug(`Initialise input port ${portName.input}`);
  const input = initPort<Input>(portName.input, "input");

  showStartupBanner();

  const { handleExit, observeMessage } = createExitHandler({ input, outputs });
  const midiMessageRouter = createMidiMessageRouter({ outputs });
  const midiMessageHandler = createMidiMessageHandler({
    midiMessageRouter,
    observeMessage,
    portName,
  });
  input.on("message", midiMessageHandler);

  process.on("exit", handleExit);
}
