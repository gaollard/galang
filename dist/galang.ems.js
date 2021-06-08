var Node = function Node() {
  // this.start = null;
  // this.end = null;
  // this.loc = null;
};

var Program = /*@__PURE__*/(function (Node) {
  function Program(params) {
    Node.call(this, params);
    this.type = 'Program';
    this.body = [];
  }

  if ( Node ) Program.__proto__ = Node;
  Program.prototype = Object.create( Node && Node.prototype );
  Program.prototype.constructor = Program;

  return Program;
}(Node));
var ExpressionStatement = /*@__PURE__*/(function (Node) {
  function ExpressionStatement(params, expression) {
    Node.call(this, params);
    this.type = 'ExpressionStatement';
    this.expression = expression;
  }

  if ( Node ) ExpressionStatement.__proto__ = Node;
  ExpressionStatement.prototype = Object.create( Node && Node.prototype );
  ExpressionStatement.prototype.constructor = ExpressionStatement;

  return ExpressionStatement;
}(Node));
var FalseExp = /*@__PURE__*/(function (Node) {
  function FalseExp(params) {
    Node.call(this, params);
    this.type = 'FalseExp';
  }

  if ( Node ) FalseExp.__proto__ = Node;
  FalseExp.prototype = Object.create( Node && Node.prototype );
  FalseExp.prototype.constructor = FalseExp;

  return FalseExp;
}(Node));

var TrueExp = /*@__PURE__*/(function (Node) {
  function TrueExp(params) {
    Node.call(this, params);
    this.type = 'TrueExp';
  }

  if ( Node ) TrueExp.__proto__ = Node;
  TrueExp.prototype = Object.create( Node && Node.prototype );
  TrueExp.prototype.constructor = TrueExp;

  return TrueExp;
}(Node));

var NullExp = /*@__PURE__*/(function (Node) {
  function NullExp(params) {
    Node.call(this, params);
    this.type = 'NullExp';
  }

  if ( Node ) NullExp.__proto__ = Node;
  NullExp.prototype = Object.create( Node && Node.prototype );
  NullExp.prototype.constructor = NullExp;

  return NullExp;
}(Node));

var Numeral = /*@__PURE__*/(function (Node) {
  function Numeral(params, value) {
    Node.call(this, params);
    this.type = 'Numeral';
    this.value = value;
  }

  if ( Node ) Numeral.__proto__ = Node;
  Numeral.prototype = Object.create( Node && Node.prototype );
  Numeral.prototype.constructor = Numeral;

  return Numeral;
}(Node));

var StringLiteral = /*@__PURE__*/(function (Node) {
  function StringLiteral(params, value) {
    Node.call(this, params);
    this.type = 'StringLiteral';
    this.value = value;
  }

  if ( Node ) StringLiteral.__proto__ = Node;
  StringLiteral.prototype = Object.create( Node && Node.prototype );
  StringLiteral.prototype.constructor = StringLiteral;

  return StringLiteral;
}(Node));

var Identifier = /*@__PURE__*/(function (Node) {
  function Identifier(params, name) {
    Node.call(this, params);
    this.type = 'Identifier';
    this.name = name;
  }

  if ( Node ) Identifier.__proto__ = Node;
  Identifier.prototype = Object.create( Node && Node.prototype );
  Identifier.prototype.constructor = Identifier;

  return Identifier;
}(Node));

var UpdateExp = /*@__PURE__*/(function (Node) {
  function UpdateExp(params, op, argument, prefix) {
    Node.call(this, params);
    this.type = 'UpdateExp';
    this.op = op;
    this.argument = argument;
    this.prefix = prefix || false;
  }

  if ( Node ) UpdateExp.__proto__ = Node;
  UpdateExp.prototype = Object.create( Node && Node.prototype );
  UpdateExp.prototype.constructor = UpdateExp;

  return UpdateExp;
}(Node));

var UnaryExp = /*@__PURE__*/(function (Node) {
  function UnaryExp(params, op, argument) {
    Node.call(this, params);
    this.type = 'UnaryExp';
    this.op = op;
    this.argument = argument;
  }

  if ( Node ) UnaryExp.__proto__ = Node;
  UnaryExp.prototype = Object.create( Node && Node.prototype );
  UnaryExp.prototype.constructor = UnaryExp;

  return UnaryExp;
}(Node));

var BinaryExp = /*@__PURE__*/(function (Node) {
  function BinaryExp(params, op, lExp, rExp) {
    Node.call(this, params);
    this.type = 'BinaryExp';
    this.op = op;
    this.left = lExp;
    this.right = rExp;
  }

  if ( Node ) BinaryExp.__proto__ = Node;
  BinaryExp.prototype = Object.create( Node && Node.prototype );
  BinaryExp.prototype.constructor = BinaryExp;

  return BinaryExp;
}(Node));

