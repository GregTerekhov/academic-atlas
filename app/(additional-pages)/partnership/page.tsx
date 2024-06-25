import {
  AboutCompany,
  Accession,
  Benefits,
  HeroPartnership,
  Requirements,
  WorkflowSteps,
} from 'components';
import { SectionTitle } from 'types/layoutTypes';

export default function Partnership() {
  return (
    <>
      <HeroPartnership />
      <AboutCompany />
      <Benefits />
      <Requirements
        title={SectionTitle.PartnershipRequirementsLg}
        style='max-lg:hidden'
      />
      <WorkflowSteps />
      <Requirements
        title={SectionTitle.PartnershipRequirementsMdSm}
        style='lg:hidden'
      />
      <Accession />
    </>
  );
}
