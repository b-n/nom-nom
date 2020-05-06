import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

const options = {
  renderMark: {},
  renderNode: {},
};

const ContentfulRichText = (doc: Document) => {
  return documentToReactComponents(doc, options);
};

export default ContentfulRichText;
