import { memo, ReactNode } from 'react';

import { mapArray } from 'helpers';

interface IMappedListProps<T> {
  items: T[];
  className: string;
  children: (item: T) => ReactNode;
}

function MappedListComponent<T>({ items, className, children }: IMappedListProps<T>) {
  return <ul className={className}>{mapArray(items, children)}</ul>;
}

const MappedList = memo(MappedListComponent) as typeof MappedListComponent;

export default MappedList;
