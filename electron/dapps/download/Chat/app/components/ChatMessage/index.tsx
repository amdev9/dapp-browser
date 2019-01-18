import * as React from 'react';
const parse = require('html-react-parser');

import { IpfsLink } from '../MessageComponents';

interface IProps {
  message: string;
}

interface MessageTag {
  tagName: string;
  component: any;
}

const tagsList: MessageTag[] = [
  {
    tagName: 'ipfslink',
    component: IpfsLink,
  },
];

const htmlReactParser: any = parse;

export default class ChatMessage extends React.Component<IProps> {
  tagTransform(node: any) {
    if (node.type === 'tag') {
      const foundTag = tagsList.find((tag) => tag.tagName === node.name);

      if (foundTag) {
        return React.createElement(foundTag.component, { ...node.attribs }, node.children);
      }
      return node;
    }
  }

  render() {
    const { message } = this.props;
    console.log('component', message);

    return (
      <div>
        {htmlReactParser(message, {
          replace: (node: any) => {
            return this.tagTransform(node);
          },
        })}
      </div>
    );
  }
}