var ConditionExp = /*@__PURE__*/(function (Node) {
  function ConditionExp(params, test, consequent, alternate) {
    Node.call(this, params);
    this.type = 'ConditionExp';
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
  }

  if ( Node ) ConditionExp.__proto__ = Node;
  ConditionExp.prototype = Object.create( Node && Node.prototype );
  ConditionExp.prototype.constructor = ConditionExp;

  return ConditionExp;
}(Node));

var AssignmentExp = /*@__PURE__*/(function (Node) {
  function AssignmentExp(params, left, right) {
    Node.call(this, params);
    this.type = 'AssignmentExp';
    this.left = left;
    this.right = right;
  }

  if ( Node ) AssignmentExp.__proto__ = Node;
  AssignmentExp.prototype = Object.create( Node && Node.prototype );
  AssignmentExp.prototype.constructor = AssignmentExp;

  return AssignmentExp;
}(Node));

var EmptyStat = /*@__PURE__*/(function (Node) {
  function EmptyStat(params) {
    Node.call(this, params);
  }

  if ( Node ) EmptyStat.__proto__ = Node;
  EmptyStat.prototype = Object.create( Node && Node.prototype );
  EmptyStat.prototype.constructor = EmptyStat;

  return EmptyStat;
}(Node));

var WhileStat = /*@__PURE__*/(function (Node) {
  function WhileStat(params, test, body) {
    Node.call(this, params);
    this.type = 'WhileStat';
    this.test = test;
    this.body = body;
  }

  if ( Node ) WhileStat.__proto__ = Node;
  WhileStat.prototype = Object.create( Node && Node.prototype );
  WhileStat.prototype.constructor = WhileStat;

  return WhileStat;
}(Node));

var BlockStat = /*@__PURE__*/(function (Node) {
  function BlockStat(params, body) {
    Node.call(this, params);
    this.type = 'BlockStat';
    this.body = body;
  }

  if ( Node ) BlockStat.__proto__ = Node;
  BlockStat.prototype = Object.create( Node && Node.prototype );
  BlockStat.prototype.constructor = BlockStat;

  return BlockStat;
}(Node));

var VariableDeclaration = /*@__PURE__*/(function (Node) {
  function VariableDeclaration(params, kind, declarations) {
    Node.call(this, params);
    this.type = 'VariableDeclaration';
    this.kind = kind;
    this.declarations = declarations;
  }

  if ( Node ) VariableDeclaration.__proto__ = Node;
  VariableDeclaration.prototype = Object.create( Node && Node.prototype );
  VariableDeclaration.prototype.constructor = VariableDeclaration;

  return VariableDeclaration;
}(Node));

var VariableDeclarator = /*@__PURE__*/(function (Node) {
  function VariableDeclarator(params, id, init) {
    Node.call(this, params);
    this.type = 'VariableDeclarator';
    this.id = id;
    this.init = init;
  }

  if ( Node ) VariableDeclarator.__proto__ = Node;
  VariableDeclarator.prototype = Object.create( Node && Node.prototype );
  VariableDeclarator.prototype.constructor = VariableDeclarator;

  return VariableDeclarator;
}(Node));

var SwitchStatement = /*@__PURE__*/(function (Node) {
  function SwitchStatement(params, discriminant, cases) {
    Node.call(this, params);
    this.type = 'SwitchStatement';
    this.discriminant = discriminant;
    this.cases = cases;
  }

  if ( Node ) SwitchStatement.__proto__ = Node;
  SwitchStatement.prototype = Object.create( Node && Node.prototype );
  SwitchStatement.prototype.constructor = SwitchStatement;

  return SwitchStatement;
}(Node));

var SwitchCase = /*@__PURE__*/(function (Node) {
  function SwitchCase(params, test, consequent) {
    Node.call(this, params);
    this.type = 'SwitchCase';
    this.test = test;
    this.consequent = consequent;
  }

  if ( Node ) SwitchCase.__proto__ = Node;
  SwitchCase.prototype = Object.create( Node && Node.prototype );
  SwitchCase.prototype.constructor = SwitchCase;

  return SwitchCase;
}(Node));

/*@__PURE__*/((function (Node) {
  function BreakStatement(params, label) {
    Node.call(this, params);
    this.type = 'BreakStatement';
    this.label = label || null;
  }

  if ( Node ) BreakStatement.__proto__ = Node;
  BreakStatement.prototype = Object.create( Node && Node.prototype );
  BreakStatement.prototype.constructor = BreakStatement;

  return BreakStatement;
})(Node));

/*@__PURE__*/((function (Node) {
  function DefaultStatement(params) {
    Node.call(this, params);
    this.type = 'DefaultStatement';
  }

  if ( Node ) DefaultStatement.__proto__ = Node;
  DefaultStatement.prototype = Object.create( Node && Node.prototype );
  DefaultStatement.prototype.constructor = DefaultStatement;

  return DefaultStatement;
})(Node));

var IfStatement = /*@__PURE__*/(function (Node) {
  function IfStatement(params, test, consequent, alternate) {
    Node.call(this, params);
    this.type = 'IfStatement';
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
  }

  if ( Node ) IfStatement.__proto__ = Node;
  IfStatement.prototype = Object.create( Node && Node.prototype );
  IfStatement.prototype.constructor = IfStatement;

  return IfStatement;
}(Node));

