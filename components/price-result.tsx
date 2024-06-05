'use client';

import { ButtonType } from 'types';

import { PrimaryButtonUI } from 'ui';

export default function PriceResult() {
  return (
    <>
      <p>PriceResult</p>
      <PrimaryButtonUI type={ButtonType.Submit}>
        {/* <SvgIconUI /> */}
        @Academic Atlas
      </PrimaryButtonUI>
    </>
  );
}
