class ResponseMock {
  constructor(sendCallback) {
    this._sendCallback = sendCallback;
  }

  getMock() {
    return {
      send: jasmine.createSpy().and.callFake(this._sendCallback)
    };
  }
}

module.exports = ResponseMock;
