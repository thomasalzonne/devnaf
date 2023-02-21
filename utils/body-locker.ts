export const lockBody = () => {
  if (!import.meta.env.SSR) {
    document.body.classList.add('lock-body')
  }
}

export const unlockBody = () => {
  if (!import.meta.env.SSR) {
    document.body.classList.remove('lock-body')
  }
}
