export class Parser {
  constructor(options) {
    this.lexer = options.lexer;
    this.tokens = options.tokens;
    this.options = this.options;
  }

  parse() {
    return this.parseTopLevel()
  }

  LookAhead () {
    return this.lexer.LookAhead();
  }

  nextToken() {
    return this.lexer.read();
  }

  unexpected() {}

  expect (type) {
    this.eat(type) || this.raise(`need ${type}`)
  }
  
  eat(type) {
    if (this.LookAhead() === type) {
      this.nextToken();
      return true;
    } else {
      return false;
    }
  }

  raise(msg) {
    throw new SyntaxError(msg);
  }
}