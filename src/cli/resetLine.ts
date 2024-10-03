import readline from "readline";

export function resetLine() {
  readline.cursorTo(process.stdout, 0);
}
