import { AriaLabel, CompanyContacts } from 'types';

interface IParagraph {
  value: string;
}

export default function Paragraph({ value }: IParagraph) {
  const renderParagraph = () => {
    if (value.includes(CompanyContacts.Email)) {
      const [before, after] = value.split(CompanyContacts.Email);

      return (
        <>
          {before}
          <a
            aria-label={AriaLabel.Email}
            href={`mailto:${CompanyContacts.Email}`}
            rel='noopener nofollow noreferrer'
          >
            {CompanyContacts.Email}
          </a>
          {after}
        </>
      );
    }

    return value;
  };

  return <>{renderParagraph()}</>;
}
