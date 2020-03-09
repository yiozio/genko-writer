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
  inComposition: boolean;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
};

const Dom = ({
  className,
  domRef,
  onInput,
  onResize,
  inComposition,
  onCompositionStart,
  onCompositionEnd
}: DomProps) => (
  <div
    className={className}
    ref={domRef}
    contentEditable
    onKeyDown={e => {
      if (e.key !== 'Enter' || inComposition) return;
      const s = window.getSelection();
      if (s) {
        s.deleteFromDocument();
        const r = s.getRangeAt(0);
        if (e.currentTarget.lastChild?.nodeName !== 'BR') {
          e.currentTarget.append(document.createElement('br'));
        }
        const br = document.createElement('br');
        r.insertNode(br);
        r.setStartAfter(br);
        r.setEndAfter(br);
        r.collapse(false);
        s.removeAllRanges();
        s.addRange(r);
      }
      e.preventDefault();
    }}
    onCompositionStart={onCompositionStart}
    onCompositionEnd={onCompositionEnd}
    onInput={e => {
      let text: string[] = [''];
      for (let i = 0; i < e.currentTarget.childNodes.length; i += 1) {
        const child = e.currentTarget.childNodes.item(i);
        if (child.nodeName === 'BR') {
          text.push('');
        } else {
          text[text.length - 1] += child.textContent || '';
        }
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
  fontFamily:
    '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
  '&:focus, &:active': {
    boxShadow: 'none',
    border: 'none',
    outline: 'none'
  }
});

export default function GenkoEditor({ initText, onInput, onResize }: Props) {
  const domRef = React.useRef<HTMLDivElement>(null);
  const [inComposition, setInComposition] = React.useState(false);

  React.useEffect(() => {
    if (domRef.current) {
      domRef.current.innerHTML =
        initText
          ?.split('\n')
          ?.map(t => `${t || ''}<br>`)
          .join('') || '';
      onResize(domRef.current.clientWidth);
    }
  }, []);

  return (
    <Styled
      domRef={domRef}
      initText={initText}
      onInput={onInput}
      onResize={onResize}
      inComposition={inComposition}
      onCompositionStart={() => setInComposition(true)}
      onCompositionEnd={() => setInComposition(false)}
    />
  );
}
