declare var ContentfulRichText: import('@contentful/rich-text-types')

interface IAllContentfulMeals {
  allContentfulMeal: {
    edges: Array<{ node: IMeal }>
  }
}

interface IContentfulMeal {
  contentfulMeal: IMeal
}

interface IMeal {
  node_locale: string
  publishDate: string
  slug: string
  title: string
  recipes: Array<IRecipe>
  updatedAt: string
  description: IContentfulRichText
  shortDescription: IContentfulMarkdown
  heroImage: IGatsbyPluginSharp
}

interface IRecipe {
  id: string
  title: string
  instructions: ContentfulRichText.Document
  ingredients: ContentfulRichText.Document
}

interface IContentfulRichText {
  json: ContentfulRichText.Document
}

interface IContentfulMarkdown {
  childMarkdownRemark: {
    html: string
  }
}
