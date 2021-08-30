export default function (sel, data, children, text, elm) {
  let key = data.key
  return {
    sel,
    data,
    children,
    text,
    elm,
    key
  }
}