import type { Metadata } from 'next';

import { MetadataTexts } from 'helpers';

import {
  AboutCompany,
  Accession,
  Benefits,
  HeroPartnership,
  Requirements,
  WorkflowSteps,
} from 'components';

const { partnership } = MetadataTexts;
const { title, description, keywords } = partnership;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  // openGraph,    //FIXME: --- uncomment
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
