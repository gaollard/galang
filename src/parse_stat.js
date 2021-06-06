import { Parser } from './parser'
import {
  EmptyStat,
  Identifier,
  IfStatement,
  Program,
  SwitchCase,
  SwitchStatement,
  VariableDeclaration,
  VariableDeclarator,
  WhileStat,
} from './ast/node'
import { types as tt } from './token'

const pp = Parser.prototype

/*
stat ::=  ‘;’
	| WhileStat https://www.processon.com/diagraming/60bbcba00e3e7468f4b8af35
  | VariableDeclaration https://www.processon.com/diagraming/60b9de0ee401fd4c8ba4beaf
  | SwitchStat https://www.processon.com/diagraming/60bbccf4637689502feab733
  | BreakStatement
  | IfStatment https://www.processon.com/diagraming/60bc7f337d9c0879370ed5f0
*/

pp.parseTopLevel = function () {
  const node = new Program()
  while (this.lexer.LookAhead() !== tt.eof.label) {
    let stmt = this.parseStatement()
    node.body.push(stmt)
  }
  return node
}

pp.parseStatement = function () {
  switch (this.LookAhead()) {
    case tt.semi.label:
      return this.parseEmptyStat()
    case tt.braceL.label:
      return this.parseBlock()
    case tt._while.label:
      return this.parseWhileStat()
    case tt._let.label:
      return this.parseVarStatement()
    case tt._switch.label:
      return this.parseSwitchStat()
    case tt._if.label:
      return this.parseIfStat();
    default:
      return this.parseExp()
  }
}

pp.parseEmptyStat = function () {
  this.nextToken()
  return new EmptyStat()
}

pp.parseWhileStat = function () {
  this.eat(tt._while.label)
  let test = this.parseExp()
  let block = this.parseBlock()
  return new WhileStat({}, test, block)
}

pp.parseVarStatement = function () {
  const kind = this.nextToken().value
  return new VariableDeclaration({}, kind, this.parseVar())
}

pp.parseVar = function () {
  let list = []
  for (;;) {
    let decl = new VariableDeclarator()
    decl.id = this.parseVarId()
    if (this.eat(tt.op_assign.label)) {
      decl.init = this.parseExp()
    } else {
      decl.init = null
    }
    list.push(decl)
    if (!this.eat(tt.comma.label)) break
  }
  return list
}

pp.parseVarId = function () {
  if (this.LookAhead() === tt.name.label) {
    return new Identifier({}, this.nextToken().value)
  } else {
    this.raise('invalid Identifier')
  }
}

pp.parseSwitchStat = function () {
  this.expect(tt._switch.label)
  this.expect(tt.parenL.label)

  const discriminant = this.parseExp()

  this.expect(tt.parenR.label)
  this.expect(tt.braceL.label)

  let cases = [];
  let cur = null;

  for (let sawDefault = false; this.LookAhead() !== tt.braceR.label;) {
    let type = this.LookAhead();
    let isCase = type === tt._case.label;
    let isDefualt = type === tt._default.label;
    if (isCase || isDefualt) {
      let test = null;
      this.nextToken()
      if (isCase) {
        test = this.parseExp();
      } else {
        sawDefault = true;
      }
      this.expect(tt.colon.label)
      cur = new SwitchCase({}, test, []);
      cases.push(cur)
    } else {
      cur.consequent.push(this.parseStatement());
    }
  }
  this.expect(tt.braceR.label)
  return new SwitchStatement({}, discriminant, cases)
}

// if a > a
pp.parseIfStat = function () {
  this.expect(tt._if.label);
  this.expect(tt.parenL.label);
  let test = this.parseExp();
  this.expect(tt.parenR.label);

  let alternate = null;
  let consequent = null;

  if (!(consequent = this.parseStatement())) {
    this.raise("Unexpected end of input")
  }

  if (this.LookAhead() === tt._else.label) {
    this.nextToken();
    if (this.LookAhead() === tt._if.label) {
      alternate = this.parseIfStat();
    } else {
      alternate = this.parseStatement();
    }
    if (!alternate) {
      this.raise("Unexpected end of input")
    }
  }

  return new IfStatement({}, test, consequent, alternate);
}