var ForStatment = /*@__PURE__*/(function (Node) {
  function ForStatment(params, init, test, update, body) {
    Node.call(this, params);
    this.type = 'ForStatment';
    this.init = init;
    this.test = test;
    this.update = update;
    this.body = body;
  }

  if ( Node ) ForStatment.__proto__ = Node;
  ForStatment.prototype = Object.create( Node && Node.prototype );
  ForStatment.prototype.constructor = ForStatment;

  return ForStatment;
}(Node));

var FunctionDeclaration = /*@__PURE__*/(function (Node) {
  function FunctionDeclaration(option, id, params, body) {
    Node.call(this, option);
    this.type = 'FunctionDeclaration';
    this.id = id;
    this.params = params;
    this.body = body;
  }

  if ( Node ) FunctionDeclaration.__proto__ = Node;
  FunctionDeclaration.prototype = Object.create( Node && Node.prototype );
  FunctionDeclaration.prototype.constructor = FunctionDeclaration;

  return FunctionDeclaration;
}(Node));

var ReturnStatement = /*@__PURE__*/(function (Node) {
  function ReturnStatement(option, argument) {
    Node.call(this, option);
    this.type = 'ReturnStatement';
    this.argument = argument;
  }

  if ( Node ) ReturnStatement.__proto__ = Node;
  ReturnStatement.prototype = Object.create( Node && Node.prototype );
  ReturnStatement.prototype.constructor = ReturnStatement;

  return ReturnStatement;
}(Node));

var CallExpression = /*@__PURE__*/(function (Node) {
  function CallExpression(option, callee, args) {
    Node.call(this, option);
    this.type = 'CallExpression';
    this.callee = callee;
    this.args = args;
  }

  if ( Node ) CallExpression.__proto__ = Node;
  CallExpression.prototype = Object.create( Node && Node.prototype );
  CallExpression.prototype.constructor = CallExpression;

  return CallExpression;
}(Node));

var Parser = function Parser(options) {
  this.lexer = options.lexer;
  this.tokens = options.tokens;
  this.options = this.options;
};

Parser.prototype.parse = function parse () {
  return this.parseTopLevel()
};

Parser.prototype.LookAhead = function LookAhead (index) {
    if ( index === void 0 ) index = 1;

  return this.lexer.LookAhead(index);
};

Parser.prototype.nextToken = function nextToken () {
  return this.lexer.read();
};

Parser.prototype.unexpected = function unexpected () {};

Parser.prototype.expect = function expect (type) {
  this.eat(type) || this.raise(("need " + type));
};
  
Parser.prototype.eat = function eat (type) {
  if (this.LookAhead() === type) {
    this.nextToken();
    return true;
  } else {
    return false;
  }
};

Parser.prototype.raise = function raise (msg) {
  throw new SyntaxError(msg);
};

var TokenType = function TokenType(label, opt) {
  if ( opt === void 0 ) opt = {};

  this.label = label;
  this.keyword = opt.keyword;
};

// keywords
var keywords = {};

// make keyword token
function kw(name, options) {
  if ( options === void 0 ) options = {};

  options.keyword = name;
  return keywords[name] = new TokenType(name, options)
}

// all token include keywords and other symbol
var types = {
  number:     new TokenType("number"),
  regexp:     new TokenType("regexp"),
  string:     new TokenType("string"),
  name:       new TokenType("name"),
  eof:        new TokenType("eof"),

  // Punctuation token types
  bracketL:   new TokenType("["),
  bracketR:   new TokenType("]"),
  braceL:     new TokenType("{"),
  braceR:     new TokenType("}"),
  parenL:     new TokenType("("),
  parenR:     new TokenType(")"),
  comma:      new TokenType(","),
  semi:       new TokenType(";"),
  colon:      new TokenType(":"),
  dot:        new TokenType("."),
  question:   new TokenType("?"),

  // OP
  op_assign:    new TokenType("="),
  op_assign_1:  new TokenType("+="),
  op_assign_2:  new TokenType("-="),
  op_assign_3:  new TokenType("*="),
  op_assign_4:  new TokenType("/="),
  op_assign_5:  new TokenType("%="),

  op_minus:   new TokenType("-"),
  op_add:     new TokenType("+"),
  op_mul:     new TokenType("*"),
  op_div:     new TokenType("/"),
  op_mod:     new TokenType("%"),

  op_lt:      new TokenType("<"),
  op_le:      new TokenType("<="),
  op_gt:      new TokenType(">"),
  op_ge:      new TokenType(">="),
  
  op_eq:      new TokenType("=="),
  op_ne:      new TokenType("!="),

  op_and:     new TokenType("&&"),
  op_or:      new TokenType("||"),
  op_not:     new TokenType("!"),

  op_inc:     new TokenType("++"),
  op_dec:     new TokenType("--"),

  // keyword token types
  _if:        kw("if"),
  _else:      kw('else'),
  _let:       kw('let'),
  _const:     kw('const'),
  _for:       kw('for'),
  _do:        kw('do'),
  _break:     kw('break'),
  _while:     kw('while'),
  _continue:  kw('continue'),
  _switch:    kw('switch'),
  _case:      kw('case'),
  _default:   kw('default'),
  _function:  kw('function'),
  _return:    kw('return'),
  _try:       kw('try'),
  _catch:     kw('catch'),
  _finally:   kw('finally'),
  _throw:     kw('throw'),
  _null:      kw('null'),
  _true:      kw('true'),
  _false:     kw('false'),
};

