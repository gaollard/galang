import { Env } from './env';
import { ProgramEval } from './eval';

// global env
const env = new Env(null);

// entry
export function interpreter(program) {
  ProgramEval(env, program);
  console.log(env.store);
}
