import Image from 'next/image';
// import topLeftImage from '/public/images/top-left-matrix-grid.webp';
// import bottomRightImage from '/public/images/right-bottom-matrix-grid.webp';
// import centerImage from '/public/images/center-matrix-grid.webp';

const HeroMatrix = () => {
  // const gridMatrixSize = 'lg:h-44 lg:w-44 md:h-20 md:w-20';
  // const gridMatrixRadius = {
  //   one: 'lg:rounded-bl-[60px] lg:rounded-tr-[60px] md:rounded-bl-[30px] md:rounded-tr-[30px]',
  //   three: 'lg:rounded-tl-[60px] lg:rounded-tr-[60px] md:rounded-tl-[30px] md:rounded-tr-[30px]',
  //   four: 'lg:rounded-tl-[60px] md:rounded-tl-[30px]',
  //   six: 'lg:rounded-br-[60px] md:rounded-br-[30px]',
  //   seven: 'lg:rounded-bl-[60px] lg:rounded-br-[60px] md:rounded-bl-[30px] md:rounded-br-[30px]',
  // };
  const cellSize = 'size-20 lg:size-44';

  return (
    <div className='hidden w-max md:grid md:grid-rows-3 md:gap-2 lg:gap-1'>
      <div
        className={`${cellSize} overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-whiteBase/20 lg:rounded-bl-[60px] lg:rounded-tr-[60px]`}
      >
        <Image
          src='/images/top-left-matrix-grid.webp'
          alt='A person is typing on a laptop'
          width={80}
          height={80}
          className='lg:size-44'
        />
      </div>
      <div
        className={`${cellSize} col-start-3 rounded-t-[30px] bg-accentSecondary-darker/20 lg:rounded-t-[60px]`}
      />
      <div
        className={`${cellSize} row-start-2 rounded-ss-[50px] bg-accentSecondary/20 lg:rounded-ss-[100px]`}
      />
      <div className={`${cellSize} bg-whiteBase/20`}>
        <Image
          src='/images/center-matrix-grid.webp'
          alt='A woman searches the bookshelves'
          width={80}
          height={80}
          className='lg:size-44'
        />
      </div>
      <div className={`${cellSize} rounded-ee-[50px] bg-accentPrimary/20 lg:rounded-ee-[100px]`} />
      <div className={`${cellSize} rounded-b-[30px] bg-whiteBase/20 lg:rounded-b-[60px]`} />
      <div
        className={`${cellSize} col-start-3 overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-whiteBase/20  lg:rounded-bl-[60px] lg:rounded-tr-[60px]`}
      >
        <Image
          src='/images/right-bottom-matrix-grid.webp'
          alt='A guy smiles with his arms crossed'
          width={80}
          height={80}
          className='lg:size-44'
        />
      </div>
    </div>
  );
};

export default HeroMatrix;
