import * as React from 'react';
import Link from 'next/link';
import {ArrowRightIcon} from '@heroicons/react/solid';
import {DecorativeImage} from './DecorativeImage';
import {Currencies, price as priceFn} from '@interfaces/Currency';

const List = Array(3)
  .fill(0)
  .map((_, i) => ({
    src: `/favorite-${i + 1}.jpg`,
    price: priceFn(i == 2 ? 39.99 : 16.99, 'UYU'),
    name: `${i == 0 ? 'Black Basic' : ''}${i == 1 ? 'Green Tea Basic' : ''}${
      i == 2 ? 'Mandaria Basic' : ''
    } Tee`,
  }));

export const ClothingFavorites = () => {
  return (
    <>
      <section className="flex justify-center items-center flex-col pb-20 sm:pb-40 lg:pb-48 relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex-row flex-col flex justify-between items-center h-8 w-full mb-4 sm:mb-8">
          <h2 className="text-xl md:text-3xl text-black font-bold">
            Get to know our favorite items
          </h2>
          <span className="text-indigo-600 text-sm font-semibold flex justify-center items-center pr-2">
            Browse all categories <ArrowRightIcon className="ml-2 h-5 w-5" />
          </span>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 grid-rows-1 w-full">
          {List.map(({src, price, name}, i) => (
            <Link href="/">
              <a
                className={`${i == 2 &&
                  'hidden sm:flex'} flex mt-8 flex-col justify-center items-center w-full h-full relative z-10`}
              >
                <DecorativeImage
                  src={src}
                  className="w-[320px] sm:w-full rounded overflow-hidden aspect-[1/1.4]"
                />
                <div className="flex flex-col justify-center items-center sm:items-start pt-4 w-full relative z-20">
                  <span className="text-base text-black font-semibold">
                    {name}
                  </span>
                  <span className="text-sm text-indigo-600 font-semibold">
                    {Currencies.UYU} {price}
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
