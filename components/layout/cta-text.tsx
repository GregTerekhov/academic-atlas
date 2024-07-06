import { CtaText } from 'types';

interface ICallToActionTextProps {
  ctaStyle?: string | undefined;
  ctaText?: CtaText;
}

export default function CallToActionText({
  ctaStyle,
  ctaText = CtaText.NoText,
}: ICallToActionTextProps) {
  const marginClass =
    ctaStyle && ctaStyle.includes('no-margin') ? 'max-md:mb-6' : 'mb-6 md:mb-8 lg:mb-16';
  const combinedClass = `${ctaStyle ?? ''} ${marginClass} text-medium md:text-xl lg:text-2xl`;

  return <p className={combinedClass}>{ctaText}</p>;
}
