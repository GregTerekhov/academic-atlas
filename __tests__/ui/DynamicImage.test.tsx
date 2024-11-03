import { render, screen } from '@testing-library/react';
import { IImageProps, ImageSize } from 'types';
import DynamicImage from 'ui/image';

jest.mock('next/image', () => {
  // eslint-disable-next-line @next/next/no-img-element
  const MockImage: React.FC<IImageProps> = (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt}
      data-priority={props.priority}
    />
  );
  MockImage.displayName = 'Image';
  return MockImage;
});

describe('DynamicImageUI Component', () => {
  const defaultProps: IImageProps = {
    src: '/example.jpg',
    alt: 'Example image',
    width: ImageSize.Big402,
    height: ImageSize.Big334,
    className: 'custom-class',
    priority: true,
  };

  it('renders Image with correct props', () => {
    render(<DynamicImage {...defaultProps} />);

    const imageElement = screen.getByRole('img');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src');
    expect(imageElement).toHaveAttribute('alt', defaultProps.alt);
    expect(imageElement).toHaveAttribute('width', defaultProps.width.toString());
    expect(imageElement).toHaveAttribute('height', defaultProps.height.toString());
    expect(imageElement).toHaveClass(defaultProps.className);
    expect(imageElement).toHaveAttribute('data-priority', defaultProps.priority?.toString());
    expect(imageElement).toHaveAttribute(
      'blurDataURL',
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOUlgQAAFUANhyb7cwAAAAASUVORK5CYII=',
    );
    expect(imageElement).toHaveAttribute('placeholder', 'blur');
  });

  it('applies default priority value as false if not specified', () => {
    const {} = render(<DynamicImage {...{ ...defaultProps, priority: false }} />);

    const imageElement = screen.getByRole('img');

    expect(imageElement).not.toHaveAttribute('priority');
  });
});