var regUtil = {
  whitespcae: /\s/,            // 空格
  numbers: /[0-9]/,            // 数字
  letters: /[a-z]/i,           // 字母
  identifier: /[_\da-zA-Z]/i   // 标志符
};

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
  expBasic    ::= null |
                  false |
                  true |
                  Numeral |
                  LiteralString |
                  Identifier |
                  '(' exp ')' |
                  CallExp

  CallExp     ::= Identifier "(" 参数列表 ")" 暂时只支持 fn() https://www.processon.com/diagraming/60bf7d717d9c087937157938
*/

var pp$2 = Parser.prototype;

pp$2.parseCallExpression = function() {
  var callee = types.name.label;
  this.expect(types.name.label);
  this.expect(types.parenL.label);
  var args = [];
  while(this.LookAhead() !== types.eof.label && this.LookAhead() !== types.parenR.label) {
    args.push(this.parseExp());
    if (!this.eat(types.comma.label)) {
      break;
    }
  }
  this.expect(types.parenR.label);
  return new CallExpression({}, callee, args);
};

pp$2.parseIdentifier = function () {
  if (this.LookAhead() === types.name.label) {
    return new Identifier({}, this.nextToken().value);
  }
  return null;
};

pp$2.parseBasicExp = function () {
  switch (this.LookAhead()) {
    case types._true.label:
      return new TrueExp({}, this.nextToken().value);
    case types._false.label:
      return new FalseExp({}, this.nextToken().value);
    case types._null.label:
      return new NullExp({}, this.nextToken().value);

    case types.number.label:
      return new Numeral({}, this.nextToken().value);
    case types.string.label:
      return new StringLiteral({}, this.nextToken().value);
    case types.name.label:
      if (this.LookAhead(2) === types.parenL.label) {
        return this.parseCallExpression();
      }
      return new Identifier({}, this.nextToken().value)

    case types.parenL.label: {
      this.nextToken();
      var exp = this.parseExp();
      this.eat(types.parenR.label);
      return exp;
    }
  }
};

// x++ ++x x-- --x
pp$2.parseUptEpx = function () {
  switch(this.LookAhead()) {
    case types.op_inc.label:
    case types.op_dec.label: {
      var n = new UpdateExp({}, this.nextToken().value, this.parseBasicExp());
      n.prefix = true;
      return n;
    }
  }

  var exp = this.parseBasicExp();

  switch(this.LookAhead()) {
    case types.op_inc.label:
    case types.op_dec.label:
      return new UpdateExp({}, this.nextToken().value, exp);
  }

  return exp;
};

// (- | !) x
pp$2.parseUnaExp = function () {
  switch(this.LookAhead()) {
    case types.op_not.label:
    case types.op_minus.label:
      return new UnaryExp({}, this.nextToken().value, this.parseUnaExp());
  }
  return this.parseUptEpx();
};

// x (* | / | %) y
pp$2.parseMulExp = function () {
  var exp = this.parseUnaExp();
  while(this.LookAhead() !== types.eof.label) {
    switch(this.LookAhead()) {
      case types.op_mod.label:
      case types.op_div.label:
      case types.op_mul.label:
        exp = new BinaryExp({}, this.nextToken().value, exp, this.parseUnaExp());
        break;
      default:
        return exp;
    }
  }
  return exp;
};

// x (+ | -) y
pp$2.parseAddExp = function () {
  var exp = this.parseMulExp();
  while(this.LookAhead() !== types.eof.label) {
    switch(this.LookAhead()) {
      case types.op_add.label:
      case types.op_minus.label: {
        exp = new BinaryExp({}, this.nextToken().value, exp, this.parseMulExp());
        break;
      }
      default:
        return exp;
    }
  }
  return exp;
};

// x (> | >= | < | <=) y
pp$2.parseCmpExp = function () {
  var exp = this.parseAddExp();
  switch(this.LookAhead()) {
    case types.op_lt.label:
    case types.op_le.label:
    case types.op_ge.label:
    case types.op_gt.label:
      return new BinaryExp({}, this.nextToken().value, exp, this.parseCmpExp());
  }
  return exp;
};

// x == y
// x != y
pp$2.parseQulExp = function () {
  var exp = this.parseCmpExp();
  switch(this.LookAhead()) {
    case types.op_eq.label:
    case types.op_ne.label:
      return new BinaryExp({}, this.nextToken().value, exp, this.parseQulExp());
  }
  return exp;
};

