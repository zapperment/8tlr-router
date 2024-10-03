import createDebug from "debug";
import readline from "readline";

const debug = createDebug("8tlr-router:cli:writeLine");

export function resetLine() {
  if (debug.enabled) {
    return;
  }
  readline.cursorTo(process.stdout, 0);
}
