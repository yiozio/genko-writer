import * as React from 'react';
import styled, { CSSObject } from 'styled-components';

import GenkoCount from './GenkoCount';
import GenkoDesc from './GenkoDesc';
import GenkoEditor from './GenkoEditor';

type DomProps = {
  className?: string;
  pageCount: number;
  initText: string | null;
  onInput: (text: string) => void;
  onResizeEditor: (width: number) => void;
};

const Dom = ({ className, pageCount, initText, onInput, onResizeEditor }: DomProps) => (
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
          <div>
            {Array.from(Array(10)).map((_, j) => (
              <div key={j}>
                {Array.from(Array(20)).map((_, k) => (
                  <div key={k} />
                ))}
              </div>
            ))}
          </div>
          {i === 0 ? (
            <GenkoEditor initText={initText} onInput={onInput} onResize={onResizeEditor} />
          ) : (
            undefined
          )}
        </div>
      ))}
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
    borderBottom: 'solid 1px #BC4',
    '&:last-child': {
      borderBottom: 'none'
    }
  }
};
const squaresInput: CSSObject = {
  position: 'absolute',
  right: 54,
  top: 43,
  height: 481,
  zIndex: 1
};
const squares: CSSObject = {
  height: '100%',
  display: 'flex',
  flexFlow: 'row-reverse nowrap',
  overflowX: 'scroll',
  overflowY: 'hidden',

  '& > div': {
    position: 'relative',
    height: 'calc(100% - 84px)',
    paddingTop: 42,
    paddingBottom: 42,
    background: '#FFE',

    '&:first-child': {
      paddingRight: '48px',
      '& > div:first-child': {
        right: 48
      }
    },
    '&:last-child': {
      paddingLeft: '48px',
      '& > div:first-child': {
        left: 48
      }
    },
    '& > div:nth-child(2)': {
      border: 'solid 1px #BC4',
      borderLeft: 'solid 1px #000',
      borderRight: 'none',
      display: 'flex',
      flexFlow: 'row-reverse nowrap',

      '& > div': squaresRow
    },
    '&:first-child > div:nth-child(2)': {
      borderRight: 'solid 1px #BC4'
    },
    '&:nth-child(2n+1) > div:nth-child(2)': {
      borderLeftStyle: 'dashed'
    },
    '& > div:nth-child(3)': squaresInput
  }
};

const Styled = styled(Dom)({
  height: 565,
  margin: '20px auto',
  '& > div': squares
});

export default function Genko() {
  const [width, setWidth] = React.useState(0);

  return (
    <Styled
      pageCount={Math.ceil(width / (340 * 2)) * 2}
      initText={sessionStorage.getItem('text')}
      onInput={text => sessionStorage.setItem('text', text)}
      onResizeEditor={setWidth}
    />
  );
}
