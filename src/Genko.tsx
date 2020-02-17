import * as React from 'react';
import styled, { CSSObject } from 'styled-components';

type DomProps = {
  className?: string;
};

const Dom = ({ className }: DomProps) => (
  <div className={className}>
    <div>
      No. <span>1</span>
    </div>
    <div>
      {Array.from(Array(2)).map((_, i) => (
        <div key={i}>
          {Array.from(Array(10)).map((_, j) => (
            <div key={j}>
              {Array.from(Array(19)).map((_, k) => (
                <div key={k} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
    <div>20 × 20</div>
  </div>
);

const pageCount: CSSObject = {
  position: 'absolute',
  right: '52px',
  top: '28px',
  color: '#BC4',
  fontSize: '8px',
  fontFamily: 'sans-serif',
  '& > span': {
    color: '#000',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '10px',
    width: '20px',
    borderBottom: 'solid 1px #BC4'
  }
};
const pageDesc: CSSObject = {
  position: 'absolute',
  left: '52px',
  bottom: '28px',
  color: '#BC4',
  fontSize: '8px',
  fontFamily: 'sans-serif'
};
const gyobi: CSSObject = {
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '6px',
    height: '6px',
    top: '20%',
    left: 'calc(50% - 3px)',
    borderRadius: '50%',
    background: '#BC4'
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '6px',
    height: '6px',
    bottom: '20%',
    left: 'calc(50% - 3px)',
    borderRadius: '50%',
    background: '#BC4'
  }
};
const squaresRow: CSSObject = {
  width: 23,
  height: '100%',
  marginRight: 9,
  borderLeft: 'solid 1px #BC4',
  borderRight: 'solid 1px #BC4',

  '&:first-child': {
    borderLeft: 'none'
  },
  '& > div': {
    width: '100%',
    height: 23,
    borderBottom: 'solid 1px #BC4'
  }
};
const squares: CSSObject = {
  position: 'relative',
  width: '100%',
  height: '100%',
  border: 'solid 1px #BC4',
  boxSizing: 'border-box',
  ...gyobi,

  '& > div': {
    position: 'absolute',
    top: 0,
    height: '100%',
    display: 'flex',
    left: 'auto',
    right: 0,
    borderLeft: 'solid 1px #BC4',
    borderRight: 'none',

    '&:last-child': {
      left: 0,
      right: 'auto',
      borderLeft: 'none',
      borderRight: 'solid 1px #BC4'
    },
    '& > div': squaresRow
  }
};

const Styled = styled(Dom)({
  background: '#FFE',
  width: 704,
  height: 481,
  margin: '20px auto',
  padding: '42px 48px',
  position: 'relative',
  '& > div:nth-child(1)': pageCount,
  '& > div:nth-child(2)': squares,
  '& > div:nth-child(3)': pageDesc
});

export default function Genko() {
  return <Styled />;
}
