import { render, screen } from '@testing-library/react';

import { CompanyContacts, Paths } from 'types';
import { getSubstituteProps } from 'helpers';
import { LegalParagraph } from 'components/legal-documents/subcomponents';

describe('Paragraph Component', () => {
  const testCases = [
    {
      value: `Contact us at ${CompanyContacts.Email} for more information.`,
      substituteValue: 'email',
      expectedHref: `mailto:${CompanyContacts.Email}`,
      expectedText: CompanyContacts.Email,
    },
    {
      value: 'Please review our сторінці Політики конфіденційності for details.',
      substituteValue: 'policyPageLink',
      expectedHref: Paths.Policy,
      expectedText: 'сторінці Політики конфіденційності',
    },
    {
      value: 'This text has no matching substitute.',
      substituteValue: '',
      expectedHref: null,
      expectedText: 'This text has no matching substitute.',
    },
  ];

  it.each(testCases)(
    'renders text with correct link and attributes for value: $value',
    ({ value, substituteValue, expectedHref, expectedText }) => {
      const props = getSubstituteProps(value, substituteValue);

      render(<LegalParagraph {...props} />);

      const textElement = screen.getByText(expectedText);
      expect(textElement).toBeInTheDocument();

      if (expectedHref) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(textElement).toHaveAttribute('href', expectedHref);
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(textElement).not.toHaveAttribute('href');
      }
    },
  );
});
