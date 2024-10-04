import type { MidiMessage } from "midi";
import { createMidiStatusReport, reportMidiStatus } from "../cli";
import createDebug from "debug";

const debug = createDebug("8tlr-router:midi:midiMessageHandler");

interface Args {
  midiMessageRouter: MidiMessageRouter;
  observeMessage: (MidiMessage: MidiMessage, portIndex: number) => void;
  portName: ConfigPortName;
}

export function createMidiMessageHandler({
  midiMessageRouter,
  observeMessage,
  portName,
}: Args) {
  return (_: number, midiMessage: MidiMessage) => {
    const routingResult = midiMessageRouter(midiMessage);
    if (routingResult === null) {
      return;
    }
    const { inputChannel, outputPortIndex, outputChannel, outputMidiMessage } =
      routingResult;

    const msg = createMidiStatusReport({
      inputChannel,
      outputChannel,
      outputPortName: portName.output[outputPortIndex],
      midiMessage,
    });

    debug(msg);
    reportMidiStatus(msg);
    observeMessage(outputMidiMessage, outputPortIndex);
  };
}
