export const toggleScrollLock = (isLocked: boolean) => {
  const root = document.firstElementChild;
  const body = document.body;

  if (isLocked) {
    body.classList.add('no-scroll');
    root?.classList.add('no-scroll');
  } else {
    body.classList.remove('no-scroll');
    root?.classList.remove('no-scroll');
  }
};
