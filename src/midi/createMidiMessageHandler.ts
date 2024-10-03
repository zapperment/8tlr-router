import type { MidiMessage } from "midi";
import { createMidiStatusReport, reportMidiStatus } from "../cli";
import { portName } from "../constants";
import createDebug from "debug";

const debug = createDebug("8tlr-router:midi:midiMessageHandler");

interface Args {
  midiMessageRouter: MidiMessageRouter;
}

export function createMidiMessageHandler({ midiMessageRouter }: Args) {
  return (_: number, midiMessage: MidiMessage) => {
    const routingResult = midiMessageRouter(midiMessage);
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

    debug(msg);
    reportMidiStatus(msg);
  };
}
