'use client';

import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

type Props = {
  src: string;
  alt: string;
  size?: number;
};

export default function TiltAvatar({ src, alt, size = 300 }: Props) {
  return (
    <Tilt
      className="block mx-auto h-auto"
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable={false}
    >
      <Image
        className="rounded-full border-8 border-[#f8f9fa] shadow-xl block mx-auto h-auto"
        src={src}
        alt={alt}
        width={size}
        height={size}
        priority
      />
    </Tilt>
  );
}
