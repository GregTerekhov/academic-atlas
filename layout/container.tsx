interface IContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: Readonly<IContainerProps>) {
  return <div className='container relative px-6 md:px-10 lg:px-20'>{children}</div>;
}
