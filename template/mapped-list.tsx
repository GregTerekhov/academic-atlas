import { ReactNode } from 'react';

import { mapArray } from 'helpers';

interface IMappedListProps<T> {
  items: T[];
  className: string;
  children: (item: T) => ReactNode;
}

export default function MappedList<T>({ items, className, children }: IMappedListProps<T>) {
  return <ul className={className}>{mapArray(items, children)}</ul>;
}
