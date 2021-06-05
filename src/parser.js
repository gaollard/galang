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

  eat(type) {
    if (this.LookAhead() === type) {
      this.lexer.read();
    } else {
      this.raise('need ${type}')
    }
  }

  raise(msg) {
    throw new SyntaxError(msg);
  }
}