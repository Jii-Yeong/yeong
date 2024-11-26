export const useScrollLock = () => {
  const setScrollLock = () => {
    window.scrollTo(0, 0)
    document.body.style.overflowY = "hidden"
  }
  const offScrollLock = () => {
    document.body.style.overflowY = "scroll"
  }

  return {
    setScrollLock,
    offScrollLock,
  }
}
