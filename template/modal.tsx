import Link from 'next/link';
// import { SvgIconUI } from 'ui';

export default function Modal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative'>
      <div className='z-100 fixed left-0 top-0 flex h-full w-full items-start justify-center overflow-auto bg-darkBase/75 transition-colors'>
        <div className='z-100 absolute top-[20%] flex flex-col items-center justify-center gap-10 rounded-[20px] border-[2.4px] border-solid border-accentPrimary bg-whiteBase p-14 dark:bg-background-gradient dark:text-whiteBase lg:min-h-[604px] lg:w-[752px]'>
          <Link
            href='/'
            className='absolute right-[5%] top-[30px] h-[30px] w-[30px] cursor-pointer bg-red-700'
          >
            {/* <SvgIconUI /> */}
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
