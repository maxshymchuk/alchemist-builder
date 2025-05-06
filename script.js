const ERRORS = {
  NotEmpty: 'Cannot be empty',
  NotEqual: 'Cannot be equal',
  AlreadyExists: 'Already exists',
};

String.prototype.hash = function () {
  let hash = 0;
  let chr;
  if (this.length === 0) return hash;
  for (let i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

function prep(str) {
  try {
    return str.trim().toLowerCase();
  } catch {
    return '';
  }
}

class BaseElement {
  _name;
  _connections = [];

  constructor(name) {
    this._name = prep(name);
  }

  get id() {
    return this._name.hash();
  }

  get name() {
    return this._name;
  }

  get connections() {
    return this._connections;
  }

  connect(...elems) {
    this._connections.push(...elems);
  }

  toString() {
    return this.name;
  }
}

class GenericElement extends BaseElement {
  _parents;

  constructor(name, parents) {
    super(name);
    this._parents = parents;
    this._parents.forEach((parent) => parent.connect(this));
  }

  get parents() {
    return this._parents;
  }
}

class ElementUtils {
  static isBase(elem) {
    return !(elem instanceof GenericElement);
  }

  static isFinal(elem) {
    return elem.connections.length === 0;
  }

  static isUsed(elem) {
    return elem.connections.length > 0;
  }

  static isMissed(elem) {
    return !(elem instanceof GenericElement) && elem.connections.length === 0;
  }
}

class ElementCollection {
  _elements = {};
  _names = new Set();

  constructor(elements) {
    elements.forEach((elem) => (this._elements[elem.id] = elem));
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

  has(name) {
    const _name = prep(name);
    return this._names.has(_name);
  }

  add(name, parents) {
    const _name = prep(name);
    const _id = _name.hash();
    if (!this._names.has(_name)) {
      this._elements[_id] = parents
        ? new GenericElement(_name, parents)
        : new BaseElement(_name);
      this._names.add(_name);
    }
    return this._elements[_id];
  }
}

const arr = [];
const alpha = 'abcdefghijklmnopqrstuvwxyz0123456789';
for (let i = 0; i < 50; i++) {
  let name = '';
  for (let j = 0; j < 10; j++) {
    name += alpha[Math.trunc(Math.random() * alpha.length)];
  }
  arr.push(new BaseElement(name));
}

const list = new ElementCollection([
  new BaseElement('water'),
  new BaseElement('fire'),
  new BaseElement('air'),
  new BaseElement('earth'),
  //   ...arr,
]);

const listsDom = document.getElementById('lists');
const listAllDom = document.getElementById('list-all');
const listUsedDom = document.getElementById('list-used');
const listBaseDom = document.getElementById('list-base');
const listMissedDom = document.getElementById('list-missed');
const listFinalDom = document.getElementById('list-final');

const inputElem1 = document.getElementById('elem1');
const inputElem2 = document.getElementById('elem2');
const inputResult = document.getElementById('res');
const buttonAdd = document.getElementById('add');

function renderElement(elem) {
  const record = document.createElement('div');
  const description = document.createElement('div');
  const title = document.createElement('div');
  const connections = document.createElement('div');
  const parents = document.createElement('div');

  description.classList.add('record-description');
  description.append(connections, parents);

  record.dataset.value = elem.name;
  record.classList.add('record');
  record.append(title, description);

  title.textContent = elem.name;
  if (elem.connections.length > 0) {
    connections.textContent = `Connections: ${elem.connections
      .map((elem) => elem.name)
      .join(', ')}`;
  }
  if (elem instanceof GenericElement) {
    parents.textContent = `Parents: ${elem.parents.join(', ')}`;
  }

  return record;
}

function update() {
  listAllDom.replaceChildren(...list.elements.map(renderElement));
  listUsedDom.replaceChildren(...list.used.map(renderElement));
  listBaseDom.replaceChildren(...list.base.map(renderElement));
  listMissedDom.replaceChildren(...list.missed.map(renderElement));
  listFinalDom.replaceChildren(...list.final.map(renderElement));
}

buttonAdd.addEventListener('click', () => {
  try {
    const nElem1 = prep(inputElem1.value);
    const nElem2 = prep(inputElem2.value);
    const nResult = prep(inputResult.value);

    if (!nElem1) throw new Error(ERRORS.NotEmpty);
    if (!nElem2) throw new Error(ERRORS.NotEmpty);
    if (!nResult) throw new Error(ERRORS.NotEmpty);
    if (list.has(nResult)) throw new Error(ERRORS.AlreadyExists);
    if (nElem1 === nElem2) throw new Error(ERRORS.NotEqual);

    const elem1 = list.add(nElem1);
    const elem2 = list.add(nElem2);
    const elemRes = list.add(nResult, [elem1, elem2]);

    update();

    console.log(
      `${elemRes.name} = ${elemRes.parents
        .map((elem) => elem.name)
        .join(' + ')}`
    );
  } catch (error) {
    console.error(error.message);
  }
});

function check(node, exitNode) {
  if (!node || node === exitNode) return null;
  if (node.classList?.contains('record')) return node;
  return check(node.parentNode);
}

listsDom.addEventListener('contextmenu', (event) => event.preventDefault());
listsDom.addEventListener('mouseup', (e) => {
  const record = check(e.target, e.currentTarget);
  if (!record) return;
  if (e.button === 0) {
    inputElem1.value = record.dataset.value;
  }
  if (e.button === 2) {
    inputElem2.value = record.dataset.value;
  }
});

document.body.onload = () => {
  update();
};
