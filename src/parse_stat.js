import { Parser } from './parser'
import {
  EmptyStat,
  Identifier,
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
  | SwitchStat
  | BreakStatement
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

// VarStatment ---------------------------------------------------------------------------------
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

  const cases = []

  for (;;) {
    if (this.LookAhead() === tt._case.label) {
      this.nextToken()
      const test = this.parseExp()
      this.expect(tt.colon.label)
      const consequent = []
      while (
        this.LookAhead() &&
        this.LookAhead() !== tt._case.label &&
        this.LookAhead() !== tt._default.label &&
        this.LookAhead() !== tt.braceR.label
      ) {
        consequent.push(this.parseStatement())
      }
      cases.push(new SwitchCase({}, test, consequent))
    } else if (this.LookAhead() === tt._default.label) {
      this.nextToken()
      this.expect(tt.colon.label)
      const consequent = []
      while (
        this.LookAhead() &&
        this.LookAhead() !== tt._case.label &&
        this.LookAhead() !== tt.braceR.label
      ) {
        consequent.push(this.parseStatement())
      }
      cases.push(new SwitchCase({}, null, consequent))
    } else {
      break
    }
  }

  this.expect(tt.braceR.label)

  return new SwitchStatement({}, discriminant, cases)
}
