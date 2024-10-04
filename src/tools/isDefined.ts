export default function isDefined<T>(thing?: T): thing is T {
  return typeof thing !== "undefined";
}
