import { getAriaLabelContacts } from 'helpers';

describe('getAriaLabelContacts', () => {
  it.each([
    ['tel:1234567890', 'Contact Us', 'Call Contact Us'],
    ['mailto:example@example.com', 'Support', 'Email Support'],
    ['https://example.com', 'Website', 'Open link to Website'],
  ])('returns correct label for %s with label %s', (href, label, expected) => {
    expect(getAriaLabelContacts(href, label)).toBe(expected);
  });
});
