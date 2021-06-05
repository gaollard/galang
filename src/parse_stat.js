import { Parser } from './parser';
import { Program } from './ast/node';
import { types as tt } from './token';

const pp = Parser.prototype;

// parse program
pp.parseTopLevel = function() {
  const node = new Program();
  while (this.lexer.LookAhead() !== tt.eof.label) {
    let stmt = this.parseStatement()
    node.body.push(stmt)
  }
  return node;
}

// parse stat 目录只支持表达式
pp.parseStatement = function() {
  return this.parseExp();
}