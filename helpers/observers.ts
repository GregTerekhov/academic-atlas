import { throttle } from 'lodash';

const DEFAULT_OPTIONS = {
  rootMargin: '0px',
  threshold: 0.5,
};

interface ObserverElement {
  id: string;
  callback: (entry: IntersectionObserverEntry) => void;
}

export function initMultiObserver(
  elements: ObserverElement[],
  options = DEFAULT_OPTIONS,
): IntersectionObserver {
  const observer = new IntersectionObserver(
    throttle((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        const element = elements.find((item) => item.id === entry.target.id);
        if (element && entry.isIntersecting) {
          element.callback(entry);
        }
      });
    }, 500),
    options,
  );

  elements.forEach((element) => {
    const DOMElement = document.getElementById(element.id);
    if (DOMElement) {
      observer.observe(DOMElement);
    }
  });

  return observer;
}
