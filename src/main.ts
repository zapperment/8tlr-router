import {
  initPort,
  reportMidiStatus,
  createMidiStatusReport,
  createMidiMessageRouter,
} from "./utils";
import createDebug from "debug";
import { portName } from "./constants";
import type { Input, Output } from "midi";

const debug = createDebug("8tlr-router:main");

export async function main() {
  const input = initPort<Input>(portName.input, "input");

  const outputs = portName.output.map((outputPortName) =>
    initPort<Output>(outputPortName, "output"),
  );

  const routeMidiMessage = createMidiMessageRouter(outputs);

  input.on("message", (_, midiMessage) => {
    const routingResult = routeMidiMessage(midiMessage);
    if (routingResult === null) {
      return;
    }
    const { inputChannel, outputPortIndex, outputChannel } = routingResult;

    const msg = createMidiStatusReport({
      inputChannel,
      outputChannel,
      outputPortName: portName.output[outputPortIndex],
      midiMessage,
    });

    if (debug.enabled) {
      debug(msg);
    } else {
      reportMidiStatus(msg);
    }

    outputs[outputPortIndex].sendMessage(midiMessage);
  });
}
