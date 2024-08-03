import { AriaLabel, ButtonType, MenuLinks, PositionInLayout } from 'types';
import { useMenu } from 'context';

import { MobileMenuTemplate } from 'template';
import PriceCalculator from '../../calculation/product-price-calculator';

interface IMenuTriggerProps {
  position: PositionInLayout;
}

export default function CalculationLinkMobile({ position }: IMenuTriggerProps) {
  const { isCalcMenuOpen, toggleCalcMenu, changeMenuContent } = useMenu();

  const onCostLinkClick = () => {
    if (position === PositionInLayout.Footer) {
      toggleCalcMenu();
    } else {
      changeMenuContent();
    }
  };

  const commonButtonStyles =
    'hidden hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentSecondary';

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={onCostLinkClick}
        className={`${position === PositionInLayout.Footer ? 'text-start text-sm max-sm:text-xs md:text-base' : 'text-medium md:text-big'} ${commonButtonStyles} max-lg:block`}
        aria-label={AriaLabel.CalculationModule}
      >
        {MenuLinks.Cost}
      </button>
      <MobileMenuTemplate isOpen={isCalcMenuOpen}>
        <PriceCalculator />
      </MobileMenuTemplate>
    </>
  );
}
