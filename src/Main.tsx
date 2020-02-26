import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Genko from './Genko';

const GlobalStyle = createGlobalStyle({
  '@font-face': {
    fontFamily: 'mincho',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: 'url("/GenEiKoburiMin6-R.ttf") format("truetype")'
  },
  body: {
    overflow: 'hidden'
  }
});

const Dom = ({ className }: { className?: string }) => (
  <div className={className}>
    <GlobalStyle />
    <Genko />
  </div>
);

const Styled = styled(Dom)({
  background: '#999',
  width: '100%',
  height: '100%',
  paddingTop: '1px',
  margin: 0
});

export default function Main() {
  return <Styled />;
}
