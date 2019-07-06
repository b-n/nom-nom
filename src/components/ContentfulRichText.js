import React from 'react';
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const options = {
  renderMark: {},
  renderNode: {},
}

const ContentfulRichText = ({node}) => {
  return documentToReactComponents(node.json, options)
}

export default ContentfulRichText
