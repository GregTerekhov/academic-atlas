import { render, screen } from '@testing-library/react';
import Hero from '../components/performers/hero';
import { CtaText, SectionDescriptions, SectionTitle } from 'types/layoutTypes';
import { PrimaryButtonLabel } from 'types/ui';

describe('Hero component tests', () => {
  beforeEach(() => {
    render(<Hero />);
  });

  test('There is a right header', () => {
    const heroHeader = screen.getByRole('heading', { level: 1 });
    expect(heroHeader).toBeInTheDocument();
    expect(heroHeader.textContent).toMatch(SectionDescriptions[SectionTitle.PartnershipHero]);
  });

  test('There is a right description', () => {
    const heroDesc = screen.getByRole('paragraph');
    expect(heroDesc).toBeInTheDocument();
    expect(heroDesc.textContent).toMatch(CtaText.PartnershipHero);
  });

  test('There is a telegram button', () => {
    const heroDesc = screen.getByRole('link');
    expect(heroDesc.textContent).toMatch(PrimaryButtonLabel.Accession);
  });
});
