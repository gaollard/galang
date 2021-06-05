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
  constructor(params, value) {
    super(params);
    this.type = 'Identifier';
    this.value = value;
  }
}

export class UpdateExp extends Node {
  constructor(params, op, id) {
    super(params);
    this.type = 'UpdateExp';
    this.op = op;
    this.id = id;
  }
}

export class UnaryExp extends Node {
  constructor(params, op, exp) {
    super(params);
    this.type = 'UnaryExp';
    this.op = op;
    this.exp = exp;
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
