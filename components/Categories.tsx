import * as React from 'react';
import Link from 'next/link';
import {ArrowRightIcon} from '@heroicons/react/solid';
import {DecorativeImage} from './DecorativeImage';
import {Category, Categories as ECategories} from '@interfaces/Products';

const parseLading = (s: string): string => {
  //replace white space
  return `/${s
    .split(' ')
    .join('')
    .toLowerCase()}-category.png`;
};

const List: Category[] = [
  {
    name: ECategories.NewArrivals,
    landing: parseLading(ECategories.NewArrivals),
    big: true,
  },
  {
    name: ECategories.Accesories,
    landing: parseLading(ECategories.Accesories),
  },
  {
    name: ECategories.Workspace,
    landing: parseLading(ECategories.Workspace),
  },
];

export const Categories = () => {
  return (
    <>
      <section className="flex justify-center items-center flex-col pt-8 pb-20 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex-row flex-col flex justify-between items-center h-8 w-full mb-12 sm:mb-8">
          <h2 className="text-xl md:text-3xl text-black font-bold">
            Shop by Category
          </h2>
          <span className="text-indigo-600 text-sm font-semibold flex justify-center items-center pr-2">
            Browse all categories <ArrowRightIcon className="ml-2 h-5 w-5" />
          </span>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 grid-rows-2 w-full">
          {List.map(({landing, name, big}, i) => {
            return (
              <Link passHref key={i} href={`/category/${name}`}>
                <a
                  className={`${
                    big
                      ? 'row-span-2 max-h-[595px] w-full h-full'
                      : 'row-span-1 max-h-[293px]'
                  } relative col-span-1 flex w-full`}
                >
                  <DecorativeImage
                    src={landing}
                    className="w-full h-full rounded-lg overflow-hidden relative z-0"
                  />
                  <h4 className="text-white absolute text-lg font-semibold bottom-14 left-8 z-20">
                    {name}
                  </h4>
                  <span className="text-white absolute text-sm font-light bottom-8 left-8 z-20">
                    Shop now
                  </span>
                  <div
                    // className={`absolute rounded-lg overflow-hidden w-full h-full z-10 max-w-[590px] ${
                    //   big ? 'max-h-[575px]' : 'max-h-[277px]'
                    // }`}
                    className={`absolute rounded-lg overflow-hidden w-full h-full z-10`}
                  >
                    <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black transition-opacity ease-in hover:opacity-60 opacity-50" />
                  </div>
                </a>
              </Link>
            );
          })}
        </section>
      </section>
    </>
  );
};
