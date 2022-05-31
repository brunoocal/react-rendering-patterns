import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Currencies, CurrencyFlag} from '@interfaces/Currency';
import {SearchIcon} from '@heroicons/react/solid';
import {ShoppingBagIcon} from '@heroicons/react/outline';
import {CurrencyContext} from '@utils/CurrencyContext';
import {Transition} from '@utils/Transition';

export const Header = () => {
  const [currency, setCurrency] = React.useContext(CurrencyContext);
  const dropdown = React.useRef(null);
  const trigger = React.useRef(null);
  const [showDropdown, setShowDropdown] = React.useState(false);

  React.useEffect(() => {
    const clickHandler = ({target}) => {
      if (
        !showDropdown ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      setShowDropdown(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  React.useEffect(() => {
    const keyHandler = ({keyCode}) => {
      if (!showDropdown || keyCode !== 27) return;
      setShowDropdown(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

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
          <section className="flex justify-end w-[27.5rem] h-10 items-center">
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

            <section className="ml-6 hidden sm:block h-10 w-20 relative">
              <button
                type="button"
                ref={trigger}
                onClick={() => setShowDropdown(!showDropdown)}
                className="h-full flex justify-center items-center"
              >
                <figure className="w-6 h-6 flex justify-center items-center">
                  <img src={CurrencyFlag[currency]} alt={currency} />
                </figure>
                <p className="ml-4 text-base font-medium text-gray-500 hover:text-gray-900">
                  {currency}
                </p>
              </button>
              {/* @ts-ignore */}
              <Transition
                className="absolute top-10 h-auto w-28 z-10"
                show={showDropdown}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
              >
                <div
                  className="relative h-full w-full bg-white border-red-100 border"
                  ref={dropdown}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setShowDropdown(false)}
                >
                  {Object.keys(Currencies).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`${
                        currency === c
                          ? '!bg-indigo-500 !text-white !hover:text-white'
                          : ''
                      } w-full h-8 text-gray-500 hover:text-gray-900 transition-colors hover:bg-indigo-200 flex justify-center items-center`}
                    >
                      <figure className="w-6 h-6 flex justify-center items-center">
                        <img src={CurrencyFlag[c]} alt={c} />
                      </figure>
                      <p className="ml-4 text-base font-medium">{c}</p>
                    </button>
                  ))}
                </div>
              </Transition>
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
