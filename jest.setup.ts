import '@testing-library/jest-dom';
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const { Request } = require('node-fetch');

class CustomRequest extends Request {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, init);
    Object.setPrototypeOf(this, CustomRequest.prototype);
  }
}

global.Request = CustomRequest as unknown as typeof Request;