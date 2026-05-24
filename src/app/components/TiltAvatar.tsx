'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

type Props = {
  src: string;
  alt: string;
  size?: number;
  blurDataURL?: string;
};

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduce(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduce;
}

export default function TiltAvatar({ src, alt, size = 300, blurDataURL }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const image = (
    <Image
      className="rounded-full ring-1 ring-[color-mix(in_srgb,var(--accent),transparent_75%)] border-8 border-surface shadow-xl block mx-auto h-auto"
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
    />
  );

  if (reduceMotion) {
    return <div className="block mx-auto h-auto">{image}</div>;
  }

  return (
    <Tilt
      className="block mx-auto h-auto"
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable={false}
    >
      {image}
    </Tilt>
  );
}
