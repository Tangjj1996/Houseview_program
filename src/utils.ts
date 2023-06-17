export function getImgExt(path: string | undefined) {
  if (!path) {
    return "";
  }
  return "." + path.split(".").at(-1);
}
