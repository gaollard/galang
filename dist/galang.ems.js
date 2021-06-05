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

var regUtil = {
  whitespcae: /\s/,            // 空格
  numbers: /[0-9]/,            // 数字
  letters: /[a-z]/i,           // 字母
  identifier: /[_\da-zA-Z]/i   // 标志符
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
  var token, tokens = [];
  while (token = this.read()) {
    tokens.push(token);
    if (token.type === types.eof.label) { break; }
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
        break;
      }
    } else if (ch === '\n' || ch === '\t' || ch === " " || ch === "\r" || ch === "\f") {
      this.current++;
    } else {
      break;
    }
  }
};

/**
 * @desc 读取一个字符，并且指针往下移
 * @returns 
 */
Lexer.prototype.getChar = function getChar () {
  if (this.current === this.input.length) {
    return null;
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
    return this.genToken(types.eof);
  }

  switch (mchar) {
    case '(': {
      return this.genToken(types.parenL, mchar, this.current - 1)
    }
    case ')': {
      return this.genToken(types.parenR, mchar, this.current - 1)
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

    // == 或 =
    case '=': {
      if (this.getChar() === '=') {
        return this.genToken(types.op_eq, '==', this.current - 2)
      } else {
        this.unGetChar();
        return this.genToken(types.op_assign, "=", this.current - 1)
      }
    }

    // != 或 !
    case '!': {
      if (this.getChar() === '=') {
        return this.genToken(types.op_ne, '!=', this.current - 2)
      } else {
        this.unGetChar();
        return this.genToken(types.op_not, "!", this.current - 1)
      }
    }

    // || 或 &&
    case '&':
    case '|': {
      if (this.getChar() === mchar) {
        var type = mchar === '&&' ? types.op_and : types.op_or;
        return this.genToken(type, mchar + mchar, this.current - 2);
      } else {
        throw new Error('invalid character:' + mchar + ' in ' + this.current - 2)
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
        return this.genToken(t$1, mchar, start);
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
        return this.genToken(t$2, mchar, start$1);
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
          return this.genToken(keywords[value$2], value$2, start$4);
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
Lexer.prototype.lookAhead = function lookAhead () {
  var token = this.read();
  if (token) {
    this.current = token.loc.start;
  }
  return token;
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
  throw new SyntaxError(message + " in " + pos);
};

/**
 * @desc 是否读完
 * @returns 
 */
Lexer.prototype.isEof = function isEof () {
  return this.current === this.input.length
};

export { Lexer };
