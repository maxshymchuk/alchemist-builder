import { DOMS, ERRORS } from './constants';
import { getRandomNames, findElement, prep } from './utils';
import { BaseElement } from './classes/BaseElement';
import { GenericElement } from './classes/GenericElement';
import { ElementCollection } from './classes/ElementCollection';

const list = new ElementCollection();

function renderError(message: string) {
  if (!message) {
    DOMS.Error?.remove();
    return;
  }
  if (DOMS.Error) {
    DOMS.Error.textContent = message;
  } else {
    const wrapper = document.createElement('div');
    wrapper.classList.add('error');
    wrapper.textContent = message;
    DOMS.Footer?.append(wrapper);
  }
}

function createRecord(element: BaseElement) {
  const record = document.createElement('div');
  const description = document.createElement('div');
  const title = document.createElement('div');
  const connections = document.createElement('div');
  const parents = document.createElement('div');

  description.classList.add('record-description');
  description.append(connections, parents);

  record.dataset.value = element.name;
  record.classList.add('record');
  record.append(title, description);

  title.textContent = element.name;
  if (element.connections.length > 0) {
    connections.textContent = `Connections: ${element.connections
      .map((elem) => elem.name)
      .join(', ')}`;
  }
  if (element instanceof GenericElement) {
    parents.textContent = `Parents: ${element.parents.join(', ')}`;
  }

  return record;
}

function display() {
  DOMS.ListAll?.replaceChildren(...list.elements.map(createRecord));
  DOMS.ListUsed?.replaceChildren(...list.used.map(createRecord));
  DOMS.ListBase?.replaceChildren(...list.base.map(createRecord));
  DOMS.ListMissed?.replaceChildren(...list.missed.map(createRecord));
  DOMS.ListFinal?.replaceChildren(...list.final.map(createRecord));
}

function handleAdd() {
  let message = '';
  try {
    const nElem1 = prep(DOMS.InputElem1?.value);
    const nElem2 = prep(DOMS.InputElem2?.value);
    const nResult = prep(DOMS.InputResult?.value);

    if (!nElem1) throw new Error(ERRORS.NotEmpty);
    if (!nElem2) throw new Error(ERRORS.NotEmpty);
    if (!nResult) throw new Error(ERRORS.NotEmpty);
    if (list.has(nResult)) throw new Error(ERRORS.AlreadyExists);
    if (nElem1 === nElem2) throw new Error(ERRORS.NotEqual);

    const elem1 = list.add(nElem1);
    const elem2 = list.add(nElem2);
    const elemRes = list.add(nResult, [elem1, elem2]);

    display();

    console.log(
      `${elemRes.name} = ${elemRes.parents
        .map((elem) => elem.name)
        .join(' + ')}`
    );
  } catch (error) {
    if (error instanceof Error) {
      message = error.message;
      console.error(error.message);
    }
  } finally {
    renderError(message);
  }
}

function handleContextMenu(e: MouseEvent) {
  e.preventDefault();
}

function handleMouseUp(e: MouseEvent) {
  const record = findElement((element) => element.classList.contains('record'))(
    e.target
  );
  if (!record) return;
  if (e.button === 0) {
    DOMS.InputElem1.value = record.dataset.value ?? '';
  }
  if (e.button === 2) {
    DOMS.InputElem2.value = record.dataset.value ?? '';
  }
}

function handleDebugHeader() {
  if (DOMS.DebugHeader?.classList.contains('hidden')) {
    DOMS.DebugHeader?.classList.remove('hidden');
    DOMS.DebugToggle.value = 'Hide DBG';
  } else {
    DOMS.DebugHeader?.classList.add('hidden');
    DOMS.DebugToggle.value = 'Show DBG';
  }
}

function handleAddRecords(amount: number) {
  return () => {
    for (const name of getRandomNames(amount)) {
      list.add(name);
    }
    display();
  };
}

function handleInit() {
  display();
}

export {
  handleAdd,
  handleContextMenu,
  handleMouseUp,
  handleDebugHeader,
  handleAddRecords,
  handleInit,
};
