import { Container } from 'layout';

export default function Skeleton() {
  return (
    <section className='max-h-mobileSkeleton py-20 md:max-h-tabletSkeleton md:py-24 lg:max-h-desktopSkeleton lg:py-28'>
      <Container>
        <div className='flex h-full w-full items-center max-md:flex-col max-md:justify-center md:justify-between'>
          <div>
            <div className='mb-5 h-8 w-full rounded-3xl bg-whiteBase/20 md:mb-7 md:h-12 md:w-[396px] lg:mb-9 lg:h-[60px] lg:w-[546px]'></div>
            <div className='lg:h-[60px]lg:w-[546px] mb-4 h-8 w-full rounded-3xl bg-whiteBase/20 md:mb-6 md:h-12 md:w-[440px] lg:mb-8'></div>
            <div className='mb-[18px] h-[18px] w-full rounded-3xl bg-whiteBase/20 md:mb-6 md:h-6 md:w-96 lg:mb-7 lg:h-7 lg:w-[470px]'></div>
            <div className='mb-6 h-[18px] w-full rounded-3xl bg-whiteBase/20 md:mb-8 md:h-6 md:w-96 lg:mb-16 lg:h-7 lg:w-[470px]'></div>
            <div className='h-16 w-full rounded-3xl bg-whiteBase/20 md:w-60 lg:w-80'></div>
          </div>
          <div className='hidden size-64 rounded-3xl bg-whiteBase/20 md:block lg:size-[536px]'></div>
        </div>
      </Container>
    </section>
  );
}
