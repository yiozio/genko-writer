import * as React from 'react';
import styled from 'styled-components';

type Props = {
  initText: string | null;
  onInput: (text: string) => void;
  onResize: (width: number) => void;
};
type DomProps = Props & {
  className?: string;
  domRef: React.RefObject<HTMLDivElement>;
};

const Dom = ({ className, domRef, onInput, onResize }: DomProps) => (
  <div
    className={className}
    ref={domRef}
    contentEditable
    onInput={e => {
      let text: string[] = [];
      for (let i = 0; i < e.currentTarget.childNodes.length; i += 1) {
        const child = e.currentTarget.childNodes.item(i);
        text.push(child.textContent || '');
      }
      onResize(e.currentTarget.clientWidth);
      onInput(text.join('\n'));
    }}
  />
);

const Styled = styled(Dom)({
  writingMode: 'vertical-rl',
  fontSize: 23,
  lineHeight: '34px',
  letterSpacing: 1,
  color: '#000',
  fontFamily: 'mincho',
  '&:focus, &:active': {
    boxShadow: 'none',
    border: 'none',
    outline: 'none'
  }
});

export default function GenkoEditor({ initText, onInput, onResize }: Props) {
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (domRef && domRef.current)
      domRef.current.innerHTML =
        initText
          ?.split('\n')
          ?.map(t => `<div>${t || '<br>'}</div>`)
          .join('') || '';
  }, []);

  return <Styled domRef={domRef} initText={initText} onInput={onInput} onResize={onResize} />;
}
