import { Parser } from './parser'
import {
  EmptyStat,
  Identifier,
  Program,
  VariableDeclaration,
  VariableDeclarator,
  WhileStat,
} from './ast/node'
import { types as tt } from './token'

const pp = Parser.prototype

/*
stat ::=  ‘;’
	| while '(' exp ')' block end
  | "let"
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
    case tt._while.label:
      return this.parseWhileStat()
    case tt.braceL.label: {
      return this.parseBlock()
    }
    case tt._let.label:
      return this.parseVarStatement()
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
  debugger
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
