import { Document } from '@contentful/rich-text-types';

export interface GatsbyLocation {
  href: string;
  hostname: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
}

export interface SharpImage {
  resolutions?: SharpAttributes;
  fixed?: SharpAttributes;
  fluid?: SharpAttributes;
  resize?: SharpAttributes;
}

export interface SharpAttributes {
  base64: string;
  aspectRatio: number;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

export interface ContentfulRichText {
  json: Document;
}

export interface ContentfulMarkdown {
  childMarkdownRemark: {
    html: string;
  };
}

interface PageInput {
  path: string;
  component: string;
  layout?: string;
  context?: any;
}

export type CreatePage = (page: PageInput) => void

export interface BoundActionCreators {
  createPage: CreatePage;
  deletePage: (page: PageInput) => void;
  createRedirect: (
    opts: {
      fromPath: string;
      isPermanent?: boolean;
      redirectInBrowser?: boolean;
      toPath: string;
    }
  ) => void;
}

export type GraphQL = any;

export type GatsbyCreatePages = (
  fns: { graphql: GraphQL; boundActionCreators: BoundActionCreators }
) => Promise<any>;
