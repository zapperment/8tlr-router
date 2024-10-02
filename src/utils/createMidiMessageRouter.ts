import type { MidiMessage, Output } from "midi";
import { getMidiChannel } from "./getMidiChannel";
import createDebug from "debug";
import { isSketchSwitch } from "./isSketchSwitch";

const debug = createDebug("8tlr-router:utils:routeMidiMessage");

export function createMidiMessageRouter(outputs: Output[]) {
  const selectedOutputIndices = new Array<number>(8).fill(0);
  const shiftChannel = new Array<boolean>(8).fill(false);
  debug(JSON.stringify(selectedOutputIndices));

  return (midiMessage: MidiMessage) => {
    const inputChannel = getMidiChannel(midiMessage);
    if (inputChannel > 7) {
      debug(`Invalid data - received MIDI message on channel ${inputChannel}`);
      return null;
    }

    if (isSketchSwitch(midiMessage)) {
      selectedOutputIndices[inputChannel] = Math.floor(midiMessage[2] / 2);
      shiftChannel[inputChannel] = midiMessage[2] % 2 !== 0;
      debug(`out=${selectedOutputIndices} / shift=${shiftChannel}`);
      return null;
    }
    let outputChannel = inputChannel;
    if (shiftChannel[inputChannel]) {
      midiMessage[0] += 8;
      outputChannel += 8;
    }
    const outputPortIndex = selectedOutputIndices[inputChannel];
    outputs[outputPortIndex].sendMessage(midiMessage);

    return {
      inputChannel,
      outputPortIndex,
      outputChannel,
    };
  };
}
