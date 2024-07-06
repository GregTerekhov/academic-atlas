import type { Metadata } from 'next';
import { MetadataTexts } from 'types';

import {
  AboutCompany,
  Accession,
  Benefits,
  HeroPartnership,
  Requirements,
  WorkflowSteps,
} from 'components';

export const metadata: Metadata = {
  title: MetadataTexts.partnership.title,
  description: MetadataTexts.partnership.description,
  keywords: MetadataTexts.partnership.keywords,
  // openGraph: MetadataTexts.partnership.openGraph,    //FIXME: --- uncomment
};

export default function Partnership() {
  return (
    <>
      <HeroPartnership />
      <AboutCompany />
      <Benefits />
      <WorkflowSteps />
      <Requirements />
      <Accession />
    </>
  );
}
