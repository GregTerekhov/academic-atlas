import { render, screen } from '@testing-library/react';

import { AriaLabel, CompanyContacts, Paths } from 'types';
import { LegalParagraph } from 'components/legal-documents/subcomponents';

describe('Paragraph Component', () => {
  it.each([
    {
      value: `Contact us at ${CompanyContacts.Email} for more information.`,
      substitute: CompanyContacts.Email,
      ariaLabel: AriaLabel.Email,
      isInternalLink: false,
      expectedHref: `mailto:${CompanyContacts.Email}`,
      expectedText: CompanyContacts.Email,
    },
    {
      value: 'Please review our сторінці Політики конфіденційності for details.',
      substitute: 'сторінці Політики конфіденційності',
      ariaLabel: AriaLabel.Policy,
      isInternalLink: true,
      expectedHref: Paths.Policy,
      expectedText: 'сторінці Політики конфіденційності',
    },
    {
      value: 'Contact us for more information.',
      substitute: 'some other text',
      ariaLabel: AriaLabel.Email,
      isInternalLink: false,
      expectedHref: null,
      expectedText: 'Contact us for more information.',
    },
  ])(
    'renders text with correct link and attributes for value %s',
    ({ value, substitute, ariaLabel, isInternalLink, expectedHref, expectedText }) => {
      render(
        <LegalParagraph
          value={value}
          substitute={substitute}
          ariaLabel={ariaLabel}
          isInternalLink={isInternalLink}
        />,
      );

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
