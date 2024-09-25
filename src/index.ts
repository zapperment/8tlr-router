import { formatHex, getMidiChannel, initPort, isSketchSwitch } from "./utils";
import createDebug from "debug";
import type { Input, Output } from "midi";

const debug = createDebug("8tlr-router");

const portName = {
  input: "IAC Live to Bome",
  output: [
    "IAC Bome to Reason 1",
    "IAC Bome to Reason 2",
    "IAC Bome to Reason 3",
    "IAC Bome to Reason 4",
  ],
};

const input = initPort<Input>(portName.input, "input");

const outputs = portName.output.map((outputPortName) =>
  initPort<Output>(outputPortName, "output"),
);

let selectedOutputIndices = new Array<number>(8).fill(0);
let shiftChannel = new Array<boolean>(8).fill(false);
debug(JSON.stringify(selectedOutputIndices));

input.on("message", (_, message) => {
  const channel = getMidiChannel(message);
  if (isSketchSwitch(message)) {
    selectedOutputIndices[channel] = Math.floor(message[2] / 2);
    shiftChannel[channel] = message[2] % 2 !== 0;
    debug(`out=${selectedOutputIndices} / shift=${shiftChannel}`);
    return;
  }
  if (shiftChannel[channel]) {
    message[0] += 8;
  }
  debug(
    `ch=${channel} - out=${selectedOutputIndices[channel]} - shift=${shiftChannel[channel]} - ${message.map((messagePart) => formatHex(messagePart)).join(" - ")}`,
  );
  outputs[selectedOutputIndices[channel]].sendMessage(message);
});
