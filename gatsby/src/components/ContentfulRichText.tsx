import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

import { ContentfulRichText as CRT } from '../interfaces/gatsby'

const options = {
  renderMark: {},
  renderNode: {},
}

const ContentfulRichText = (doc: CRT): React.ReactNode => {
  return renderRichText(doc as any, options)
}

export default ContentfulRichText
