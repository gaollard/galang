import { BlockStat } from './ast/node';
import { Parser } from './parser';
import { types as tt } from './token';

const pp = Parser.prototype;

pp.parseBlock = function() {
  this.eat(tt.parenL.label);

  const stats = [];

  while (this.LookAhead() !== tt.eof.label && this.LookAhead() !== tt.parenR.label) {
    let stmt = this.parseStatement();
    stats.push(stmt);
  }

  this.eat(tt.parenR.label);

  return new BlockStat({}, stats)
}
