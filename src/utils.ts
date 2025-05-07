function prep(str: string) {
  try {
    return str.trim().toLowerCase();
  } catch {
    return '';
  }
}

function hash(str: string): string {
  let hash = 0;
  let chr;
  if (str.length === 0) return '';
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `${hash}`;
}

function findElement(condition: (element: HTMLElement) => boolean) {
  return function rec(
    element: EventTarget | null,
    exitNode: EventTarget | null = document.body
  ) {
    if (!element || element === exitNode) return null;
    const htmlElement = element as HTMLElement;
    if (condition(htmlElement)) return htmlElement;
    return rec(htmlElement.parentNode, exitNode);
  };
}

function getRandomNames(length: number) {
  const list: Array<string> = [];
  const alpha = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    let name = '';
    for (let j = 0; j < 10; j++) {
      name += alpha[Math.trunc(Math.random() * alpha.length)];
    }
    list.push(name);
  }
  return list;
}

export { prep, hash, findElement, getRandomNames };
