class IllegalOperationException extends Error {
  constructor(msg) {
    super(msg)
    this.statusCode = 404
  }
}

module.exports = IllegalOperationException