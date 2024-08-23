export const getScrollBarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.overflow = 'scroll';

  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;

  const inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  outer.parentNode?.removeChild(outer);

  return widthNoScroll - widthWithScroll;
};

export const hasScrollbar = () => {
  return document.body.scrollHeight > document.body.clientHeight;
};

export const toggleScrollLock = (isLocked: boolean) => {
  const root = document.firstElementChild;
  const body = document.body;
  
  if (isLocked) {
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('scrollPosition', scrollPosition.toString());

    body.ontouchmove = function (e) {
      e.preventDefault();
    };
    body.style.top = `-${scrollPosition}px`;
    body.classList.add('no-scroll');
    root?.classList.add('no-scroll');

    if (hasScrollbar()) {
      body.style.width = `calc(100% - ${getScrollBarWidth()}px)`;
    } else {
      body.style.width = '100%';
    }
  } else {
    body.ontouchmove = null;
    body.classList.remove('no-scroll');
    root?.classList.remove('no-scroll');

    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      const scrollY = parseInt(savedScrollPosition, 10);
      sessionStorage.removeItem('scrollPosition');
      window.scrollTo(0, scrollY);
    }
    body.style.top = '';
    body.style.width = '';
  }
};
