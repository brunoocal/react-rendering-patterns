import * as React from 'react';
import Image from 'next/image';
import {TilesProps} from '@interfaces/index';
import Link from 'next/link';

export const Tiles = ({
  src = '/tiles.png',
  title = 'Level up your workspace',
  desc = "Make your desk beautiful and organized. Post a photo to social media and watch it get more likes than life-changing announcements. Endless tasks and limited hours in a bad workspace isn't a problem anymore.",
  button = {
    text: 'Shop Collection',
    link: '/category/Workspace',
  },
  bgColor = 'bg-zinc-900',
  bgOpacity = 'opacity-80',
}: TilesProps) => {
  return (
    <section className="flex h-auto justify-center items-center flex-col mb-20 sm:mb-40 lg:mb-48 relative w-full max-h-[720px] mx-auto">
      <figure className="w-full aspect-[1/2] sm:aspect-square md:aspect-video object-cover relative z-0">
        <Image src={src} layout="fill" className="object-cover" />
      </figure>
      <div className="absolute w-full h-full z-20">
        <div className="flex justify-center items-center w-full h-full flex-col">
          <h1 className="text-center text-5xl sm:text-6xl font-extrabold text-white mb-8">
            {title}
          </h1>
          <p className="text-base sm:px-40 sm:text-lg text-white/80 px-20 lg:px-80 text-center mb-8">
            {desc}
          </p>
          <Link href={button.link} passHref>
            <button
              type="button"
              className="cursor-pointer inline-block text-center bg-white border border-transparent rounded-md py-3 px-8 font-medium text-black"
            >
              {button.text}
            </button>
          </Link>
        </div>
      </div>
      <div className={`absolute w-full h-full z-10 ${bgColor} ${bgOpacity}`} />
    </section>
  );
};
