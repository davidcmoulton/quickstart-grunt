jest.dontMock('../src/js/my-module');

describe('my-module', function() {
 "use strict";
  it('greets you', function() {
   var puzzle = require('../src/js/my-module');
   expect(puzzle()).toEqual('Hello world');
 });
});
