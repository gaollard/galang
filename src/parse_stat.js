import { Parser } from './parser';
import { EmptyStat, Program } from './ast/node';
import { types as tt } from './token';

const pp = Parser.prototype;

/*
stat ::=  ‘;’
	| break
	| do block end
	| while '(' exp ')' block end
*/

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
  switch(this.LookAhead()){
    case tt.semi.label:
      return this.parseEmptyStat();
    case tt._while.label:
      return this.parseWhileStat();
    case tt.parenL.label: {
      return this.parseBlock();
    }
    default:
      return this.parseExp();
  }
}

// 空语句
pp.parseEmptyStat = function () {
  this.nextToken();
  return new EmptyStat();
}

// while(exp) block 
pp.parseWhileStat = function() {
  this.nextToken();
  let test = this.parseExp();
  let block = this.parseBlock();
  return 
}


