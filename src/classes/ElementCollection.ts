import { hash, prep } from '../utils';
import { BaseElement } from './BaseElement';
import { ElementUtils } from './ElementUtils';
import { GenericElement } from './GenericElement';

const INITIAL = [
  new BaseElement('water'),
  new BaseElement('fire'),
  new BaseElement('air'),
  new BaseElement('earth'),
];

class ElementCollection {
  private _elements: Record<string, BaseElement> = {};
  private _names: Set<string> = new Set();

  constructor(elements: Array<BaseElement> = INITIAL) {
    elements.forEach((element) => (this._elements[element.id] = element));
    this._names = new Set(elements.map((elem) => elem.name));
  }

  get base() {
    return Object.values(this._elements).filter(ElementUtils.isBase);
  }

  get used() {
    return Object.values(this._elements).filter(ElementUtils.isUsed);
  }

  get missed() {
    return Object.values(this._elements).filter(ElementUtils.isMissed);
  }

  get final() {
    return Object.values(this._elements).filter(ElementUtils.isFinal);
  }

  get elements() {
    return Object.values(this._elements);
  }

  public has(name: string) {
    const _name = prep(name);
    return this._names.has(_name);
  }

  public add(name: string): BaseElement;
  public add(name: string, parents: [BaseElement, BaseElement]): GenericElement;
  public add(name: string, parents?: [BaseElement, BaseElement]) {
    const _name = prep(name);
    const _id = hash(_name);
    if (!this._names.has(_name)) {
      this._elements[_id] = parents
        ? new GenericElement(_name, parents)
        : new BaseElement(_name);
      this._names.add(_name);
    }
    return this._elements[_id];
  }
}

export { ElementCollection };
