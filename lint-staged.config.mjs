const config = {
  "!(*.ts)": "prettier --write",
  "*.ts": ["prettier --write", "eslint --fix", "tsc --noEmit"],
};

export default config;
