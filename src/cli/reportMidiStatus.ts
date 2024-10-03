import readline from "readline";

export function reportMidiStatus(message: string) {
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(message);
}
