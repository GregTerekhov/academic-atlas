export const usePriceRenderFormatting = (calculatedPrice: number) => {
  const priceToRound = Math.round(calculatedPrice);
  const priceToSlice = priceToRound.toString().slice(-2);

  const slicedPriceToNumber = Number(priceToSlice);

  let renderedPrice: number = 0;

  if (slicedPriceToNumber <= 25) {
    renderedPrice = priceToRound - slicedPriceToNumber;
  } else if (slicedPriceToNumber > 25 && slicedPriceToNumber <= 50) {
    renderedPrice = priceToRound + (50 - slicedPriceToNumber);
  } else if (slicedPriceToNumber > 50 && slicedPriceToNumber <= 75) {
    renderedPrice = priceToRound - slicedPriceToNumber;
  } else if (slicedPriceToNumber > 75 && slicedPriceToNumber <= 100) {
    renderedPrice = priceToRound + (100 - slicedPriceToNumber);
  }

  return { renderedPrice };
};
