import chalk from "chalk";
import { writeLine } from "./writeLine";

export function showStartupBanner() {
  writeLine(
    `${chalk.inverse.magenta(" 8TLR-ROUTER ")} - ${chalk.magenta("made with ♡ by Zapperment")} - waiting for MIDI input…`,
  );
}