// x && y
pp$2.parseAndExp = function () {
  var exp = this.parseQulExp();
  switch(this.LookAhead()) {
    case types.op_and.label:
      return new BinaryExp({}, this.nextToken().value, exp, this.parseAndExp());
  }
  return exp;
};

// x || y
pp$2.parseOrExp = function () {
  var exp = this.parseAndExp();
  switch(this.LookAhead()) {
    case types.op_or.label:
      return new BinaryExp({}, this.nextToken().value, exp, this.parseOrExp());
  }
  return exp;
};

// x ? y : z
pp$2.parseConditional = function() {
  var exp = this.parseOrExp();
  while (this.LookAhead() && this.LookAhead() == types.question.label) {
    this.nextToken();
    var consequent = this.parseAssignExp();
    if (this.LookAhead() && this.LookAhead() == types.colon.label) {
      this.nextToken();
      var alternate = this.parseAssignExp();
      exp = new ConditionExp({}, exp, consequent, alternate);
    } else {
      this.raise('parseConditional error');
    }
  }
  return exp;
};

// x = exp
pp$2.parseAssignExp = function () {
  var exp = this.parseConditional();
  if (this.LookAhead()) {
    switch (this.LookAhead()) {
      case types.op_assign.label:
      case types.op_assign_1.label:
      case types.op_assign_2.label:
      case types.op_assign_3.label:
      case types.op_assign_4.label:
      case types.op_assign_5.label: {
        if (exp.type !== "Identifier") {
          this.raise("Invalid left-hand side in assignment");
        }
        this.nextToken();
        exp = new AssignmentExp({}, exp, this.parseAssignExp());
      }
    }
  }
  return exp
};

pp$2.parseExp = function() {
  return this.parseAssignExp();
};

var pp$1 = Parser.prototype;

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
pp$1.semicolon = function () {
  this.eat(types.semi.label);
};

pp$1.parseTopLevel = function () {
  var node = new Program();
  while (this.lexer.LookAhead() !== types.eof.label) {
    var stmt = this.parseStatement();
    node.body.push(stmt);
  }
  return node
};

pp$1.parseStatement = function () {
  debugger
  switch (this.LookAhead()) {
    case types.semi.label:
      return this.parseEmptyStatement()
    case types.braceL.label:
      return this.parseBlock()
    case types._while.label:
      return this.parseWhileStatement()
    case types._let.label:
      return this.parseVarStatement()
    case types._switch.label:
      return this.parseSwitchStat()
    case types._if.label:
      return this.parseIfStat()
    case types._for.label:
      return this.parseForStatement()
    case types._function.label:
      return this.parseFunctionStatement()
    case types._return.label:
      return this.parseReturnStatement()
    default:
      return this.parseExpressionStatement()
  }
};

pp$1.parseExpressionStatement = function () {
  var node = new ExpressionStatement({}, this.parseExp());
  this.semicolon();
  return node
};

pp$1.parseEmptyStatement = function () {
  this.expect(types.semi.label);
  return new EmptyStat()
};

pp$1.parseWhileStatement = function () {
  this.eat(types._while.label);
  var test = this.parseExp();
  var block = this.parseBlock();
  return new WhileStat({}, test, block)
};

pp$1.parseVarStatement = function () {
  var kind = this.nextToken().value;
  var varList = this.parseVar();
  this.semicolon();
  return new VariableDeclaration({}, kind, varList)
};

pp$1.parseVar = function () {
  var list = [];
  for (;;) {
    var decl = new VariableDeclarator();
    decl.id = this.parseVarId();
    if (this.eat(types.op_assign.label)) {
      decl.init = this.parseExp();
    } else {
      decl.init = null;
    }
    list.push(decl);
    if (!this.eat(types.comma.label)) { break }
  }
  return list
};

pp$1.parseVarId = function () {
  if (this.LookAhead() === types.name.label) {
    return new Identifier({}, this.nextToken().value)
  } else {
    this.raise('invalid Identifier');
  }
};

pp$1.parseSwitchStat = function () {
  this.expect(types._switch.label);
  this.expect(types.parenL.label);

  var discriminant = this.parseExp();

  this.expect(types.parenR.label);
  this.expect(types.braceL.label);

  var cases = [];
  var cur = null;

  for (; this.LookAhead() !== types.braceR.label; ) {
    var type = this.LookAhead();
    var isCase = type === types._case.label;
    var isDefualt = type === types._default.label;
    if (isCase || isDefualt) {
      var test = null;
      this.nextToken();
      if (isCase) {
        test = this.parseExp();
      }
      this.expect(types.colon.label);
      cur = new SwitchCase({}, test, []);
      cases.push(cur);
    } else {
      cur.consequent.push(this.parseStatement());
    }
  }
  this.expect(types.braceR.label);
  return new SwitchStatement({}, discriminant, cases)
};

