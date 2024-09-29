const config = {
  "!(*.ts)": "prettier --write",
  "*.ts": ["prettier --write", "eslint --fix"],
};

export default config;
