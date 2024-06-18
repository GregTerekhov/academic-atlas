'use client';

import { ButtonType, PrimaryButtonLabel } from 'types';

import { PrimaryButtonUI } from 'ui';

export default function PriceResult() {
  return (
    <>
      <p>PriceResult</p>
      <PrimaryButtonUI type={ButtonType.Submit}>
        {/* <SvgIconUI /> */}
        {PrimaryButtonLabel.SwitchToTelegram}
      </PrimaryButtonUI>
    </>
  );
}
