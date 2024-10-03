import createDebug from "debug";

const debug = createDebug("8tlr-router:cli:writeLine");

export function writeLine(message: string) {
  if (debug.enabled) {
    return;
  }
  process.stdout.write(message);
}
