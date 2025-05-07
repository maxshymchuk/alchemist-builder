import { BaseElement } from './BaseElement';

class GenericElement extends BaseElement {
  public readonly parents: [BaseElement, BaseElement];

  constructor(name: string, parents: [BaseElement, BaseElement]) {
    super(name);
    this.parents = parents;
    this.parents.forEach((parent) => parent.connect(this));
  }
}

export { GenericElement };
