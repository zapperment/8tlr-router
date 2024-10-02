import type { MidiMessage } from "midi";
import { formatHex } from "./formatHex";
import chalk from "chalk";

interface Args {
  inChannel: number;
  outChannel: number;
  outPortName: string;
  message: MidiMessage;
}

export function createMidiStatusReport({
  inChannel,
  outChannel,
  outPortName,
  message,
}: Args) {
  const inChannelStr = chalk.inverse.blue(String(inChannel).padStart(2, " "));
  const outChannelStr = chalk.inverse.green(
    String(outChannel).padStart(2, " "),
  );
  const outPortNameStr = chalk.inverse.magenta(outPortName);
  const messageStrHex = chalk.inverse.cyan(
    `${message.map((messagePart) => formatHex(messagePart)).join(" ")}`,
  );
  const messageStrDec = chalk.inverse.yellow(
    `${message.map((messagePart) => String(messagePart).padStart(3, " ")).join(" ")}`,
  );

  return `in channel: ${
    inChannelStr
  }   out channel: ${outChannelStr}   out port: ${
    outPortNameStr
  }   message: ${messageStrHex} ${messageStrDec}`;
}
