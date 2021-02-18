import { SharpImage, ContentfulRichText } from './gatsby'

export interface AllContentfulRecipes {
  allContentfulRecipe: {
    edges: Array<RecipeEdge>;
  };
}

export interface ContentfulRecipe {
  contentfulRecipe: Recipe;
}

export interface RecipeEdge {
  node: Recipe;
}

export interface Recipe {
  id: string;
  node_locale: string;
  publishDate: string;
  slug: string;
  title: string;
  ingredients: ContentfulRichText;
  steps: Array<Step>;
  heroImage?: SharpImage;
}

export interface Step {
  title: string;
  stepNumber: number;
  text: ContentfulRichText;
}
