const getScrollBarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.visibility = 'hidden';
  scrollDiv.style.width = '100px';

  document.body.appendChild(scrollDiv);

  const widthNoScroll = scrollDiv.offsetWidth;
  scrollDiv.style.overflow = 'scroll';

  const switcherDiv = document.createElement('div');
  switcherDiv.style.width = '100%';
  scrollDiv.appendChild(switcherDiv);

  const widthWithScroll = switcherDiv.offsetWidth;

  scrollDiv.parentNode?.removeChild(scrollDiv);

  return widthNoScroll - widthWithScroll;
};

const hasScrollbar = () => {
  return document.body.scrollHeight > document.body.clientHeight;
};

export const toggleScrollLock = (isLocked: boolean) => {
  const root = document.firstElementChild;
  const body = document.body;
  const scrollPosition = window.scrollY;

  if (isLocked) {
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
    body.ontouchmove = function () {
      return true;
    };
    body.classList.remove('no-scroll');
    root?.classList.remove('no-scroll');
    const scrollY = body.style.top ? parseInt(body.style.top, 10) * -1 : 0;
    body.style.top = '';
    window.scrollTo(0, scrollY);
  }
};
