import { type IWithChildren } from 'types';

export default function Container({ children }: Readonly<IWithChildren>) {
  return <div className='container relative px-6 md:px-10 lg:px-20'>{children}</div>;
}
