import Link from 'next/link';
import { type ISubstituteProps, Paths } from 'types';

export default function Paragraph({
  value,
  substitute,
  ariaLabel,
  isInternalLink,
}: ISubstituteProps) {
  const renderParagraph = () => {
    if (value.includes(substitute)) {
      const [textBefore, textAfter] = value.split(substitute);

      return (
        <>
          {textBefore}

          {isInternalLink ? (
            <Link
              href={Paths.Policy}
              aria-label={ariaLabel}
            >
              {substitute}
            </Link>
          ) : (
            <a
              aria-label={ariaLabel}
              href={`mailto:${substitute}`}
              rel='noopener nofollow noreferrer'
            >
              {substitute}
            </a>
          )}

          {textAfter}
        </>
      );
    }

    return value;
  };

  return <>{renderParagraph()}</>;
}
