const config = {
  "!(*.ts)": "prettier --write",
  "*.ts": [
    "eslint --fix",
    () => "tsc --noEmit --project tsconfig.json",
    "prettier --write",
    "vitest run related --passWithNoTests",
  ],
};

export default config;
