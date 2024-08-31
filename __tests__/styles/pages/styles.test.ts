import { get404PageTitleStyles, getLegalArticleStyles } from 'styles';

describe.each([
  { func: getLegalArticleStyles, expected: 'prose-sm' },
  {
    func: get404PageTitleStyles,
    expected: 'dark:bg-accent-darkGradient dark:bg-clip-text text-monstrousSm',
  },
])('Testing static style functions for pages components', ({ func, expected }) => {
  it(`should return correct styles when ${func.name} is called`, () => {
    expect(func()).toContain(expected);
  });
});
