export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='container relative px-6 md:px-10 lg:px-20'>{children}</div>;
}
