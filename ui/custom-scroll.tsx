interface ICustomScroll {
  children: React.ReactNode;
  className?: string;
}

export default function CustomScroll({ children, className }: ICustomScroll) {
  return (
    <div className={className}>
      <div className='scrollbar hover:scrollbar-thumb-accentPrimary scrollbar-w-4 scrollbar-thumb-rounded-xl scrollbar-thumb-disabled-foreground scrollbar-track-darkBase/75 z-20 h-60 overflow-y-scroll '>
        {children}
      </div>
    </div>
  );
}
