import * as React from 'react';
import Link from 'next/link';
import {ArrowRightIcon} from '@heroicons/react/solid';
import {DecorativeImage} from './DecorativeImage';
import {Currencies, price as priceFn} from '@interfaces/Currency';
import {Categories} from '@interfaces/Products';
import {CurrencyContext} from '@utils/CurrencyContext';
const capitalize = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

export const WorkspaceFavorites = () => {
  const [List, setList] = React.useState([]);
  const [currency] = React.useContext(CurrencyContext);

  React.useEffect(() => {
    fetch('/api/products/favorites?category=' + Categories.Workspace)
      .then(res => res.json())
      .then(data => setList(data.favorites));
  }, []);

  return (
    <>
      <section className="flex justify-center items-center flex-col pb-20 sm:pb-40 lg:pb-48 relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex-row flex-col flex justify-between items-center h-8 w-full md:mb-2 lg:mb-8">
          <h2 className="text-xl md:text-3xl text-black font-bold">
            Bring the most productivity
          </h2>
          <Link passHref href="/category">
            <span className="cursor-pointer text-indigo-600 text-sm font-semibold flex justify-center items-center pr-2">
              Browse all categories <ArrowRightIcon className="ml-2 h-5 w-5" />
            </span>
          </Link>
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
                    {currency} {priceFn(price, currency)}
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
