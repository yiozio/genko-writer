import * as React from 'react';
import styled, { CSSObject } from 'styled-components';
import { Editor, EditorState } from 'draft-js';

import GenkoCount from './GenkoCount';
import GenkoDesc from './GenkoDesc';

type DomProps = {
  className?: string;
  pageCount: number;
  state: EditorState;
  setState: (state: EditorState) => void;
  setEditorWidth: (width: number) => void;
};

const Dom = ({ className, pageCount, state, setState, setEditorWidth }: DomProps) => (
  <div className={className}>
    <div>
      {Array.from(Array(Math.max(2, pageCount))).map((_, i) => (
        <div key={i}>
          {i % 2 === 0 ? (
            <GenkoCount>
              {Math.floor(i / 2 + 1) + ' / ' + Math.floor(pageCount / 2 + 0.5)}
            </GenkoCount>
          ) : (
            <GenkoDesc />
          )}
          {Array.from(Array(10)).map((_, j) => (
            <div key={j}>
              {Array.from(Array(19)).map((_, k) => (
                <div key={k} />
              ))}
            </div>
          ))}
        </div>
      ))}
      <Editor
        ref={ref => (ref ? setEditorWidth((ref as any).editorContainer.clientWidth) : undefined)}
        editorState={state}
        onChange={setState}
      />
    </div>
  </div>
);

const squaresRow: CSSObject = {
  width: 23,
  height: '100%',
  marginRight: 9,
  borderLeft: 'solid 1px #BC4',
  borderRight: 'solid 1px #BC4',

  '&:last-child': {
    borderLeft: 'none'
  },
  '& > div': {
    width: '100%',
    height: 23,
    borderBottom: 'solid 1px #BC4'
  }
};
const squaresInput: CSSObject = {
  writingMode: 'vertical-rl',
  fontSize: 23,
  lineHeight: '34px',
  letterSpacing: 1,
  color: '#000',
  fontFamily: ['hankaku', 'zenkaku'].join(','),
  position: 'absolute',
  right: 6,
  top: 43,
  height: 481,
  '&:focus, &:active': {
    boxShadow: 'none',
    border: 'none',
    outline: 'none'
  }
};
const squares: CSSObject = {
  position: 'relative',
  height: 'calc(100% - 86px)',
  padding: '42px 0',
  display: 'flex',
  flexFlow: 'row-reverse nowrap',
  background: '#FFE',
  overflowX: 'scroll',
  overflowY: 'hidden',

  '& > div:not(:last-child)': {
    position: 'relative',
    height: '100%',
    border: 'solid 1px #BC4',
    borderLeft: 'solid 1px #000',
    borderRight: 'none',
    display: 'flex',
    flexFlow: 'row-reverse nowrap',

    '&:first-child': {
      borderRight: 'solid 1px #BC4'
    },
    '& > div:not(:first-child)': squaresRow
  },
  '& > div:last-child': squaresInput
};

const Styled = styled(Dom)({
  background: '#FFE',
  height: 565,
  margin: '20px auto',
  position: 'relative',
  '& > div': squares
});

export default function Genko() {
  const [state, setState] = React.useState(EditorState.createEmpty());
  const [width, setWidth] = React.useState(0);

  return (
    <Styled
      pageCount={Math.ceil(width / 340)}
      state={state}
      setState={setState}
      setEditorWidth={setWidth}
    />
  );
}
