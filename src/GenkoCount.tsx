import * as React from 'react';
import styled from 'styled-components';

type Props = {
  children: string;
};

type DomProps = Props & {
  className?: string;
};

const Dom = ({ className, children }: DomProps) => (
  <div className={className}>
    No. <span>{children}</span>
  </div>
);

const Styled = styled(Dom)({
  position: 'absolute',
  right: '0',
  top: '-16px',
  color: '#BC4',
  fontSize: '8px',
  fontFamily: 'sans-serif',
  '& > span': {
    color: '#000',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '10px',
    width: '26px',
    borderBottom: 'solid 1px #BC4'
  }
});

export default function GenkoCount({ children }: Props) {
  return <Styled>{children}</Styled>;
}
