import * as React from 'react';
import Link from 'next/link';
import {ArrowRightIcon} from '@heroicons/react/solid';
import {DecorativeImage} from './DecorativeImage';
import {Currencies, price as priceFn} from '@interfaces/Currency';

const capitalize = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

const List = [
  {
    colors: [
      {
        name: 'black',
        hex: '#000000',
      },
      {
        name: 'gold',
        hex: '#e9d69d',
      },
      {
        name: 'silver',
        hex: '#c0c0c0',
      },
    ],
    name: 'Machined Pen',
    price: priceFn(20, 'UYU'),
    src: '/pencil.png',
  },
  {
    colors: [
      {
        name: 'matte black',
        hex: '#353132',
      },
      {
        name: 'porcenlain',
        hex: '#b8a086',
      },
    ],
    name: 'Earthen Mug',
    price: priceFn(18, 'UYU'),
    src: '/mug.png',
  },
  {
    colors: [
      {
        name: 'natural',
        hex: '#ecc19e',
      },
      {
        name: 'black',
        hex: '#000000',
      },
      {
        name: 'brown',
        hex: '#884941',
      },
    ],
    name: 'Journal Bundle',
    price: priceFn(90, 'UYU'),
    src: '/journal-bundle.png',
  },
  {
    colors: [
      {
        name: 'black',
        hex: '#000000',
      },
      {
        name: 'natural',
        hex: '#ecc19e',
      },
      {
        name: 'brown',
        hex: '#884941',
      },
    ],
    name: 'Journal',
    price: priceFn(30, 'UYU'),
    src: '/journal.png',
  },
];

export const WorkspaceFavorites = () => {
  return (
    <>
      <section className="flex justify-center items-center flex-col pb-20 sm:pb-40 lg:pb-48 relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex-row flex-col flex justify-between items-center h-8 w-full md:mb-2 lg:mb-8">
          <h2 className="text-xl md:text-3xl text-black font-bold">
            Bring the most productivity
          </h2>
          <span className="text-indigo-600 text-sm font-semibold flex justify-center items-center pr-2">
            Browse all products <ArrowRightIcon className="ml-2 h-5 w-5" />
          </span>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 grid-rows-1 w-full">
          {List.map(({colors, name, price, src}, i) => (
            <Link href="/">
              <a
                className={`${(i == 1 || i == 2) &&
                  'hidden sm:flex'} flex mt-6 lg:mt-0 flex-col justify-center items-center w-full h-full relative z-10`}
              >
                <DecorativeImage
                  src={src}
                  className="w-[320px] sm:w-full rounded overflow-hidden aspect-squere"
                />
                <div className="flex flex-col justify-center items-center pt-4 w-full relative z-20">
                  <span className="text-sm text-slate-500">
                    {capitalize(colors[0].name)}
                  </span>
                  <span className="text-base text-black font-semibold mb-1">
                    {name}
                  </span>
                  <span className="text-sm text-slate-800 font-medium">
                    {Currencies.UYU} {price}
                  </span>
                  <div className="mt-4 flex justify-center items-center">
                    {colors.map(({name, hex}) => (
                      <span
                        key={name}
                        style={{
                          background: hex,
                        }}
                        className={`inline-block bg-white rounded-full h-4 w-4 mr-2`}
                      />
                    ))}
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </section>
      </section>
    </>
  );
};
