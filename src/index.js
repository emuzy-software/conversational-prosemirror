import { history } from 'prosemirror-history';
import { Plugin } from 'prosemirror-state';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { menuBar } from 'prosemirror-menu';

import Placeholder from './Placeholder';
import { baseKeyMaps, blocksInputRule, linksInputRules, listInputRules, textFormattingInputRules } from './rules';

import { buildArticleEditorMenu } from './menu/article';
import { buildMessageEditorMenu } from './menu/message';

export { EditorState, Selection } from 'prosemirror-state';
export { EditorView } from 'prosemirror-view';

export { MessageMarkdownTransformer } from './schema/markdown/messageParser';
export { ArticleMarkdownTransformer } from './schema/markdown/articleParser';

export { ArticleMarkdownSerializer } from './schema/markdown/articleSerializer';
export { MessageMarkdownSerializer } from './schema/markdown/messageSerializer';

export { fullSchema } from './schema/article';
export { messageSchema } from './schema/message';

export function omnichannelArticleWriterSetup(props) {
  return [
    history(),
    baseKeyMaps(props.schema),
    blocksInputRule(props.schema),
    textFormattingInputRules(props.schema),
    linksInputRules(props.schema),
    listInputRules(props.schema),
    dropCursor(),
    gapCursor(),
    Placeholder(props.placeholder),
    menuBar({
      floating: true,
      content: buildArticleEditorMenu(props.schema, props.onImageUpload)
        .fullMenu,
    }),
    new Plugin({
      props: {
        attributes: { class: 'ProseMirror-omnichannel-style' },
      },
    }),
    ...(props.plugins || []),
  ];
}

export function omnichannelMessageWriterSetup(props) {
  return [
    ...(props.plugins || []),
    history(),
    baseKeyMaps(props.schema),
    blocksInputRule(props.schema),
    textFormattingInputRules(props.schema),
    linksInputRules(props.schema),
    listInputRules(props.schema),
    dropCursor(),
    gapCursor(),
    Placeholder(props.placeholder),
    menuBar({
      floating: true,
      content: buildMessageEditorMenu(props.schema).fullMenu,
    }),
    new Plugin({
      props: {
        attributes: { class: 'ProseMirror-omnichannel-style' },
      },
    }),
  ];
}
