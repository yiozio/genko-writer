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
      if (e.key === 'Enter') {
        if (inComposition) return;
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
        }
        e.preventDefault();
      } else if (e.key.substring(0, 5) === 'Arrow') {
        const s = window.getSelection();
        const anchor = s?.anchorNode;
        if (s && anchor) {
          const r = s.getRangeAt(0);
          let node = anchor;
          let offset = s.anchorOffset;
          if (e.key === 'ArrowUp') {
            if (offset > 0) {
              offset -= 1;
            } else {
              node = anchor.previousSibling || anchor;
              if (node !== anchor) offset = node.textContent?.length || 0;
            }
          } else if (e.key === 'ArrowDown') {
            const length = node.textContent?.length || 0;
            if (offset < length) {
              offset += 1;
            } else {
              node = anchor.nextSibling || anchor;
              if (node !== anchor) offset = 0;
            }
          } else if (e.key === 'ArrowLeft') {
            node = anchor.nextSibling || anchor;
            offset = node !== anchor ? 0 : node.textContent?.length || 0;
          } else {
            node = anchor.previousSibling || anchor;
            offset = 0;
          }
          r.setStart(node, offset);
          r.setEnd(node, offset);
          s.removeAllRanges();
          s.addRange(r);
        }
        e.preventDefault();
      }
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
  fontFamily: 'mincho',
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
