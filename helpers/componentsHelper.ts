import { AriaLabel, CompanyContacts, type ISubstituteProps } from '../types';

export const getSubstituteProps = (
  value: string,
  substituteValue: CompanyContacts | string,
): ISubstituteProps => {
  if (substituteValue === 'email') {
    return {
      value,
      substitute: CompanyContacts.Email,
      ariaLabel: AriaLabel.Email,
      isInternalLink: false,
    };
  }
  return {
    value,
    substitute: 'сторінці Політики конфіденційності',
    ariaLabel: AriaLabel.Policy,
    isInternalLink: true,
  };
};
