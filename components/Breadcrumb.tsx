import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {decodeProduct} from '@interfaces/Products';
import {ChevronRightIcon} from '@heroicons/react/solid';

const capitalize = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

function Crumb({text, href, last = false}) {
  if (last) {
    return (
      <p className="text-indigo-600 text-base font-medium">
        {capitalize(text)}
      </p>
    );
  }

  return (
    <>
      <Link color="inherit" href={href} passHref>
        <p className="no-underline hover:underline text-base font-medium text-gray-500 hover:text-gray-900">
          {capitalize(text)}
        </p>
      </Link>
      <ChevronRightIcon className="mx-2 text-indigo-600 w-5 h-5" />
    </>
  );
}

export const Breadcrumb = () => {
  const router = useRouter();

  const crumbs = React.useMemo(
    function generateBreadcrumbs() {
      const asPathWithoutQuery = router.asPath.split('?')[0];
      const asPathNestedRoutes = asPathWithoutQuery
        .split('/')
        .filter(v => v.length > 0);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');

        if (subpath.includes('[')) {
          subpath = subpath.replace(/\[(.*?)\]/g, (match, p1) => {
            return p1;
          });
        }

        return {href, text: decodeURI(decodeProduct(subpath))};
      });

      return [{href: '/', text: 'Home'}, ...crumblist];
    },
    [router.asPath]
  );

  return (
    <div className="w-full h-16 border-b border-gray-200">
      <section className="mx-auto w-full h-full flex justify-start items-center max-w-7xl">
        {crumbs.map((crumb, idx) => {
          return (
            <Crumb key={idx} {...crumb} last={idx === crumbs.length - 1} />
          );
        })}
        {crumbs.length >= 4 && (
          <button
            className="px-3 h-10 bg-indigo-600 rounded-md text-sm text-white ml-4"
            onClick={() => {
              fetch('/api/revalidate', {
                method: 'POST',
                body: JSON.stringify({
                  event: 'revalidate-date',
                  url: router.asPath,
                }),
              })
                .then(res => res.json())
                .then(data => {
                  if (data.revalidated) {
                    window.location.reload();
                  }
                });
            }}
          >
            Revalidate Page (On-demand ISR)
          </button>
        )}
      </section>
    </div>
  );
};
