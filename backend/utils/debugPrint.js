function debugPrint(message) {
  if (JSON.parse(process.env.DEBUG)) console.log(message);
}
module.exports = debugPrint;
