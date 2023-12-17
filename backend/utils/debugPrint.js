function debugPrint(message) {
  if ( process.env.DEBUG === "true") console.log(message);
}
module.exports = debugPrint;
