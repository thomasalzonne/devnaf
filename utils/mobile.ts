export const isMobile = (): boolean => {
  if (process.client) {
    return document.body?.clientWidth < 992
  } else {
    return false
  }
}
