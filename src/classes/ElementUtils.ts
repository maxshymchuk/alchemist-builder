import { BaseElement } from './BaseElement';
import { GenericElement } from './GenericElement';

class ElementUtils {
  static isBase(element: BaseElement) {
    return !(element instanceof GenericElement);
  }

  static isFinal(element: BaseElement) {
    return element.connections.length === 0;
  }

  static isUsed(element: BaseElement) {
    return element.connections.length > 0;
  }

  static isMissed(element: BaseElement) {
    return (
      !(element instanceof GenericElement) && element.connections.length === 0
    );
  }
}

export { ElementUtils };
