import { getMidiChannel, initPort, isSketchSwitch, reportMidiStatus,createMidiStatusReport } from "./utils";
import createDebug from "debug";
import { portName } from "./constants";
import type { Input, Output } from "midi";

const debug = createDebug("8tlr-router:main");

export async function main() {
  const input = initPort<Input>(portName.input, "input");

  const outputs = portName.output.map((outputPortName) =>
    initPort<Output>(outputPortName, "output"),
  );

  const selectedOutputIndices = new Array<number>(8).fill(0);
  const shiftChannel = new Array<boolean>(8).fill(false);
  debug(JSON.stringify(selectedOutputIndices));

  input.on("message", (_, message) => {
    const inChannel = getMidiChannel(message);
    if (inChannel>7){
      debug(`Invalid data - received MIDI message on channel ${inChannel}`);
      return;
    }
    if (isSketchSwitch(message)) {
      selectedOutputIndices[inChannel] = Math.floor(message[2] / 2);
      shiftChannel[inChannel] = message[2] % 2 !== 0;
      debug(`out=${selectedOutputIndices} / shift=${shiftChannel}`);
      return;
    }
    let outChannel = inChannel;
    if (shiftChannel[inChannel]) {
      message[0] += 8;
      outChannel += 8;
    }
    const msg = createMidiStatusReport({
      inChannel,
      outChannel,
      outPortName: portName.output[selectedOutputIndices[inChannel]],
      message
    })

    if (debug.enabled) {
      debug(msg);
    } else {
      reportMidiStatus(msg);
    }

    outputs[selectedOutputIndices[inChannel]].sendMessage(message);
  });
}
