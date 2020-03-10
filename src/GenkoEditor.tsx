import * as React from 'react';
import styled from 'styled-components';

type Props = {
  initText: string | null;
  onInput: (text: string) => void;
  onResize: (width: number) => void;
};
type DomProps = {
  className?: string;
  domRef: React.RefObject<HTMLDivElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
  onInput: () => void;
};

const Dom = ({
  className,
  domRef,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  onInput
}: DomProps) => (
  <div
    className={className}
    ref={domRef}
    contentEditable
    onKeyDown={onKeyDown}
    onCompositionStart={onCompositionStart}
    onCompositionEnd={onCompositionEnd}
    onInput={onInput}
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

  const setText = () => {
    if (!domRef.current) return;
    let text: string[] = [''];
    for (let i = 0; i < domRef.current.childNodes.length; i += 1) {
      const child = domRef.current.childNodes.item(i);
      if (child.nodeName === 'BR') {
        text.push('');
      } else {
        text[text.length - 1] += child.textContent || '';
      }
    }
    onResize(domRef.current.clientWidth);
    onInput(text.join('\n'));
  };
  const setNewLine = () => {
    if (inComposition) return;
    const s = window.getSelection();
    if (!s) return;
    const target = domRef.current;
    if (!target) return;

    s.deleteFromDocument();
    const r = s.getRangeAt(0);
    if (target.lastChild?.nodeName !== 'BR') {
      target.append(document.createElement('br'));
    }
    const br = document.createElement('br');
    r.insertNode(br);
    r.setStartAfter(br);
    r.setEndAfter(br);
    r.collapse(false);
    s.removeAllRanges();
    s.addRange(r);
    setText();
  };
  const moveCursor = (key: string) => {
    const s = window.getSelection();
    const anchor = s?.anchorNode;
    if (s && anchor) {
      const r = s.getRangeAt(0);
      let node = anchor;
      let offset = s.anchorOffset;
      if (key === 'ArrowUp') {
        if (offset > 0) {
          offset -= 1;
        } else {
          node = anchor.previousSibling || anchor;
          if (node !== anchor) offset = node.textContent?.length || 0;
        }
      } else if (key === 'ArrowDown') {
        const length = node.textContent?.length || 0;
        if (offset < length) {
          offset += 1;
        } else {
          node = anchor.nextSibling || anchor;
          if (node !== anchor) offset = 0;
        }
      } else if (key === 'ArrowLeft') {
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
  };

  return (
    <Styled
      domRef={domRef}
      onInput={setText}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          setNewLine();
          e.preventDefault();
        } else if (e.key.substring(0, 5) === 'Arrow') {
          moveCursor(e.key);
          e.preventDefault();
        }
      }}
      onCompositionStart={() => setInComposition(true)}
      onCompositionEnd={() => setInComposition(false)}
    />
  );
}
