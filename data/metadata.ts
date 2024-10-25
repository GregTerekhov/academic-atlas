import {
  MetadataDescription,
  MetadataTitle,
  OpenGraphImageAlt,
  OpenGraphImageURL,
  OpenGraphType,
  OpenGraphURL,
} from '../types';

const OPEN_GRAPH_IMAGE_WIDTH = 1200;
const OPEN_GRAPH_IMAGE_HEIGHT = 630;
const DEFAULT_IMAGE = OpenGraphImageURL.HOME;

export const MetadataTexts = {
  home: {
    title: MetadataTitle.HOME,
    description: MetadataDescription.HOME,
    canonicalUrl: OpenGraphURL.HOME,
    openGraph: {
      title: MetadataTitle.HOME,
      description: MetadataDescription.HOME,
      url: OpenGraphURL.HOME,
      type: OpenGraphType.Website,
      images: [
        {
          url: OpenGraphImageURL.HOME,
          width: OPEN_GRAPH_IMAGE_WIDTH,
          height: OPEN_GRAPH_IMAGE_HEIGHT,
          alt: OpenGraphImageAlt.HOME,
        },
      ],
    },
  },
  faq: {
    title: MetadataTitle.FAQ,
    description: MetadataDescription.FAQ,
    canonicalUrl: OpenGraphURL.FAQ,
    openGraph: {
      title: MetadataTitle.FAQ,
      description: MetadataDescription.FAQ,
      url: OpenGraphURL.FAQ,
      type: OpenGraphType.Article,
      images: [
        {
          url: OpenGraphImageURL.FAQ,
          width: OPEN_GRAPH_IMAGE_WIDTH,
          height: OPEN_GRAPH_IMAGE_HEIGHT,
          alt: OpenGraphImageAlt.FAQ,
        },
      ],
    },
  },
  partnership: {
    title: MetadataTitle.PARTNERSHIP,
    description: MetadataDescription.PARTNERSHIP,
    canonicalUrl: OpenGraphURL.PARTNERSHIP,
    openGraph: {
      title: MetadataTitle.PARTNERSHIP,
      description: MetadataDescription.PARTNERSHIP,
      url: OpenGraphURL.PARTNERSHIP,
      type: OpenGraphType.Article,
      images: [
        {
          url: OpenGraphImageURL.PARTNERSHIP,
          width: OPEN_GRAPH_IMAGE_WIDTH,
          height: OPEN_GRAPH_IMAGE_HEIGHT,
          alt: OpenGraphImageAlt.PARTNERSHIP,
        },
      ],
    },
  },
  legal: {
    title: MetadataTitle.POLICY,
    description: MetadataDescription.POLICY,
    canonicalUrl: OpenGraphURL.POLICY,
    openGraph: {
      title: MetadataTitle.POLICY,
      description: MetadataDescription.POLICY,
      url: OpenGraphURL.POLICY,
      type: OpenGraphType.Article,
      images: [
        {
          url: DEFAULT_IMAGE,
          width: OPEN_GRAPH_IMAGE_WIDTH,
          height: OPEN_GRAPH_IMAGE_HEIGHT,
          alt: OpenGraphImageAlt.POLICY,
        },
      ],
    },
  },
  notFound: {
    title: MetadataTitle.NOT_FOUND,
    description: MetadataDescription.NOT_FOUND,
    openGraph: {
      title: MetadataTitle.NOT_FOUND,
      description: MetadataDescription.NOT_FOUND,
      url: OpenGraphURL.NOT_FOUND,
      type: OpenGraphType.Article,
      images: [
        {
          url: DEFAULT_IMAGE,
          width: OPEN_GRAPH_IMAGE_WIDTH,
          height: OPEN_GRAPH_IMAGE_HEIGHT,
          alt: OpenGraphImageAlt.NOT_FOUND,
        },
      ],
    },
  },
  offer: {
    title: MetadataTitle.OFFER,
    description: MetadataDescription.OFFER,
    canonicalUrl: OpenGraphURL.OFFER,
    openGraph: {
      title: MetadataTitle.OFFER,
      description: MetadataDescription.OFFER,
      url: OpenGraphURL.OFFER,
      type: OpenGraphType.Article,
      images: [
        {
          url: DEFAULT_IMAGE,
          width: OPEN_GRAPH_IMAGE_WIDTH,
          height: OPEN_GRAPH_IMAGE_HEIGHT,
          alt: OpenGraphImageAlt.OFFER,
        },
      ],
    },
  },
};
