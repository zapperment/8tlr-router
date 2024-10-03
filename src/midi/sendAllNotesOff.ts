import type { Output } from "midi";
import createDebug from "debug";

const debug = createDebug("8tlr-router:midi:sendAllNotesOff");

export function sendAllNotesOff(outputs: Output[]) {
  for (let outputIndex = 0; outputIndex < outputs.length; outputIndex++) {
    for (let channelIndex = 0; channelIndex < 8; channelIndex++) {
      debug(
        `Send all notes off to port ${outputIndex + 1} on channel ${channelIndex + 1}`,
      );
      outputs[outputIndex].sendMessage([0xb0 + channelIndex, 0x7b, 0x00]);
    }
  }
}
