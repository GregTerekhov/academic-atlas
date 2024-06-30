export const usePriceRenderFormatting = (calculatedPrice: number) => {
  const priceToRound = Math.round(calculatedPrice);
  const lastTwoDigits = priceToRound % 100;

  let renderedPrice: number = 0;

  console.log('adsda', priceToRound, lastTwoDigits);

  if (lastTwoDigits <= 25) {
    renderedPrice = priceToRound - lastTwoDigits;
  } else if (lastTwoDigits > 25 && lastTwoDigits <= 50) {
    renderedPrice = priceToRound + (50 - lastTwoDigits);
  } else if (lastTwoDigits > 50 && lastTwoDigits <= 75) {
    renderedPrice = priceToRound - lastTwoDigits;
  } else {
    renderedPrice = priceToRound + (100 - lastTwoDigits);
  }

  return { renderedPrice };
};