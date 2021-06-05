import { BinaryExp, ConditionExp, FalseExp, Identifier, NullExp, Numeral, StringLiteral, TrueExp, UnaryExp, UpdateExp, AssignmentExp } from './ast/node';
import { Parser } from './parser';
import { types as tt } from './token';

/*
  exp         ::= expAssign
  expAssign   ::= expCond { "=" expAssign }
  expCond     ::= expOr {"?" expAssign ":" expAssign }
  expOr       ::= expAnd {'||' expAnd}
  expAnd      ::= expQul {'&&' expQul}
  expQul      ::= expCmp {(‘!=’ | ‘==’) expCmp}
  expCmp      ::= expAdd {(‘<’ | ‘>’ | ‘<=’ | ‘>=’) expAdd}
  expAdd      ::= expMul {(‘+’ | ‘-’) expMul}
  expMul      ::= expUna {('*' | '/' | '%') expUna}
  expUna      ::= {(‘!’ | ‘-’)} expUpt
  expUpt      ::= expBasic {('++' | '--')}
  expBasic    ::= null | false | true | Numeral | LiteralString | Identifier | '(' exp ')'
*/

const pp = Parser.prototype;

pp.parseBasicExp = function () {
  switch (this.LookAhead()) {
    case tt._true.label:
      return new TrueExp({}, this.nextToken().value);
    case tt._false.label:
      return new FalseExp({}, this.nextToken().value);
    case tt._null.label:
      return new NullExp({}, this.nextToken().value);

    case tt.number.label:
      return new Numeral({}, this.nextToken().value);
    case tt.string.label:
      return new StringLiteral({}, this.nextToken().value);
    case tt.name.label:
      return new Identifier({}, this.nextToken().value)

    case tt.parenL.label: {
      this.nextToken();
      let exp = this.parseExp();
      this.eat(tt.parenR.label);
      return exp;
    }
  }
}

// x++ ++x x-- --x
pp.parseUptEpx = function () {
  switch(this.LookAhead()) {
    case tt.op_inc.label:
    case tt.op_dec.label: {
      const n = new UpdateExp({}, this.nextToken().value, this.parseBasicExp());
      n.prefix = true;
      return n;
    }
  }

  let exp = this.parseBasicExp();

  switch(this.LookAhead()) {
    case tt.op_inc.label:
    case tt.op_dec.label:
      return new UpdateExp({}, this.nextToken().value, exp);
  }

  return exp;
}

// (- | !) x
pp.parseUnaExp = function () {
  switch(this.LookAhead()) {
    case tt.op_not.label:
    case tt.op_minus.label:
      return new UnaryExp({}, this.nextToken().value, this.parseUnaExp());
  }
  return this.parseUptEpx();
}

// x (* | / | %) y
pp.parseMulExp = function () {
  let exp = this.parseUnaExp();
  while(this.LookAhead() !== tt.eof.label) {
    switch(this.LookAhead()) {
      case tt.op_mod.label:
      case tt.op_div.label:
      case tt.op_mul.label:
        exp = new BinaryExp({}, this.nextToken().value, exp, this.parseUnaExp());
        break;
      default:
        return exp;
    }
  }
  return exp;
}

// x (+ | -) y
pp.parseAddExp = function () {
  let exp = this.parseMulExp();
  while(this.LookAhead() !== tt.eof.label) {
    switch(this.LookAhead()) {
      case tt.op_add.label:
      case tt.op_minus.label: {
        exp = new BinaryExp({}, this.nextToken().value, exp, this.parseMulExp());
        break;
      }
      default:
        return exp;
    }
  }
  return exp;
}

// x (> | >= | < | <=) y
pp.parseCmpExp = function () {
  let exp = this.parseAddExp();
  switch(this.LookAhead()) {
    case tt.op_lt.label:
    case tt.op_le.label:
    case tt.op_ge.label:
    case tt.op_gt.label:
      return new BinaryExp({}, this.nextToken().value, exp, this.parseCmpExp());
  }
  return exp;
}

// x == y
// x != y
pp.parseQulExp = function () {
  let exp = this.parseCmpExp();
  switch(this.LookAhead()) {
    case tt.op_eq.label:
    case tt.op_ne.label:
      return new BinaryExp({}, this.nextToken().value, exp, this.parseQulExp());
  }
  return exp;
}

// x && y
pp.parseAndExp = function () {
  let exp = this.parseQulExp();
  switch(this.LookAhead()) {
    case tt.op_and.label:
      return new BinaryExp({}, this.nextToken().value, exp, this.parseAndExp());
  }
  return exp;
}

// x || y
pp.parseOrExp = function () {
  let exp = this.parseAndExp();
  switch(this.LookAhead()) {
    case tt.op_or.label:
      return new BinaryExp({}, this.nextToken().value, exp, this.parseOrExp());
  }
  return exp;
}

// x ? y : z
pp.parseConditional = function() {
  let exp = this.parseOrExp();
  while (this.LookAhead() && this.LookAhead() == tt.question.label) {
    this.nextToken()
    const consequent = this.parseAssignExp()
    if (this.LookAhead() && this.LookAhead() == tt.colon.label) {
      this.nextToken()
      const alternate = this.parseAssignExp()
      exp = new ConditionExp({}, exp, consequent, alternate)
    } else {
      this.raise('parseConditional error')
    }
  }
  return exp;
}

// x = exp
pp.parseAssignExp = function () {
  let exp = this.parseConditional();
  if (this.LookAhead() && this.LookAhead() == tt.op_assign.label) {
    if (exp.type !== "Identifier") {
      this.raise("Invalid left-hand side in assignment");
    }
    this.nextToken()
    exp = new AssignmentExp({}, exp, this.parseAssignExp())
  }
  return exp
}

pp.parseExp = function() {
  return this.parseAssignExp();
}