// if a > a
pp$1.parseIfStat = function () {
  this.expect(types._if.label);
  this.expect(types.parenL.label);
  var test = this.parseExp();
  this.expect(types.parenR.label);

  var alternate = null;
  var consequent = null;

  if (!(consequent = this.parseStatement())) {
    this.raise('Unexpected end of input');
  }

  if (this.LookAhead() === types._else.label) {
    this.nextToken();
    if (this.LookAhead() === types._if.label) {
      alternate = this.parseIfStat();
    } else {
      alternate = this.parseStatement();
    }
    if (!alternate) {
      this.raise('Unexpected end of input');
    }
  }

  return new IfStatement({}, test, consequent, alternate)
};

pp$1.parseForStatement = function () {
  this.expect(types._for.label);
  this.expect(types.parenL.label);

  var init = null;

  if (this.LookAhead() === types._let.label) {
    init = this.parseVarStatement();
  } else if (this.LookAhead() === types.semi.label) {
    init = null;
  } else {
    init = this.parseExp();
  }

  this.expect(types.semi.label);

  var test = this.LookAhead() === types.semi.label ? null : this.parseExp();

  this.expect(types.semi.label);

  var update = this.LookAhead() === types.parenR.label ? null : this.parseExp();

  this.expect(types.parenR.label);

  var body = this.parseBlock();

  return new ForStatment({}, init, test, update, body)
};

pp$1.parseFunctionStatement = function () {
  var this$1$1 = this;

  this.expect(types._function.label);
  var node = new FunctionDeclaration({}, null, [], null);

  node.id = this.parseIdentifier();
  if (node.id === null) {
    this.raise('unexpected identifier');
  }
  this.expect(types.parenL.label);

  if (this.LookAhead() === types.parenR.label) {
    node.params = [];
  } else {
    var getId = function () {
      var id = this$1$1.parseIdentifier();
      if (id === null) {
        this$1$1.raise('unexpected identifier');
      } else {
        node.params.push(id);
      }
    };
    getId();
    while (this.LookAhead() === types.comma.label) {
      this.nextToken();
      getId();
    }
  }

  this.expect(types.parenR.label);

  node.body = this.parseBlock();

  return node
};

pp$1.parseReturnStatement = function () {
  var node = new ReturnStatement({}, null);
  this.expect(types._return.label);
  if (!this.eat(types.semi.label)) {
    node.argument = this.parseExp();
  }
  this.semicolon();
  return node
};

var pp = Parser.prototype;

pp.parseBlock = function () {
  this.eat(types.braceL.label);
  var stats = [];
  while (
    this.LookAhead() !== types.eof.label &&
    this.LookAhead() !== types.braceR.label
  ) {
    var stmt = this.parseStatement();
    stats.push(stmt);
  }
  this.eat(types.braceR.label);

  return new BlockStat({}, stats)
};

var Token = function Token(type, value) {
  this.type = type || '';
  this.value = value || '';
  this.loc = null;
};

var Lexer = function Lexer(input) {
  this.current = 0;
  this.input = input;
};

/**
 * @desc 是否为关键字
 * @param {*} str
 * @returns
 */
Lexer.prototype.isKeyword = function isKeyword (str) {
  return Object.keys(keywords).includes(str)
};

/**
 * @desc 获取 token 列表
 * @returns
 */
Lexer.prototype.tokenize = function tokenize () {
  var token,
    tokens = [];
  while ((token = this.read())) {
    tokens.push(token);
    if (token.type === types.eof.label) { break }
  }
  return tokens
};

/**
 * @desc 过滤无效字符
 */
Lexer.prototype.skipSpaceAndComment = function skipSpaceAndComment () {
  while (!this.isEof()) {
    var ch = this.input[this.current];
    var newline = /[\n\r]/;
    if (ch === '/') {
      if (this.input[this.current + 1] === '/') {
        this.current += 2;
        while (!this.isEof() && !newline.test(this.input[this.current])) {
          this.current++;
        }
      } else if (this.input[this.current + 1] === '*') {
        var i = this.input.indexOf('*/', this.current + 2);
        if (i < 0) {
          this.raise(this.current - 2, 'Unterminated comment');
        }
        this.current = i + 2;
      } else {
        break
      }
    } else if (
      ch === '\n' ||
      ch === '\t' ||
      ch === ' ' ||
      ch === '\r' ||
      ch === '\f'
    ) {
      this.current++;
    } else {
      break
    }
  }
};

/**
 * @desc 读取一个字符，并且指针往下移
 * @returns
 */
Lexer.prototype.getChar = function getChar () {
  if (this.current === this.input.length) {
    return null
  }

  var start = this.current;
  this.current++;
  return this.input[start]
};

/**
 * @desc 指针回退
 */
Lexer.prototype.unGetChar = function unGetChar () {
  this.current -= 1;
};

/**
 * @desc 读取 1 个 token
 * @returns
 */
