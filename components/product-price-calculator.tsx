'use client';

import { useState } from 'react';

import { MobileMenuTemplate, ModalTemplate } from 'template';
import { InputUI, PrimaryButtonUI } from 'ui';
import PriceResult from './price-result';

export default function PriceCalculator() {
  const [hasSubmitData, setHasSubmitData] = useState(false);

  return (
    <>
      <MobileMenuTemplate>
        <p>Меню Дізнатись вартість</p>
        {/* <DropdownUI /> */}
        {/* <DropdownUI />
        <DropdownUI /> */}
        <InputUI />
        <InputUI />
        <InputUI />
        <PrimaryButtonUI handleClick={() => setHasSubmitData(true)}>
          Розрахувати вартість
        </PrimaryButtonUI>
      </MobileMenuTemplate>
      <ModalTemplate>
        <p>Меню Дізнатись вартість</p>
        {/* <DropdownUI />
        <DropdownUI />
        <DropdownUI /> */}
        <InputUI />
        <InputUI />
        <InputUI />
        <PrimaryButtonUI handleClick={() => setHasSubmitData(true)}>
          Розрахувати вартість
        </PrimaryButtonUI>
      </ModalTemplate>
      {hasSubmitData && (
        <ModalTemplate>
          <PriceResult />
        </ModalTemplate>
      )}
      {hasSubmitData && (
        <MobileMenuTemplate>
          <PriceResult />
        </MobileMenuTemplate>
      )}
    </>
  );
}
