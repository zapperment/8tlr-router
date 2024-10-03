import type { MidiMessage } from "midi";
import { formatMidiMessage } from "../utils";
import chalk from "chalk";

interface Args {
  inputChannel: number;
  outputChannel: number;
  outputPortName: string;
  midiMessage: MidiMessage;
}

export function createMidiStatusReport({
  inputChannel,
  outputChannel,
  outputPortName,
  midiMessage,
}: Args) {
  const inputChannelStr = chalk.inverse.blue(
    String(inputChannel + 1).padStart(2, " "),
  );
  const outputChannelStr = chalk.inverse.green(
    String(outputChannel + 1).padStart(2, " "),
  );
  const outputPortNameStr = chalk.inverse.magenta(outputPortName);
  const messageStrHex = chalk.inverse.cyan(
    formatMidiMessage(midiMessage, true),
  );
  const messageStrDec = chalk.inverse.yellow(
    formatMidiMessage(midiMessage, false),
  );

  return `in channel: ${
    inputChannelStr
  }   out channel: ${outputChannelStr}   out port: ${
    outputPortNameStr
  }   message: ${messageStrHex} ${messageStrDec}`;
}
