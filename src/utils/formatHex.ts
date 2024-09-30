export function formatHex(num) {
  return `0x${num.toString(16).toUpperCase().padStart(2, "0")} ${`(${num})`.padStart(5, " ")}`;
}
