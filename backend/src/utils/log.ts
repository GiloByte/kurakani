export function log(message: string) {
  if (process.env.DEBUG === "true") console.log(message);
}
