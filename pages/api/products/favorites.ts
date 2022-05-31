import {Categories, ProductAPIQuery} from '@interfaces/Products';
import {NextApiRequest, NextApiResponse} from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const body = _req.body;
  const method = _req.method;
  const query = _req.query;
  let json: ProductAPIQuery;
  try {
    if (method !== 'GET') {
      json = JSON.parse(body);
    }
    json = query;
  } catch (e) {
    res.status(400).json({
      message: 'Invalid JSON',
    });
  }

  switch (method) {
    case 'GET': {
      switch (json.category) {
        case Categories.NewArrivals:
          return res.status(200).json({
            status: 'success',
            favorites: [
              {
                src: '/favorite-1.jpg',
                price: 19.99,
                name: 'Black Basic Tee',
              },
              {
                src: '/favorite-2.jpg',
                price: 19.99,
                name: 'Green Tea Basic Tee',
              },
              {
                src: '/favorite-3.jpg',
                price: 39.99,
                name: 'Mandarina Basic Tee',
              },
            ],
          });

        case Categories.Workspace:
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
              price: 20,
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
              price: 18,
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
              price: 90,
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
              price: 30,
              src: '/journal.png',
            },
          ];

          return res.status(200).json({
            status: 'success',
            favorites: List,
          });
      }
    }
  }
};

export default handler;
