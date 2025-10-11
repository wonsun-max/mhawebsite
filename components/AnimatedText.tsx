// FILE: components/AnimatedText.tsx
'use client'
import { useEffect, useState } from 'react';

type Props = { words: string[]; speed?: number; className?: string };

export default function AnimatedText({ words, speed = 120, className = '' }: Props) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    // typing/deleting loop
    const interval = setInterval(() => {
      if (forward) {
        if (subIndex < words[index].length) setSubIndex(s => s + 1);
        else setForward(false);
      } else {
        if (subIndex > 0) setSubIndex(s => s - 1);
        else {
          setForward(true);
          setIndex(i => (i + 1) % words.length);
        }
      }
    }, speed);
    return () => clearInterval(interval);
  }, [index, subIndex, forward, words, speed]);

  return (
    <span className={`inline-block ${className}`}>
      <span className="mr-2">{words[index].slice(0, subIndex)}</span>
      <span className="inline-block w-1 h-6 align-middle bg-white/90 animate-pulse" />
    </span>
  );
}
