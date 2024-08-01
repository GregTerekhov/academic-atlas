export const toggleScrollLock = (isLocked: boolean) => {
  const root = document.firstElementChild;
  const body = document.body;
  const scrollPosition = window.scrollY;

  if (isLocked) {
    body.style.top = `-${scrollPosition}px`;
    body.classList.add('no-scroll');
    root?.classList.add('no-scroll');
  } else {
    body.classList.remove('no-scroll');
    root?.classList.remove('no-scroll');
    const scrollY = body.style.top ? parseInt(body.style.top, 10) * -1 : 0;
    body.style.top = '';
    window.scrollTo(0, scrollY);
  }
};