Lexer.prototype.read = function read () {
  this.skipSpaceAndComment();
  var mchar = this.getChar();

  if (mchar == null) {
    return this.genToken(types.eof)
  }

  switch (mchar) {
    case '(': {
      return this.genToken(types.parenL, mchar, this.current - 1)
    }
    case ')': {
      return this.genToken(types.parenR, mchar, this.current - 1)
    }
    case '{': {
      return this.genToken(types.braceL, mchar, this.current - 1)
    }
    case '}': {
      return this.genToken(types.braceR, mchar, this.current - 1)
    }
    case ';': {
      return this.genToken(types.semi, mchar, this.current - 1)
    }
    case ':': {
      return this.genToken(types.colon, mchar, this.current - 1)
    }
    case '?': {
      return this.genToken(types.question, mchar, this.current - 1)
    }
    case ',': {
      return this.genToken(types.comma, mchar, this.current - 1)
    }

    // == 或 =
    case '=': {
      if (this.getChar() === '=') {
        return this.genToken(types.op_eq, '==', this.current - 2)
      } else {
        this.unGetChar();
        return this.genToken(types.op_assign, '=', this.current - 1)
      }
    }

    // != 或 !
    case '!': {
      if (this.getChar() === '=') {
        return this.genToken(types.op_ne, '!=', this.current - 2)
      } else {
        this.unGetChar();
        return this.genToken(types.op_not, '!', this.current - 1)
      }
    }

    // || 或 &&
    case '&':
    case '|': {
      if (this.getChar() === mchar) {
        var type = mchar === '&&' ? types.op_and : types.op_or;
        return this.genToken(type, mchar + mchar, this.current - 2)
      } else {
        throw new Error(
          'invalid character:' + mchar + ' in ' + this.current - 2
        )
      }
    }

    // ++ += +
    // -- -= -
    case '-':
    case '+': {
      var start = this.current - 1;
      var next = this.getChar();
      if (next === mchar) {
        var t = mchar === '+' ? types.op_inc : types.op_dec;
        return this.genToken(t, mchar + mchar, start)
      } else if (next === '=') {
        return this.genToken(types.op_assign, mchar + '=', start)
      } else {
        if (mchar !== null) { this.unGetChar(); }
        var t$1 = mchar === '+' ? types.op_add : types.op_minus;
        return this.genToken(t$1, mchar, start)
      }
    }

    // /= /
    // *= *
    case '/':
    case '*': {
      var start$1 = this.current - 1;
      var next$1 = this.getChar();
      if (next$1 === '=') {
        return this.genToken(types.op_assign, mchar + '=', start$1)
      } else {
        if (mchar !== null) { this.unGetChar(); }
        var t$2 = mchar === '*' ? types.op_mul : types.op_div;
        return this.genToken(t$2, mchar, start$1)
      }
    }

    default:
      // 数字
      if (regUtil.numbers.test(mchar)) {
        var value = '';
        var start$2 = this.current - 1;
        while (mchar !== null && regUtil.numbers.test(mchar)) {
          value += mchar;
          mchar = this.getChar();
        }
        if (mchar !== null) {
          this.unGetChar();
        }
        return this.genToken(types.number, value, start$2)
      }

      // 字符串
      if (mchar === '"' || mchar === "'") {
        var value$1 = '';
        var type$1 = mchar;
        var start$3 = this.current - 1;
        var ch = this.getChar();

        while (ch !== null && ch !== type$1) {
          value$1 += ch;
          ch = this.getChar();
        }

        if (ch !== mchar) {
          throw new TypeError('unclosed double quote in ' + start$3)
        }

        return this.genToken(types.string, value$1, start$3)
      }

      // 关键字 | 变量名
      if (regUtil.letters.test(mchar) || mchar === '_') {
        var value$2 = '';
        var start$4 = this.current - 1;
        while (mchar !== null && regUtil.identifier.test(mchar)) {
          value$2 += mchar;
          mchar = this.getChar();
        }
        if (mchar !== null) {
          this.unGetChar();
        }

        if (this.isKeyword(value$2)) {
          return this.genToken(keywords[value$2], value$2, start$4)
        }

        return this.genToken(types.name, value$2, start$4)
      }

      throw new TypeError('unknown character: ' + mchar)
  }
};

/**
 * @desc 前瞻一个 token
 * @returns
 */
Lexer.prototype.LookAhead = function LookAhead (index) {
    if ( index === void 0 ) index = 1;

  var token = this.genToken(types.eof);
  var first = null;
  for(var i = 0; i < index;) {
    token = this.read();
    if (!first) {
      first = token;
    }
    if (token.type === types.eof) {
      break;
    } else {
      i++;
    }
  }
  if (first && first.loc) {
    this.current = first.loc.start;
  }
  return token.type
};

/**
 * @desc 创建一个 token
 * @param {*} type
 * @param {*} value
 * @param {*} start
 * @returns
 */
Lexer.prototype.genToken = function genToken (type, value, start) {
  var token = new Token(type.keyword || type.label, value);
  if (start !== undefined) {
    token.loc = {
      start: start,
      end: token.value.length + start,
    };
  }
  return token
};

Lexer.prototype.raise = function raise (pos, message) {
  throw new SyntaxError(message + " in " + pos)
};

/**
 * @desc 是否读完
 * @returns
 */
