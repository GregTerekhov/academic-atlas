import { CtaText } from 'types';

interface ICallToActionTextProps {
  ctaStyle?: string | undefined;
  ctaText?: CtaText;
}

export default function CallToActionText({
  ctaStyle,
  ctaText = CtaText.NoText,
}: ICallToActionTextProps) {
  return (
    <p className={`${ctaStyle} mb-6 text-medium md:mb-8 md:text-xl lg:mb-16 lg:text-2xl`}>
      {ctaText}
    </p>
  );
}
