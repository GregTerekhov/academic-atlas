import { ThemeVariants } from 'types';
import { applyPreference } from 'helpers';

describe('applyPreference helper', () => {
  it('should remove existing theme classes and apply the new theme', () => {
    document.firstElementChild?.classList.add(ThemeVariants.DARK);

    applyPreference(ThemeVariants.LIGHT);

    expect(document.firstElementChild).toHaveClass(ThemeVariants.LIGHT);
    expect(document.firstElementChild).not.toHaveClass(ThemeVariants.DARK);
  });
});
