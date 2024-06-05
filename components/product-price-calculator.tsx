'use client';

import { useState } from 'react';

import { IWorkType, WorkType } from 'types';

import { MobileMenuTemplate, ModalTemplate } from 'template';
import { DropdownUI, InputUI, PrimaryButtonUI } from 'ui';
import PriceResult from './price-result';

export default function PriceCalculator() {
  const [hasSubmitData, setHasSubmitData] = useState(false);

  const workTypes: IWorkType[] = [
    {
      typeId: 'teamWork1',
      option: WorkType.Diplomas,
    },
    {
      typeId: 'teamWork2',
      option: WorkType.TeamPapers,
    },
    {
      typeId: 'teamWork3',
      option: WorkType.BachelorTheses,
    },
    {
      typeId: 'teamWork4',
      option: WorkType.TestPapers,
    },
    {
      typeId: 'teamWork5',
      option: WorkType.Abstracts,
    },
    {
      typeId: 'teamWork6',
      option: WorkType.PracticalWorks,
    },
  ];

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
        <DropdownUI
          label={WorkType.Default}
          options={workTypes}
        />
        {/* <DropdownUI />
        <DropdownUI />  */}
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
