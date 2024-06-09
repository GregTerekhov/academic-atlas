'use client';

import {
  // MobileMenuTemplate,
  ModalTemplate,
} from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../product-price-calculator';
import { useRouter, useSearchParams } from 'next/navigation';

interface IPriceControlsComponentProps {
  params: Record<string, string> | null;
}

export default function PriceControls({ params }: IPriceControlsComponentProps) {
  const show = params?.show;
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleClick = () => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('show', 'true');

    replace(`/?${queryParams.toString()}`);
  };

  return (
    <>
      <p>PriceControls</p>
      <PrimaryButtonUI handleClick={handleClick}>Розрахувати вартість</PrimaryButtonUI>
      {/* {isOpenPrice && (
        <MobileMenuTemplate>
          <PriceCalculator />
        </MobileMenuTemplate>
      )} */}
      {show && (
        <ModalTemplate>
          <PriceCalculator />
        </ModalTemplate>
      )}
    </>
  );
}
