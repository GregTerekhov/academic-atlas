'use client';

import PlagiarismCheckbox from './plagiarism-checkbox';
import RangeInput from './range-input';

export default function PlagiarismSection() {
  return (
    <div className='mb-8 space-y-6'>
      <PlagiarismCheckbox
        id='checkbox'
        label='Наявність перевірки на плагіат'
      />
      <RangeInput id='range' />
    </div>
  );
}
