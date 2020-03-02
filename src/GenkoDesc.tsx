import * as React from 'react';
import styled from 'styled-components';

type DomProps = {
  className?: string;
};

const Dom = ({ className }: DomProps) => <div className={className}>20 × 20</div>;

const Styled = styled(Dom)({
  position: 'absolute',
  left: '0',
  bottom: '25px',
  color: '#BC4',
  fontSize: '8px',
  fontFamily: 'roboto'
});

export default function GenkoDesc() {
  return <Styled />;
}
