import React, {useState, useEffect, useRef, useContext} from 'react';
import {useRouter} from 'next/router';
import {Breadcrumb} from '@components/Breadcrumb';
import {
  ClothingProduct,
  Product,
  WorkspaceProduct,
  Categories,
  ProductPageURL,
} from '@interfaces/Products';
import Image from 'next/image';
import Link from 'next/link';
import {Currencies, price} from '@interfaces/Currency';
import {Sizes} from '@interfaces/Products';
import * as ProductData from '@utils/ProductsData';
import {CurrencyContext} from '@utils/CurrencyContext';
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';

const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const _categories = [
    {
      params: {
        name: Categories.NewArrivals,
        products: [...ProductData.MenProducts, ...ProductData.WomenProducts],
      },
    },
    {
      params: {
        name: Categories.Workspace,
        products: ProductData.WorkspaceProducts,
      },
    },
  ];

  const paths = [];

  _categories.forEach(({params}) => {
    params.products.forEach(
      (product: Product | WorkspaceProduct | ClothingProduct) => {
        paths.push({
          params: {
            name: params.name,
            product: ProductPageURL(product)
              .split('/')
              .pop(),
          },
        });
      }
    );
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  //I'm simulating an DB call, this code should be replaced by a real DB call
  //And since this is a static page, this code isn't shipped to production
  //Maybe you are asking, why don't call our built-in Next API here?
  //It's because that API is not available in the build step.
  //So, this will work fine for this example, but it's not a good practice and should be avoided.

  const AllProducts = [
    ...ProductData.MenProducts,
    ...ProductData.WomenProducts,
    ...ProductData.WorkspaceProducts,
    ...ProductData.Accesories,
  ];

  const product:
    | Product
    | ClothingProduct
    | WorkspaceProduct = AllProducts.find(product => {
    const item =
      ProductPageURL(product) ===
      `/category/${context.params.name}/product/${context.params.product}`;

    return item;
  });

  //this date is only for showing the revalidate prop in action
  const date = new Date();

  return {
    props: {
      product,
      date: `${date.toString()}`,
    },
    revalidate: 60 * 10,
    //Revalidate every 10minutes. If you want to see this in action by yourself and not spend,
    //10 minutes on my vercel deploy, you can clone this proyect and change it to whatever you like.
    //npm run build -> npm run start -> enjoy
  };
};

export default function ProductPage({
  header,
  product,
  date,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currency] = useContext(CurrencyContext);

  if (!product) return null;

  return (
    <>
      {header}
      <Breadcrumb />

      <section className="w-full h-auto mt-4">
        <div className="flex justify-center gap-8 items-start h-[100rem] max-w-6xl mx-auto pr-8">
          <section className="w-full h-full flex justify-start items-end flex-col">
            <figure className="relative w-full aspect-[370/459] max-w-[700px] max-h-[868px] rounded-xl overflow-hidden">
              <Image
                src={product.images[product.images.length - 1]}
                layout="fill"
              />
            </figure>
          </section>
          <section className="w-full max-w-[420px] h-full">
            <h1 className="text-black font-semibold text-4xl mt-2">
              {product.name}
            </h1>
            <div className="mt-3 flex justify-between items-center">
              <h2 className="text-black font-semibold text-2xl ">
                {currency} {price(product.price, currency)}
              </h2>
              <p className="text-gray-500 no-underline hover:underline italic text-sm">
                {/* This change is to show the revalidation of the pages using ISR */}
                {date}
              </p>
            </div>
            <div className="w-full h-1 my-4 border-t border-gray-300" />
            <div className="w-full flex flex-col mt-4">
              <h2 className="text-slate-900 font-medium text-lg mb-2">Color</h2>
              <ul className="flex justify-start items-center pl-1 flex-wrap gap-y-5">
                {product.colors.map(({name, hex}) => {
                  const style = {
                    '--tw-ring-color': hex,
                    background: hex,
                  } as React.CSSProperties;

                  return (
                    <li
                      key={name}
                      style={style}
                      className={`inline-block ring-2 ring-offset-2 bg-white rounded-full h-8 w-8 mr-4`}
                    />
                  );
                })}
              </ul>
            </div>
            <div className="w-full flex flex-col mt-8">
              <div className="w-full flex justify-between items-center pr-1">
                <h2 className="text-slate-900 font-medium text-lg mb-2">
                  Size
                </h2>
                <span className="text-indigo-600 font-normal text-base">
                  See sizing chart
                </span>
              </div>
              <ul className="flex gap-x-3 justify-start items-center flex-wrap gap-y-5">
                {'sizes' in product &&
                  (product as ClothingProduct).sizes.map((size, i) => {
                    return (
                      <li
                        key={size}
                        className={`${i === 1 &&
                          'bg-indigo-600 !text-white'} w-[4.5rem] flex justify-center text-slate-800 font-medium text-base items-center border border-gray-300 rounded-md py-3 px-4`}
                      >
                        {size}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <button
              type="button"
              className="w-full h-12 bg-indigo-600 rounded-md mt-4 text-white"
            >
              Add to cart
            </button>
            <div className="mt-8 flex flex-col justify-center items-start">
              <h2 className="text-slate-900 font-medium text-lg mb-4">
                Description
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our new Women’s Essential Standard fit tee is carefully cut and
                sewn by hand in Los Angeles, California. The new standard fit is
                not too boxy, not too slim. We think it’s just right. With small
                details like custom split-hem, super soft garment dyed fabric,
                and sleeves that are just the right length, these will be your
                new daily tees.
              </p>
            </div>
            <div className="w-full h-1 my-4 border-t border-gray-300" />
            <div className="mt-8 flex flex-col justify-center items-start">
              <h2 className="text-slate-900 font-medium text-lg mb-4">
                Fabric & Care
              </h2>
              <ul className="flex justify-center items-start flex-col text-sm text-gray-500 leading-relaxed">
                <li>
                  <span className="mx-2">-</span> Only the best materials
                </li>
                <li>
                  <span className="mx-2">-</span> Eco-friendly and locally made
                </li>
                <li>
                  <span className="mx-2">-</span> Pre-washed and pre-shrunk
                </li>
                <li>
                  <span className="mx-2">-</span> Machine wash cold with similar
                  colors
                </li>
              </ul>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
