import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Currencies, CurrencyFlag} from '@interfaces/Currency';
import {SearchIcon} from '@heroicons/react/solid';
import {ShoppingBagIcon} from '@heroicons/react/outline';
export const Header = () => {
  return (
    <>
      <header className="relative bg-white flex border-b-2 border-gray-200 justify-center items-center w-full mx-auto px-4 sm:px-6">
        <section className="flex max-w-7xl w-full justify-between items-center py-6 lg:justify-start md:space-x-10">
          <Link href="#" passHref>
            <div className="flex justify-start w-10 h-full">
              <figure className="h-10 w-full relative block">
                <Image src="/logo.svg" layout="fill" className="h-10 w-auto" />
              </figure>
            </div>
          </Link>
          <Nav />
          <section className="flex justify-end w-[27rem] h-10 items-center">
            <button
              type="button"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </button>

            <div className="w-0 h-5/6 border border-gray-100 rounded mx-6" />

            <button
              type="button"
              className="hidden sm:block text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Create Account
            </button>

            <section className="ml-6 hidden sm:flex justify-center items-center h-10 w-auto">
              <figure className="w-6 h-6 flex justify-center items-center">
                <img src={CurrencyFlag.CAD} alt={Currencies.CAD} />
              </figure>
              <p className="ml-4 text-base font-medium text-gray-500 hover:text-gray-900">
                {Currencies.CAD}
              </p>
            </section>

            <SearchIcon className="hidden sm:block mx-6 w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors" />

            <section className="flex justify-center items-center">
              <ShoppingBagIcon className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors" />
              <p className="ml-2 text-base font-medium text-gray-500 hover:text-gray-900">
                1
              </p>
            </section>
          </section>
        </section>
      </header>
    </>
  );
};

const Nav = () => {
  const items: string[] = ['Women', 'Men', 'Luxury', 'Company'];

  return (
    <nav className="hidden lg:flex space-x-10 flex-1 h-10">
      {items.map((item, index) => (
        <Link href="#" passHref key={index}>
          <button
            type="button"
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            {item}
          </button>
        </Link>
      ))}
    </nav>
  );
};
