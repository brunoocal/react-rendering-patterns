import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <>
      <header className="relative bg-white flex border-b-2 border-gray-200 justify-center items-center w-full mx-auto px-4 sm:px-6">
        <section className="flex max-w-7xl w-full justify-between items-center py-6 md:justify-start md:space-x-10">
          <Link href="#" passHref>
            <div className="flex justify-start w-10 h-full">
              <figure className="h-10 w-full relative block">
                <Image src="/logo.svg" layout="fill" className="h-10 w-auto" />
              </figure>
            </div>
          </Link>
          <Nav />
        </section>
      </header>
    </>
  );
};

const Nav = () => {
  const items: string[] = ['Women', 'Men', 'Luxury', 'Company'];

  return (
    <nav className="hidden md:flex space-x-10">
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
