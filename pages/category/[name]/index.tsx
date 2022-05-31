import React, {
  useState,
  useEffect,
  useRef,
  startTransition,
  useContext,
} from 'react';
import {useRouter} from 'next/router';
import {Breadcrumb} from '@components/Breadcrumb';
import {Product, ProductPageURL} from '@interfaces/Products';
import Image from 'next/image';
import Link from 'next/link';
import {Currencies, price} from '@interfaces/Currency';
import {Color, Sizes} from '@interfaces/Products';
import {CurrencyContext} from '@utils/CurrencyContext';
const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const colors: Color[] = [
  {name: 'Black', hex: '#000'},
  {name: 'Willow', hex: '#908651'},
  {name: 'Charcoal', hex: '#514f56'},
  {name: 'Indigo', hex: '#324d68'},
  {name: 'Bone', hex: '#f1ece5'},
  {name: 'Port', hex: '#9d7b71'},
  {name: 'Sienna', hex: '#af8b48'},
  {name: 'Deep Forest', hex: '#2c4c48'},
];

const sizes: Sizes[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

export default function CategoryPage({header}) {
  const router = useRouter();
  const {name} = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const filtersRef = useRef<HTMLDivElement>(null);
  const [currency] = useContext(CurrencyContext);

  useEffect(() => {
    if (name) {
      fetch(`/api/products?category=${name}`)
        .then(res => res.json())
        .then(data => setProducts(data.products));
    }
  }, [name]);

  return (
    <>
      {header}
      <Breadcrumb />

      <section className="w-full border-b border-gray-200 h-auto pt-24 pb-12 ">
        <div className="max-w-7xl mx-auto flex justify-center items-start flex-col">
          <h1 className="text-4xl text-black font-extrabold mb-4">
            {name ?? 'Name'}
          </h1>
          <p className="text-base font-medium text-gray-500">
            Checkout out the latest products of {name ?? 'Name'}. Now with more
            products and less price!
          </p>
        </div>
      </section>
      <section className="w-full h-auto mt-4">
        <div className="grid grid-cols-[30%_70%] h-full grid-rows-1 max-w-7xl mx-auto">
          <section className="relative w-full h-full border border-r-0 border-t-0">
            <section
              ref={filtersRef}
              className="sticky top-0 w-full h-auto flex justify-center items-center flex-col py-4 px-8"
            >
              <div className="w-full h-auto flex justify-center items-start flex-col border-b-2">
                <h3 className="text-lg font-medium text-black mb-8">Color</h3>
                <ul className="w-full h-auto flex justify-center items-start flex-col mb-12">
                  {colors.map(({name, hex}) => {
                    return (
                      <li className="w-full h-10" key={name}>
                        <button
                          type="button"
                          className="w-full h-full flex justify-start items-center"
                        >
                          <span
                            key={name}
                            style={{
                              background: hex,
                            }}
                            className={`inline-block bg-white rounded-full h-5 w-5 mr-3`}
                          />
                          <p className="text-base font-normal text-gray-500 hover:text-gray-800">
                            {capitalize(name)}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-full h-auto flex justify-center items-start flex-col border-b-2 mt-6">
                <h3 className="text-lg font-medium text-black mb-8">Gender</h3>
                <ul className="w-full h-auto flex justify-center items-start flex-col mb-12">
                  {['Men', 'Women'].map(gender => {
                    return (
                      <li className="w-full h-10" key={gender}>
                        <button
                          type="button"
                          className="w-full h-full flex justify-start items-center"
                        >
                          <span className="mr-3 flex justify-center items-center h-4 w-4 border rounded" />
                          <p className="text-base font-normal text-gray-500 hover:text-gray-800">
                            {gender}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-full h-auto flex justify-center items-start flex-col border-b-2 mt-6">
                <h3 className="text-lg font-medium text-black mb-8">Sizes</h3>
                <ul className="w-full h-auto flex justify-center items-start flex-col mb-12">
                  {sizes.map(size => {
                    return (
                      <li className="w-full h-10" key={size}>
                        <button
                          type="button"
                          className="w-full h-full flex justify-start items-center"
                        >
                          <span className="mr-3 flex justify-center items-center h-4 w-4 border rounded" />

                          <p className="text-base font-normal text-gray-500 hover:text-gray-800">
                            {size}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          </section>
          <section className="w-full h-full flex flex-wrap justify-start items-center">
            {products.map(product => {
              return (
                <>
                  <Link passHref href={ProductPageURL(product)}>
                    <article className="w-full md:w-1/2 lg:w-1/3 h-auto p-4 cursor-pointer">
                      <section className="flex justify-center items-center flex-col rounded-lg border border-slate-200">
                        <figure className="w-full aspect-[25/32] relative">
                          <Image src={product.images[0]} layout="fill" />
                        </figure>
                        <div className="flex justify-start items-start flex-col w-full p-4 px-6">
                          <h2 className="text-black text-base font-medium mb-2">
                            {product.name}
                          </h2>
                          <p className="text-sm font-normal text-gray-500 mb-6">
                            Look like a visionary CEO and wear the same black
                            t-shirt every day.
                          </p>
                          <div className="flex flex-1 justify-center items-start flex-col">
                            <span className="text-sm font-normal text-gray-500 italic">
                              {product.colors.length >= 2
                                ? `${product.colors.length} colors`
                                : `${capitalize(product.colors[0].name)}`}
                            </span>
                            <p className="text-black text-base font-medium">
                              {currency} {price(product.price, currency)}
                            </p>
                          </div>
                        </div>
                      </section>
                    </article>
                  </Link>
                </>
              );
            })}
          </section>
        </div>
      </section>
    </>
  );
}
