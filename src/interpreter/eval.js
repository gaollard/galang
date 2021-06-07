import { Env } from './env';

export function ProgramEval(env, node) {
  node.body.forEach(it => {
    StatementEval(env, it);
  });
}

export function StatementEval(env, node) {
  switch(node.type) {
    case 'VariableDeclaration':
      return VariableDeclarationEval(env, node);
    case 'BlockStat':
      return BlockStatementEval(env, node);
    default:
      return ExpressionStatementEval(env, node);
  }
}

export function ExpressionStatementEval(env, node) {
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
  }
}

export function IdentifierEval(env, node) {
  return env.get(node.name);
}

export function UpdateExpEval (env, node) {
  if (node.op == "++") {
    let oVal = IdentifierEval(env, node.argument)
    let nVal = oVal + 1;
    env.update(node.argument.name, nVal);
    return node.prefix ? nVal : oVal;
  } else {
    let oVal = IdentifierEval(env, node.argument)
    let nVal = oVal - 1;
    env.update(node.argument.name, nVal);
    return node.prefix ? nVal : oVal;
  }
}

export function UnaryExpEval (env, node) {
  switch(node.op) {
    case "-":
      return -(ExpressionStatementEval(env, node.argument));
    case "!":
      return !(ExpressionStatementEval(env, node.argument));
  }
}

export function VariableDeclarationEval (env, node) {
  node.declarations.forEach(it => {
    env.add(it.id.name, ExpressionStatementEval(env, it.init))
  })
}

export function BinaryExpEval (env, node) {
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

export function BlockStatementEval(env, node) {
  const _env = new Env(env);
  node.body.forEach(it => {
    StatementEval(_env, it);
  })
}

export function AssignmentExpEval(env, node) {
  return env.update(node.left.name, StatementEval(env, node.right))
}
