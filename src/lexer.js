import { regUtil, types, keywords } from './token';

export class Token {
  constructor(type, value) {
    this.type = type || '';
    this.value = value || '';
    this.loc = null;
  }
}

export class Lexer {
  constructor(input) {
    this.current = 0;
    this.input = input;
  }

  /**
   * @desc 是否为关键字
   * @param {*} str 
   * @returns 
   */
  isKeyword(str) {
    return Object.keys(keywords).includes(str)
  }

  /**
   * @desc 获取 token 列表
   * @returns 
   */
  tokenize() {
    let token, tokens = [];
    while (token = this.read()) {
      tokens.push(token);
      if (token.type === types.eof.label) break;
    }
    return tokens
  }

  /**
   * @desc 过滤无效字符
   */
  skipSpaceAndComment() {
    while (!this.isEof()) {
      const ch = this.input[this.current];
      const newline = /[\n\r]/;
      if (ch === '/') {
        if (this.input[this.current + 1] === '/') {
          this.current += 2;
          while (!this.isEof() && !newline.test(this.input[this.current])) {
            this.current++;
          }
        } else if (this.input[this.current + 1] === '*') {
          const i = this.input.indexOf('*/', this.current + 2);
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
  }

  /**
   * @desc 读取一个字符，并且指针往下移
   * @returns 
   */
  getChar() {
    if (this.current === this.input.length) {
      return null;
    }

    let start = this.current
    this.current++
    return this.input[start]
  }

  /**
   * @desc 指针回退
   */
  unGetChar() {
    this.current -= 1;
  }

  /**
   * @desc 读取 1 个 token
   * @returns 
   */
  read() {
    this.skipSpaceAndComment();
    let mchar = this.getChar();

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
          const type = mchar === '&&' ? types.op_and : types.op_or;
          return this.genToken(type, mchar + mchar, this.current - 2);
        } else {
          throw new Error('invalid character:' + mchar + ' in ' + this.current - 2)
        }
      }

      // ++ += +
      // -- -= -
      case '-':
      case '+': {
        let start = this.current - 1;
        let next = this.getChar();
        if (next === mchar) {
          const t = mchar === '+' ? types.op_inc : types.op_dec;
          return this.genToken(t, mchar + mchar, start)
        } else if (next === '=') {
          return this.genToken(types.op_assign, mchar + '=', start)
        } else {
          if (mchar !== null) this.unGetChar();
          const t = mchar === '+' ? types.op_add : types.op_minus;
          return this.genToken(t, mchar, start);
        }
      }

      // /= /
      // *= *
      case '/':
      case '*': {
        let start = this.current - 1;
        let next = this.getChar();
        if (next === '=') {
          return this.genToken(types.op_assign, mchar + '=', start)
        } else {
          if (mchar !== null) this.unGetChar();
          const t = mchar === '*' ? types.op_mul : types.op_div;
          return this.genToken(t, mchar, start);
        }
      }

      default:
        // 数字
        if (regUtil.numbers.test(mchar)) {
          let value = '';
          let start = this.current - 1;
          while (mchar !== null && regUtil.numbers.test(mchar)) {
            value += mchar;
            mchar = this.getChar();
          }
          if (mchar !== null) {
            this.unGetChar();
          }
          return this.genToken(types.number, value, start)
        }

        // 字符串
        if (mchar === '"' || mchar === "'") {
          let value = '';
          let type = mchar;
          let start = this.current - 1;
          let ch = this.getChar();

          while (ch !== null && ch !== type) {
            value += ch
            ch = this.getChar()
          }

          if (ch !== mchar) {
            throw new TypeError('unclosed double quote in ' + start)
          }

          return this.genToken(types.string, value, start)
        }

        // 关键字 | 变量名
        if (regUtil.letters.test(mchar) || mchar === '_') {
          let value = '';
          let start = this.current - 1;
          while (mchar !== null && regUtil.identifier.test(mchar)) {
            value += mchar;
            mchar = this.getChar();
          }
          if (mchar !== null) {
            this.unGetChar();
          }

          if (this.isKeyword(value)) {
            return this.genToken(keywords[value], value, start);
          }

          return this.genToken(types.name, value, start)
        }

        throw new TypeError('unknown character: ' + mchar)
    }
  }

  /**
   * @desc 前瞻一个 token
   * @returns 
   */
  lookAhead() {
    const token = this.read()
    if (token) {
      this.current = token.loc.start
    }
    return token;
  }

  /**
   * @desc 创建一个 token
   * @param {*} type 
   * @param {*} value 
   * @param {*} start 
   * @returns 
   */
  genToken(type, value, start) {
    const token = new Token(type.keyword || type.label, value)
    if (start !== undefined) {
      token.loc = {
        start,
        end: token.value.length + start,
      }
    }
    return token
  }

  raise(pos, message) {
    throw new SyntaxError(message + ` in ${pos}`);
  }

  /**
   * @desc 是否读完
   * @returns 
   */
  isEof() {
    return this.current === this.input.length
  }
}