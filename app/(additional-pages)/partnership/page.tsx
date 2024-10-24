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
const { title, description, openGraph } = partnership;

export const metadata: Metadata = {
  title,
  description,
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
