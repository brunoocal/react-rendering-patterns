import * as React from 'react';
import Link from 'next/link';
import {DecorativeImage} from './DecorativeImage';

const List = [
  {
    name: 'Work from home accesories',
    category: 'Desk and office',
    src: '/home.png',
  },
  {
    name: 'Journals and self-improving',
    category: 'Self-Improvement',
    src: '/journals.png',
  },
  {
    name: 'Daily commute essentials',
    category: 'Travel',
    src: '/travel.png',
  },
];

export const WorkspaceCollections = () => {
  return (
    <>
      <section className="flex justify-center items-center flex-col pb-20 sm:pb-40 lg:pb-48 relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex-row flex-col flex justify-between items-center h-8 w-full mb-2">
          <h2 className="text-xl md:text-3xl text-black font-bold">
            Home & Focus collections
          </h2>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 grid-rows-1 w-full">
          {List.map(({src, category, name}, i) => (
            <Link href="/">
              <a
                className={`${i == 2 &&
                  'hidden sm:flex'} flex mt-6 flex-col justify-center items-center w-full h-full relative z-10`}
              >
                <DecorativeImage
                  src={src}
                  className="w-[320px] sm:w-full rounded overflow-hidden aspect-square"
                />
                <div className="flex flex-col justify-center items-center sm:items-start pt-4 w-full relative z-20">
                  <span className="text-sm text-gray-600">{category}</span>
                  <span className="text-base text-black font-semibold">
                    {name}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </section>
      </section>
    </>
  );
};
