import { render, screen } from '@testing-library/react';

import { AriaLabel, CompanyContacts, Paths } from 'types';
import { LegalParagraph } from 'components/legal-documents/subcomponents';

describe('Paragraph Component', () => {
  const valueWithSubstituteEmail = `Contact us at ${CompanyContacts.Email} for more information.`;
  const valueWithSubstitutePolicy = `Please review our сторінці Політики конфіденційності for details.`;
  const valueWithoutSubstitute = 'Contact us for more information.';

  it('renders text with a mailto link when substitute is email and isInternalLink is false', () => {
    render(
      <LegalParagraph
        value={valueWithSubstituteEmail}
        substitute={CompanyContacts.Email}
        ariaLabel={AriaLabel.Email}
        isInternalLink={false}
      />,
    );

    const link = screen.getByText(CompanyContacts.Email);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `mailto:${CompanyContacts.Email}`);
    expect(link).toHaveTextContent(CompanyContacts.Email);
  });

  it('renders text with an internal link when substitute is сторінці Політики конфіденційності and isInternalLink is true', () => {
    render(
      <LegalParagraph
        value={valueWithSubstitutePolicy}
        substitute='сторінці Політики конфіденційності'
        ariaLabel={AriaLabel.Policy}
        isInternalLink={true}
      />,
    );

    const link = screen.getByText('сторінці Політики конфіденційності');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', Paths.Policy);
    expect(link).toHaveTextContent('сторінці Політики конфіденційності');
  });

  it('renders text without a link when substitute is not in the value', () => {
    render(
      <LegalParagraph
        value={valueWithoutSubstitute}
        substitute='some other text'
        ariaLabel={AriaLabel.Email}
        isInternalLink={false}
      />,
    );

    expect(screen.getByText(valueWithoutSubstitute)).toBeInTheDocument();
  });
});
