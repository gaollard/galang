import { Parser } from './parser'
import {
  EmptyStat,
  ExpressionStatement,
  ForStatment,
  FunctionDeclaration,
  Identifier,
  IfStatement,
  Program,
  ReturnStatement,
  SwitchCase,
  SwitchStatement,
  VariableDeclaration,
  VariableDeclarator,
  WhileStat,
} from '../ast/node'
import { types as tt } from './token'

const pp = Parser.prototype

/*
stat ::=  ‘;’
	| WhileStat https://www.processon.com/diagraming/60bbcba00e3e7468f4b8af35
  | VariableDeclaration https://www.processon.com/diagraming/60b9de0ee401fd4c8ba4beaf
  | SwitchStat https://www.processon.com/diagraming/60bbccf4637689502feab733
  | BreakStatement
  | IfStatment https://www.processon.com/diagraming/60bc7f337d9c0879370ed5f0
  | ForStatment https://www.processon.com/diagraming/60bcd33d7d9c0879370f61a4
  | FunctionDeclaration https://www.processon.com/diagraming/60bd8bb30791297a3f01ba38
*/

// if semicolon exit then eat it
pp.semicolon = function () {
  this.eat(tt.semi.label)
}

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
      return this.parseEmptyStatement()
    case tt.braceL.label:
      return this.parseBlock()
    case tt._while.label:
      return this.parseWhileStatement()
    case tt._let.label:
      return this.parseVarStatement()
    case tt._switch.label:
      return this.parseSwitchStat()
    case tt._if.label:
      return this.parseIfStat()
    case tt._for.label:
      return this.parseForStatement()
    case tt._function.label:
      return this.parseFunctionStatement()
    case tt._return.label:
      return this.parseReturnStatement()
    default:
      return this.parseExpressionStatement()
  }
}

pp.parseExpressionStatement = function () {
  const node = new ExpressionStatement({}, this.parseExp())
  this.semicolon()
  return node
}

pp.parseEmptyStatement = function () {
  this.expect(tt.semi.label);
  return new EmptyStat()
}

pp.parseWhileStatement = function () {
  this.eat(tt._while.label)
  let test = this.parseExp()
  let block = this.parseBlock()
  return new WhileStat({}, test, block)
}

pp.parseVarStatement = function () {
  const kind = this.nextToken().value
  const varList = this.parseVar()
  this.semicolon();
  return new VariableDeclaration({}, kind, varList)
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

  let cases = []
  let cur = null

  for (let sawDefault = false; this.LookAhead() !== tt.braceR.label; ) {
    let type = this.LookAhead()
    let isCase = type === tt._case.label
    let isDefualt = type === tt._default.label
    if (isCase || isDefualt) {
      let test = null
      this.nextToken()
      if (isCase) {
        test = this.parseExp()
      } else {
        sawDefault = true
      }
      this.expect(tt.colon.label)
      cur = new SwitchCase({}, test, [])
      cases.push(cur)
    } else {
      cur.consequent.push(this.parseStatement())
    }
  }
  this.expect(tt.braceR.label)
  return new SwitchStatement({}, discriminant, cases)
}

// if a > a
pp.parseIfStat = function () {
  this.expect(tt._if.label)
  this.expect(tt.parenL.label)
  let test = this.parseExp()
  this.expect(tt.parenR.label)

  let alternate = null
  let consequent = null

  if (!(consequent = this.parseStatement())) {
    this.raise('Unexpected end of input')
  }

  if (this.LookAhead() === tt._else.label) {
    this.nextToken()
    if (this.LookAhead() === tt._if.label) {
      alternate = this.parseIfStat()
    } else {
      alternate = this.parseStatement()
    }
    if (!alternate) {
      this.raise('Unexpected end of input')
    }
  }

  return new IfStatement({}, test, consequent, alternate)
}

pp.parseForStatement = function () {
  this.expect(tt._for.label)
  this.expect(tt.parenL.label)

  let init = null

  if (this.LookAhead() === tt._let.label) {
    init = this.parseVarStatement()
  } else if (this.LookAhead() === tt.semi.label) {
    init = null
  } else {
    init = this.parseExp()
  }

  this.expect(tt.semi.label)

  let test = this.LookAhead() === tt.semi.label ? null : this.parseExp()

  this.expect(tt.semi.label)

  let update = this.LookAhead() === tt.parenR.label ? null : this.parseExp()

  this.expect(tt.parenR.label)

  let body = this.parseBlock()

  return new ForStatment({}, init, test, update, body)
}

pp.parseFunctionStatement = function () {
  this.expect(tt._function.label)
  const node = new FunctionDeclaration({}, null, [], null)

  node.id = this.parseIdentifier()
  if (node.id === null) {
    this.raise('unexpected identifier')
  }
  this.expect(tt.parenL.label)

  if (this.LookAhead() === tt.parenR.label) {
    node.params = []
  } else {
    const getId = () => {
      let id = this.parseIdentifier()
      if (id === null) {
        this.raise('unexpected identifier')
      } else {
        node.params.push(id)
      }
    }
    getId()
    while (this.LookAhead() === tt.comma.label) {
      this.nextToken()
      getId()
    }
  }

  this.expect(tt.parenR.label)

  node.body = this.parseBlock()

  return node
}

pp.parseReturnStatement = function () {
  const node = new ReturnStatement({}, null)
  this.expect(tt._return.label)
  if (!this.eat(tt.semi.label)) {
    node.argument = this.parseExp()
  }
  this.semicolon()
  return node
}
