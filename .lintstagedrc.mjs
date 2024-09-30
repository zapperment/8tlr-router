const config = {
  "!(*.ts)": "prettier --write",
  "*.ts": ["eslint --fix", "tsc --noEmit", "prettier --write"],
};

export default config;
