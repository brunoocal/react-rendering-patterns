import {NextApiRequest, NextApiResponse} from 'next';
import {
  Categories,
  ClothingAPIQuery,
  ProductAPIQuery,
  ProductPageURL,
  WorkspaceAPIQuery,
} from '@interfaces/Products';
import * as Products from '@utils/ProductsData';

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
      //Categories (I'm concern that this is not the best way to do this and I'll do it better later)
      switch (json.category) {
        case Categories.NewArrivals:
          const clothQuery: ClothingAPIQuery = json;
          const AllProducts = [
            ...Products.MenProducts,
            ...Products.WomenProducts,
          ];

          if (clothQuery.name) {
            console.log(clothQuery.name);
            const findedProduct = AllProducts.find(
              product =>
                ProductPageURL(product) ===
                `/category/${clothQuery.category}/product/${clothQuery.name}`
            );

            return res
              .status(200)
              .json({status: 'success', product: findedProduct});
          }

          return res.status(200).json({
            status: 'success',
            products: AllProducts,
          });

        case Categories.Workspace:
          const workspaceQuery: WorkspaceAPIQuery = json;

          if (workspaceQuery.name) {
            const findedProduct = Products.WorkspaceProducts.find(
              product =>
                ProductPageURL(product) ===
                `/category/${workspaceQuery.category}/product/${workspaceQuery.name}`
            );

            return res
              .status(200)
              .json({status: 'success', product: findedProduct});
          }

          return res.status(200).json({
            status: 'success',
            products: Products.WorkspaceProducts,
          });

        case Categories.Accesories:
          const accesoriesQuery: ProductAPIQuery = json;

          if (accesoriesQuery.name) {
            const findedProduct = Products.Accesories.find(
              product =>
                ProductPageURL(product) ===
                `/category/${accesoriesQuery.category}/product/${accesoriesQuery.name}`
            );
            return res
              .status(200)
              .json({status: 'success', product: findedProduct});
          }

          return res.status(200).json({
            status: 'success',
            products: Products.Accesories,
          });
      }
    }
  }
};

export default handler;
