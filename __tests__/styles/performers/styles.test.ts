import {
  getHeroOverlayStyles,
  getHeroSectionStyles,
  getAboutUsImageStyles,
  getFigureWrapperStyles,
  getBenefitItemStyles,
  getRequirementsItemStyles,
  getRequirementsTitleStyles,
  getWorkflowBackgroundTabletStyles,
  getWorkflowBackgroundDesktopStyles,
} from 'styles';

describe.each([
  { func: getHeroSectionStyles, expected: 'backgroundSection' },
  {
    func: getHeroOverlayStyles,
    expected: 'dark:bg-section-overlay-dark md:hidden',
  },
  {
    func: getAboutUsImageStyles,
    expected: 'relative overflow-hidden rounded-lg bg-cover',
  },
  {
    func: getFigureWrapperStyles,
    expected: 'relative flex min-w-[45px]',
  },
  {
    func: getBenefitItemStyles,
    expected: 'blockItem',
  },
  {
    func: getRequirementsItemStyles,
    expected: 'blockItem',
  },
  {
    func: getRequirementsTitleStyles,
    expected: 'font-bold text-whiteBase dark:text-accentSecondary',
  },
  {
    func: getWorkflowBackgroundTabletStyles,
    expected: 'absolute left-1/2 top-20 -z-10',
  },
  {
    func: getWorkflowBackgroundDesktopStyles,
    expected: 'absolute -z-10',
  },
])('Testing static style functions for pages components', ({ func, expected }) => {
  it(`should return correct styles when ${func.name} is called`, () => {
    expect(func()).toContain(expected);
  });
});
