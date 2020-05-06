import { Document } from '@contentful/rich-text-types';
import { SharpImage } from './gatsby';

export interface AllContentfulMeals {
  allContentfulMeal: {
    edges: Array<{ node: Meal }>;
  };
}

export interface ContentfulMeal {
  contentfulMeal: Meal;
}

export interface MealEdge {
  node: Meal
}

export interface Meal {
  id: string;
  node_locale: string;
  publishDate: string;
  slug: string;
  title: string;
  recipes: Array<Recipe>;
  updatedAt: string;
  description: ContentfulRichText;
  shortDescription: ContentfulMarkdown;
  heroImage: SharpImage;
}

export interface Recipe {
  id: string;
  title: string;
  instructions: ContentfulRichText;
  ingredients: ContentfulRichText;
}

export interface ContentfulRichText {
  json: Document;
}

export interface ContentfulMarkdown {
  childMarkdownRemark: {
    html: string;
  };
}
