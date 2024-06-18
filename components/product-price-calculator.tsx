'use client';

import { useState } from 'react';

import { IWorkType, PrimaryButtonLabel, WorkType } from 'types';

import { DropdownUI, InputUI, PrimaryButtonUI } from 'ui';
import PriceResult from './price-result';

export default function PriceCalculator() {
  const [hasSubmitData, setHasSubmitData] = useState<boolean>(false);

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
      {!hasSubmitData ? (
        <div>
          <p>Меню Дізнатись вартість</p>
          <DropdownUI
            label={WorkType.Default}
            options={workTypes}
          />
          <InputUI />
          <InputUI />
          <InputUI />
          <PrimaryButtonUI handleClick={() => setHasSubmitData(true)}>
            {PrimaryButtonLabel.CostCalculation}
          </PrimaryButtonUI>
        </div>
      ) : (
        <PriceResult />
      )}
    </>
  );
}
