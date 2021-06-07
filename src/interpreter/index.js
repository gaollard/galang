import { ProgramEval } from './eval';

// global env
export const gEnv = {
  prev: null,
  store: {},

  get(key) {
    let env = this.findEnv(key);
    return env.store[key];
  },

  findEnv (key) {
    let env = this;
    while(env) {
      let keys = Object.keys(env.store);
      if (keys.includes(key)) {
        return env;
      } else {
        env = env.prev;
      }
    }
    return this;
  },

  put(key, value) {
    let env = this.findEnv(key);
    env.store[key] = value;
  },

  add(key, value) {
    this.store[key] = value;
  }
};

// entry
export function interpreter(program) {
  ProgramEval(gEnv, program);
  console.log(gEnv.store);
}
