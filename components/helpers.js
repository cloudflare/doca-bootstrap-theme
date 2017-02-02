// return offsetTop relative to the whole page
export function offsetTop(elem) {
  const body = document.body;
  const docEl = document.documentElement;
  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const clientTop = docEl.clientTop || body.clientTop || 0;
  if (!elem) return scrollTop - clientTop;
  const box = elem.getBoundingClientRect();
  const top = box.top + scrollTop - clientTop;
  return Math.round(top);
}
