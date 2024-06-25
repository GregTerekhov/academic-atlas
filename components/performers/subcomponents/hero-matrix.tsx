import Image from 'next/image';
import topLeftImage from '/public/images/top-left-matrix-grid.webp';
import bottomRightImage from '/public/images/right-bottom-matrix-grid.webp';
import centerImage from '/public/images/center-matrix-grid.webp';

const HeroMatrix = () => {
  const gridMatrixSize = 'lg:h-44 lg:w-44 md:h-20 md:w-20';
  const gridMatrixRadius = {
    one: 'lg:rounded-bl-[60px] lg:rounded-tr-[60px] md:rounded-bl-[30px] md:rounded-tr-[30px]',
    three: 'lg:rounded-tl-[60px] lg:rounded-tr-[60px] md:rounded-tl-[30px] md:rounded-tr-[30px]',
    four: 'lg:rounded-tl-[60px] md:rounded-tl-[30px]',
    six: 'lg:rounded-br-[60px] md:rounded-br-[30px]',
    seven: 'lg:rounded-bl-[60px] lg:rounded-br-[60px] md:rounded-bl-[30px] md:rounded-br-[30px]',
  };

  return (
    <div className='max-md:hidden'>
      <div className='col-span-2 grid w-max grid-cols-3 bg-transparent md:gap-2 lg:gap-1'>
        <Image
          src={topLeftImage}
          alt='aPersonTexting'
          className={`${gridMatrixSize} ${gridMatrixRadius.one}`}
        />
        <div className={`${gridMatrixRadius.three} col-start-3 bg-accentSecondary-darker/20`} />
        <div className={`${gridMatrixSize} ${gridMatrixRadius.four} bg-accentSecondary/20`} />
        <div className='bg-transparent'>
          <Image
            src={centerImage}
            alt='a-woman-is-searching-on-a-bookshelf'
            className={`${gridMatrixSize}`}
          />
        </div>
        <div className={`${gridMatrixSize} ${gridMatrixRadius.six} bg-accentPrimary/20`} />
        <div className={`${gridMatrixSize} ${gridMatrixRadius.seven} col-span-2 bg-whiteBase/20`} />
        <div className='col-start-3 bg-transparent'>
          <Image
            src={bottomRightImage}
            alt='some-guy-smiling-with-arms-crossed'
            className={`${gridMatrixSize} ${gridMatrixRadius.one}`}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroMatrix;
