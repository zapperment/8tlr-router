import { program } from "commander";
import createDebug from "debug";
import { main } from "./main";

const debug = createDebug("8tlr-router");

program
  .option("-V, --version", "show program version")
  .option("-o, --off", "send all notes off")
  .parse(process.argv);

const options = program.opts();

debug("Starting main routine");

main(options);
