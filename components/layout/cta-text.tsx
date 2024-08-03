import { CtaText } from 'types';
import { getCtaTextStyles } from 'styles';

interface ICallToActionTextProps {
  ctaStyle?: string | undefined;
  ctaText?: CtaText;
}

export default function CallToActionText({
  ctaStyle,
  ctaText = CtaText.NoText,
}: ICallToActionTextProps) {
  const combinedClass = getCtaTextStyles(ctaStyle);

  return <p className={combinedClass}>{ctaText}</p>;
}
