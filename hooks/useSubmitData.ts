'use client';

import { useState } from 'react';

export const useSubmitData = () => {
  const [hasSubmitData, setHasSubmitData] = useState(false);

  const handleCostClick = () => {
    setHasSubmitData(true);
  };

  return {
    hasSubmitData,
    handleCostClick,
  };
};
