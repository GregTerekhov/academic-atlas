import {
  MetadataDescription,
  MetadataKeywords,
  MetadataTitle,
  OpenGraphImageAlt,
  OpenGraphImageURL,
  OpenGraphType,
} from '../types';

const OPEN_GRAPH_IMAGE_WIDTH = 1200;
const OPEN_GRAPH_IMAGE_HEIGHT = 630;

export const MetadataTexts = {
  home: {
    title: MetadataTitle.HOME,
    description: MetadataDescription.HOME,
    keywords: MetadataKeywords.HOME,
    openGraph: {
      title: MetadataTitle.HOME,
      description: MetadataDescription.HOME,
      //   url: OpenGraphURL.HOME, //FIXME: uncomment
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
    keywords: MetadataKeywords.FAQ,
    openGraph: {
      title: MetadataTitle.FAQ,
      description: MetadataDescription.FAQ,
      //   url: OpenGraphURL.FAQ, //FIXME: uncomment
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
    keywords: MetadataKeywords.PARTNERSHIP,
    openGraph: {
      title: MetadataTitle.PARTNERSHIP,
      description: MetadataDescription.PARTNERSHIP,
      // url: OpenGraphURL.PARTNERSHIP, //FIXME: uncomment
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
    keywords: MetadataKeywords.POLICY,
    // openGraph: { //FIXME: delete or fix this code
    //   title: MetadataTitle.POLICY,
    //   description: MetadataDescription.POLICY,
    //   //   url: OpenGraphURL.POLICY,
    //   type: OpenGraphType.Article,
    //   images: [
    //     {
    //       //   url: OpenGraphImageURL.POLICY,
    //       width: OPEN_GRAPH_IMAGE_WIDTH,
    //       height: OPEN_GRAPH_IMAGE_HEIGHT,
    //       alt: OpenGraphImageAlt.POLICY,
    //     },
    //   ],
    // },
  },
  notFound: {
    title: MetadataTitle.NOT_FOUND,
    description: MetadataDescription.NOT_FOUND,
    keywords: MetadataKeywords.NOT_FOUND,
    // openGraph: { //FIXME: delete or fix this code
    //   title: MetadataTitle.NOT_FOUND,
    //   description: MetadataDescription.NOT_FOUND,
    //   //   url: OpenGraphURL.NOT_FOUND,
    //   type: OpenGraphType.Article,
    //   images: [
    //     {
    //       //   url: OpenGraphImageURL.NOT_FOUND,
    //       width: OPEN_GRAPH_IMAGE_WIDTH,
    //       height: OPEN_GRAPH_IMAGE_HEIGHT,
    //       alt: OpenGraphImageAlt.NOT_FOUND,
    //     },
    //   ],
    // },
  },
  offer: {
    title: MetadataTitle.OFFER,
    description: MetadataDescription.OFFER,
    keywords: MetadataKeywords.OFFER,
    // openGraph: { //FIXME: delete or fix this code
    //   title: MetadataTitle.OFFER,
    //   description: MetadataDescription.OFFER,
    //   //   url: OpenGraphURL.OFFER,
    //   type: OpenGraphType.Article,
    //   images: [
    //     {
    //       //   url: OpenGraphImageURL.OFFER,
    //       width: OPEN_GRAPH_IMAGE_WIDTH,
    //       height: OPEN_GRAPH_IMAGE_HEIGHT,
    //       alt: OpenGraphImageAlt.OFFER,
    //     },
    //   ],
    // },
  },
};
