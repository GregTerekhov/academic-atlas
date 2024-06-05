// import SvgIcon from './svg-icon';

export default function Accordion({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <>
      <p>Accordion</p>
      <div>
        {/* <SvgIcon /> */}
        {title}
      </div>
      {children}
    </>
  );
}
