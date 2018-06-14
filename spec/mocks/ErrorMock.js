class ErrorMock {
  constructor(callback) {
    this._callback = callback;
  }

  getMock() {
    return this._callback ? jasmine.createSpy().and.callFake(this._callback)
      : jasmine.createSpy();
  }
}

module.exports = ErrorMock;
