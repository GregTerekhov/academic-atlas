export default function ThemeInput() {
  return (
    <label htmlFor='theme'>
      <input
        type='text'
        id='theme'
        className='w-full rounded-lg border border-accentPrimary-darker bg-whiteBase px-2 py-[11px] caret-accentPrimary placeholder:text-darkBase dark:bg-darkBase placeholder:dark:text-whiteBase max-md:text-sm max-md:leading-130 md:px-4'
        placeholder='Введіть тему (не обов`язково)'
      />
      <span className='sr-only'>Enter your work theme</span>
    </label>
  );
}
