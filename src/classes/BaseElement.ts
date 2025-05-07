import { hash, prep } from '../utils';

class BaseElement {
  public readonly id: string;
  public readonly name: string;
  public readonly connections: Array<BaseElement> = [];

  constructor(name: string) {
    const _name = prep(name);
    this.name = _name;
    this.id = hash(_name);
  }

  connect(...elems: Array<BaseElement>) {
    this.connections.push(...elems);
  }

  toString() {
    return this.name;
  }
}

export { BaseElement };
