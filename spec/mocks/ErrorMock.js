class ErrorMock {
  constructor(callback) {
    this._callback = callback;
  }

  getMock() {
    return jasmine.createSpy().and.callFake(this._callback);
  }
}

module.exports = ErrorMock;
