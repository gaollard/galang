export class TokenType {
  constructor(label, opt = {}) {
    this.label = label;
    this.keyword = opt.keyword;
  }
}

// keywords
export const keywords = {};

// make keyword token
function kw(name, options = {}) {
  options.keyword = name
  return keywords[name] = new TokenType(name, options)
}

// all token include keywords and other symbol
export const types = {
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
  op_assign:  new TokenType("assign"), // =, +=, -=, *=, /=, %=
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

export const regUtil = {
  whitespcae: /\s/,            // 空格
  numbers: /[0-9]/,            // 数字
  letters: /[a-z]/i,           // 字母
  identifier: /[_\da-zA-Z]/i   // 标志符
}
