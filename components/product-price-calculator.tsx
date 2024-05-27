'use client';

import { ButtonType } from 'types';

import { MobileMenuTemplate, ModalTemplate } from 'template';
import { DropdownUI, InputUI } from 'ui';
// import { useState } from 'react';

export default function PriceCalculator() {
  // const [hasSubmitData, setHasSubmitData] = useState(false);

  return (
    <>
      <MobileMenuTemplate isPrice>
        <p>Меню Дізнатись вартість</p>
        <DropdownUI />
        <DropdownUI />
        <DropdownUI />
        <InputUI />
        <InputUI />
        <InputUI />
      </MobileMenuTemplate>
      <ModalTemplate
        type={ButtonType.Button}
        buttonTitle='Розрахувати вартість'
      >
        <p>Меню Дізнатись вартість</p>
        <DropdownUI />
        <DropdownUI />
        <DropdownUI />
        <InputUI />
        <InputUI />
        <InputUI />
      </ModalTemplate>
      {/* {hasSubmitData && (
        <ModalTemplate
          type={ButtonType.Submit}
          buttonTitle='@Academic Atlas'
          hasIcon
        >
          Price results
        </ModalTemplate>
      )} */}
    </>
  );
}
