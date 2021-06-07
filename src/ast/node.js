export class Node {
  constructor() {
    // this.start = null;
    // this.end = null;
    // this.loc = null;
  }
}

export class Program extends Node {
  constructor(params) {
    super(params);
    this.type = 'Program';
    this.body = [];
  }
};

export class ExpressionStatement extends Node {
  constructor(params, expression) {
    super(params);
    this.type = 'ExpressionStatement';
    this.expression = expression;
  }
};

export class FalseExp extends Node {
  constructor(params) {
    super(params);
    this.type = 'FalseExp';
  }
}

export class TrueExp extends Node {
  constructor(params) {
    super(params);
    this.type = 'TrueExp';
  }
}

export class NullExp extends Node {
  constructor(params) {
    super(params);
    this.type = 'NullExp';
  }
}

export class Numeral extends Node {
  constructor(params, value) {
    super(params);
    this.type = 'Numeral';
    this.value = value;
  }
}

export class StringLiteral extends Node {
  constructor(params, value) {
    super(params);
    this.type = 'StringLiteral';
    this.value = value;
  }
}

export class Identifier extends Node {
  constructor(params, name) {
    super(params);
    this.type = 'Identifier';
    this.name = name;
  }
}

export class UpdateExp extends Node {
  constructor(params, op, argument, prefix) {
    super(params);
    this.type = 'UpdateExp';
    this.op = op;
    this.argument = argument;
    this.prefix = prefix || false;
  }
}

export class UnaryExp extends Node {
  constructor(params, op, argument) {
    super(params);
    this.type = 'UnaryExp';
    this.op = op;
    this.argument = argument;
  }
}

export class BinaryExp extends Node {
  constructor(params, op, lExp, rExp) {
    super(params);
    this.type = 'BinaryExp';
    this.op = op;
    this.left = lExp;
    this.right = rExp;
  }
}

export class ConditionExp extends Node {
  constructor(params, test, consequent, alternate) {
    super(params);
    this.type = 'ConditionExp';
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
  }
}

export class AssignmentExp extends Node {
  constructor(params, left, right) {
    super(params);
    this.type = 'AssignmentExp';
    this.left = left;
    this.right = right;
  }
}

export class EmptyStat extends Node {
  constructor(params) {
    super(params);
  }
}

export class WhileStat extends Node {
  constructor(params, test, body) {
    super(params);
    this.type = 'WhileStat';
    this.test = test;
    this.body = body;
  }
}

export class BlockStat extends Node {
  constructor(params, body) {
    super(params);
    this.type = 'BlockStat';
    this.body = body;
  }
}

export class VariableDeclaration extends Node {
  constructor(params, kind, declarations) {
    super(params);
    this.type = 'VariableDeclaration';
    this.kind = kind;
    this.declarations = declarations;
  }
}

export class VariableDeclarator extends Node {
  constructor(params, id, init) {
    super(params);
    this.type = 'VariableDeclarator';
    this.id = id;
    this.init = init;
  }
}

export class SwitchStatement extends Node {
  constructor(params, discriminant, cases) {
    super(params);
    this.type = 'SwitchStatement';
    this.discriminant = discriminant;
    this.cases = cases;
  }
}

export class SwitchCase extends Node {
  constructor(params, test, consequent) {
    super(params);
    this.type = 'SwitchCase';
    this.test = test;
    this.consequent = consequent;
  }
}

export class BreakStatement extends Node {
  constructor(params, label) {
    super(params);
    this.type = 'BreakStatement';
    this.label = label || null;
  }
}

export class DefaultStatement extends Node {
  constructor(params) {
    super(params);
    this.type = 'DefaultStatement';
  }
}

export class IfStatement extends Node {
  constructor(params, test, consequent, alternate) {
    super(params);
    this.type = 'IfStatement';
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
  }
}

export class ForStatment extends Node {
  constructor(params, init, test, update, body) {
    super(params);
    this.type = 'ForStatment';
    this.init = init;
    this.test = test;
    this.update = update;
    this.body = body;
  }
}

export class FunctionDeclaration extends Node {
  constructor(option, id, params, body) {
    super(option);
    this.type = 'FunctionDeclaration';
    this.id = id;
    this.params = params;
    this.body = body;
  }
}

export class ReturnStatement extends Node {
  constructor(option, argument) {
    super(option);
    this.type = 'ReturnStatement';
    this.argument = argument;
  }
}
