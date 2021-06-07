export class Env {
  constructor(prev) {
    this.prev = prev || null;
    this.store = {}
  }

  /**
   * @desc 查询 key 值, key 需要先声明，否则抛出异常
   * @param {string} key 
   * @returns 
   */
  get(key) {
    let env = this.findEnv(key);
    if (env) {
      return env.store[key];
    } else {
      throw new SyntaxError("undefined " + key);
    }
  }

  /**
   * 查询作用域
   * @param {string}} key 
   * @returns 
   */
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
    return null;
  }

  /**
   * @desc 更新 key 值, key 需要先声明，否则抛出异常
   * @param {string} key 
   * @returns 
   */
  update(key, value) {
    let env = this.findEnv(key);
    if (env) {
      env.store[key] = value;
    } else {
      throw new SyntaxError(`${key} is not defined`);
    }
  }

  /**
   * 在当前环境中，添加 key
   * @param {string} key 
   * @param {*} value 
   */
  add(key, value) {
    this.store[key] = value;
  }
}
