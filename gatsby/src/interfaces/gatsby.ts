import { FixedObject, FluidObject } from 'gatsby-image'

export interface GatsbyLocation {
  href: string;
  hostname: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
}

export interface SharpImage {
  fixed?: FixedObject;
  fluid?: FluidObject;
}

export interface ContentfulRichText {
  raw: string;
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
