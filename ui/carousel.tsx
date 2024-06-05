// import SvgIcon from './svg-icon';

export default function Carousel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <p>Carousel</p>
      {/* <SvgIcon /> */}
      {children}
    </>
  );
}
