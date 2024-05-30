'use client';

import { useState } from 'react';

import { MobileMenuTemplate, ModalTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../product-price-calculator';

export default function PriceControls() {
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  return (
    <>
      <p>PriceControls</p>
      <PrimaryButtonUI handleClick={() => setIsOpenPrice(true)}>
        Розрахувати вартість
      </PrimaryButtonUI>
      {isOpenPrice && (
        <MobileMenuTemplate>
          <PriceCalculator />
        </MobileMenuTemplate>
      )}
      {isOpenPrice && (
        <ModalTemplate>
          <PriceCalculator />
        </ModalTemplate>
      )}
    </>
  );
}
