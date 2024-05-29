import { SvgIconUI } from 'ui';

export default function Modal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <SvgIconUI />
        <h2>Modal</h2>
        {children}
      </div>
    </div>
  );
}
