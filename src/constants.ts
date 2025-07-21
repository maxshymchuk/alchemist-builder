const ERRORS = {
  NotEmpty: 'Cannot be empty',
  NotEqual: 'Cannot be equal',
  AlreadyExists: 'Already exists',
};

const DOMS = {
  get Window() {
    return window;
  },
  get Error() {
    return document.querySelector('.error');
  },
  get Main() {
    return document.querySelector('main');
  },
  get ListAll() {
    return document.getElementById('list-all');
  },
  get ListUsed() {
    return document.getElementById('list-used');
  },
  get ListBase() {
    return document.getElementById('list-base');
  },
  get ListMissed() {
    return document.getElementById('list-missed');
  },
  get ListFinal() {
    return document.getElementById('list-final');
  },
  get InputElem1() {
    return document.getElementById('elem1') as HTMLInputElement;
  },
  get InputElem2() {
    return document.getElementById('elem2') as HTMLInputElement;
  },
  get InputResult() {
    return document.getElementById('res') as HTMLInputElement;
  },
  get ButtonAdd() {
    return document.getElementById('add') as HTMLInputElement;
  },
  get Header() {
    return document.querySelector('header');
  },
  get Footer() {
    return document.querySelector('footer');
  },
  // Debug
  get DebugElements() {
    return document.querySelectorAll('.debug');
  },
  get DebugAddRecords() {
    return document.querySelectorAll(
      '[data-type="add-records"]'
    ) as NodeListOf<HTMLInputElement>;
  },
};

export { ERRORS, DOMS };