Lexer.prototype.isEof = function isEof () {
  return this.current === this.input.length
};

var envId = 0;
var Env = function Env(prev) {
  this.prev = prev || null;
  this.store = {};
  this.id = envId++;
};

/**
 * @desc 查询 key 值, key 需要先声明，否则抛出异常
 * @param {string} key 
 * @returns 
 */
Env.prototype.get = function get (key) {
  var env = this.findEnv(key);
  if (env) {
    return env.store[key];
  } else {
    throw new SyntaxError("undefined " + key);
  }
};

/**
 * 查询作用域
 * @param {string}} key 
 * @returns 
 */
Env.prototype.findEnv = function findEnv (key) {
  var env = this;
  while(env) {
    var keys = Object.keys(env.store);
    if (keys.includes(key)) {
      return env;
    } else {
      env = env.prev;
    }
  }
  return null;
};

/**
 * @desc 更新 key 值, key 需要先声明，否则抛出异常
 * @param {string} key 
 * @returns 
 */
Env.prototype.update = function update (key, value) {
  var env = this.findEnv(key);
  if (env) {
    env.store[key] = value;
  } else {
    throw new SyntaxError((key + " is not defined"));
  }
};

/**
 * 在当前环境中，添加 key，需要检查是否重复声明
 * @param {string} key 
 * @param {*} value 
 */
Env.prototype.add = function add (key, value) {
  if (Object.keys(this.store).includes(key)) {
    throw new SyntaxError((key + " has been declared"));
  } else {
    this.store[key] = value;
  }
};

function ProgramEval(env, node) {
  node.body.forEach(function (it) {
    StatementEval(env, it);
  });
}

function StatementEval(env, node) {
  switch(node.type) {
    case 'VariableDeclaration':
      return VariableDeclarationEval(env, node);
    case 'BlockStat':
      return BlockStatementEval(env, node);
    case 'FunctionDeclaration':
      return FunctionDeclarationVal(env, node);
    default:
      return ExpressionStatementEval(env, node);
  }
}

function ExpressionStatementEval(env, node) {
  switch(node.type) {
    case 'FalseExp':
      return false;
    case 'TrueExp':
      return true;
    case 'NullExp':
      return null;
    case 'Numeral':
      return Number(node.value);
    case 'StringLiteral':
      return node.value;
    case 'Identifier':
      return IdentifierEval(env, node);
    case 'UpdateExp':
      return UpdateExpEval(env, node);
    case 'UnaryExp':
      return UnaryExpEval(env, node);
    case "ExpressionStatement":
      return ExpressionStatementEval(env, node.expression)
    case "BinaryExp":
      return BinaryExpEval(env, node);
    
    case "AssignmentExp":
      return AssignmentExpEval(env, node);

    case 'BlockStatement':
      return BlockStatementEval(env, node);

    case 'CallExpression':
      return CallExpressionEval();
  }
}

function IdentifierEval(env, node) {
  return env.get(node.name);
}

function UpdateExpEval (env, node) {
  if (node.op == "++") {
    var oVal = IdentifierEval(env, node.argument);
    var nVal = oVal + 1;
    env.update(node.argument.name, nVal);
    return node.prefix ? nVal : oVal;
  } else {
    var oVal$1 = IdentifierEval(env, node.argument);
    var nVal$1 = oVal$1 - 1;
    env.update(node.argument.name, nVal$1);
    return node.prefix ? nVal$1 : oVal$1;
  }
}

function UnaryExpEval (env, node) {
  switch(node.op) {
    case "-":
      return -(ExpressionStatementEval(env, node.argument));
    case "!":
      return !(ExpressionStatementEval(env, node.argument));
  }
}

function VariableDeclarationEval (env, node) {
  node.declarations.forEach(function (it) {
    env.add(it.id.name, ExpressionStatementEval(env, it.init));
  });
}

function BinaryExpEval (env, node) {
  switch(node.op) {
    case "+":
      return ExpressionStatementEval(env, node.left) + ExpressionStatementEval(env, node.right)
    case "-":
      return ExpressionStatementEval(env, node.left) - ExpressionStatementEval(env, node.right)
    case "*":
      return ExpressionStatementEval(env, node.left) * ExpressionStatementEval(env, node.right)
    case "/":
      return ExpressionStatementEval(env, node.left) / ExpressionStatementEval(env, node.right)
    case "%":
      return ExpressionStatementEval(env, node.left) % ExpressionStatementEval(env, node.right)
  }
}

function BlockStatementEval(env, node) {
  var _env = new Env(env);
  node.body.forEach(function (it) {
    StatementEval(_env, it);
  });
}

function AssignmentExpEval(env, node) {
  return env.update(node.left.name, StatementEval(env, node.right))
}

function FunctionDeclarationVal(env, node) {
  env.add(node.id.name, node);
}

function CallExpressionEval(env, node) {
  
}

// global env
var env = new Env(null);

// entry
function interpreter(program) {
  ProgramEval(env, program);
  console.log(env.store);
}

export { Lexer, Parser, interpreter };
