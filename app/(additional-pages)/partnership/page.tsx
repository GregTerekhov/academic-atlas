import type { Metadata } from 'next';

import { MetadataTexts } from 'data';

import {
  AboutCompany,
  Accession,
  Benefits,
  HeroPartnership,
  Requirements,
  WorkflowSteps,
} from 'components';

const { partnership } = MetadataTexts;
const { title, description, keywords, openGraph } = partnership;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  openGraph,
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
