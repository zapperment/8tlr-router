import type { MidiMessage } from "midi";
import { formatHex } from "./formatHex";
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
    String(inputChannel).padStart(2, " "),
  );
  const outputChannelStr = chalk.inverse.green(
    String(outputChannel).padStart(2, " "),
  );
  const outputPortNameStr = chalk.inverse.magenta(outputPortName);
  const messageStrHex = chalk.inverse.cyan(
    `${midiMessage.map((messagePart) => formatHex(messagePart)).join(" ")}`,
  );
  const messageStrDec = chalk.inverse.yellow(
    `${midiMessage.map((messagePart) => String(messagePart).padStart(3, " ")).join(" ")}`,
  );

  return `in channel: ${
    inputChannelStr
  }   out channel: ${outputChannelStr}   out port: ${
    outputPortNameStr
  }   message: ${messageStrHex} ${messageStrDec}`;
}
