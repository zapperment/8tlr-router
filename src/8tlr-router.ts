import { program } from "commander";
import createDebug from "debug";
import { programVersion } from "./constants";
import { main } from "./main";

const debug = createDebug("8tlr-router");

program.option("-V, --version", "show program version");

program.parse(process.argv);

const options = program.opts();

if (options.version) {
  console.log(programVersion);
  process.exit(0);
}

debug("Starting main routine");

main();
