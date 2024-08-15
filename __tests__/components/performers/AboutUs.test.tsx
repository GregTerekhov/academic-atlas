import { render, screen } from '@testing-library/react';
import AboutUs from 'components/performers/about-us';
import { getAboutUsData } from 'data/componentsData';

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children }) => (
    <ul>{getAboutUsData().map((item) => children(item))}</ul>
  )),
}));

jest.mock('../../../components/performers/subcomponents/about-us-item.tsx', () => {
  type IAboutUsItemProps = {
    header: string;
    description: string;
    src: string;
    alt: string;
  };
  const MockAboutUsItem = ({ header, description, src, alt }: IAboutUsItemProps) => (
    <li data-testid='AboutUsItem'>
      <div>
        <h2>{header}</h2>
        <p>{description}</p>
      </div>
      <img
        src={src}
        alt={alt}
      />
    </li>
  );
  MockAboutUsItem.displayName = 'AboutUsItem';
  return MockAboutUsItem;
});

describe('About us performers component', () => {
  it('should render a list of us', () => {
    render(<AboutUs />);

    const aboutUsItem = screen.getAllByTestId('AboutUsItem');
    expect(aboutUsItem).toHaveLength(getAboutUsData().length);
  });
});
