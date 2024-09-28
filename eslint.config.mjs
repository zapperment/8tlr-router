// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

// files and directories we do NOT want to lint
// (glob pattern)
const ignores = [".yarn", ".yarn.lock", ".pnp.cjs", ".vscode"];

const additionalConfig = { ignores };

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  additionalConfig,
);
