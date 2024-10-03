import type { MidiMessage, Output } from "midi";
import { getMidiChannel } from "./getMidiChannel";
import createDebug from "debug";
import { isSketchSwitch } from "./isSketchSwitch";

// exported for testing only
export const debug = createDebug("8tlr-router:midi:routeMidiMessage");

interface Args {
  outputs: Output[];
}

export function createMidiMessageRouter({ outputs }: Args): MidiMessageRouter {
  const selectedOutputIndices = new Array<number>(8).fill(0);
  const shiftChannel = new Array<boolean>(8).fill(false);
  debug(JSON.stringify(selectedOutputIndices));

  return (inputMidiMessage: MidiMessage) => {
    const outputMidiMessage: MidiMessage = [...inputMidiMessage];
    const inputChannel = getMidiChannel(inputMidiMessage);
    if (inputChannel > 7) {
      debug(
        `Invalid data - received MIDI message on channel ${inputChannel + 1}`,
      );
      return null;
    }

    if (isSketchSwitch(inputMidiMessage)) {
      selectedOutputIndices[inputChannel] = Math.floor(inputMidiMessage[2] / 2);
      shiftChannel[inputChannel] = inputMidiMessage[2] % 2 !== 0;
      debug(`out=${selectedOutputIndices} / shift=${shiftChannel}`);
      return null;
    }
    let outputChannel = inputChannel;
    if (shiftChannel[inputChannel]) {
      outputMidiMessage[0] += 8;
      outputChannel += 8;
    }
    const outputPortIndex = selectedOutputIndices[inputChannel];
    outputs[outputPortIndex].sendMessage(outputMidiMessage);

    return {
      inputChannel,
      outputPortIndex,
      outputChannel,
      outputMidiMessage,
    };
  };
}
