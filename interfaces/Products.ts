import {WorkspaceProducts} from '@utils/ProductsData';

export enum Categories {
  'NewArrivals' = 'New Arrivals',
  'Accesories' = 'Accesories',
  'Workspace' = 'Workspace',
}

export type Category = {
  name: Categories;
  landing: string;
  big?: boolean;
};

export interface Product {
  name: string;
  price: number | string;
  images: string[];
  category: Categories;
  colors: Color[];
  desc: string;
}

export interface Color {
  name: string;
  hex: string;
}

export type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';
export type Materials =
  | 'Leather'
  | 'Wood'
  | 'Metal'
  | 'Ceramic'
  | 'Glass'
  | 'Plastic'
  | 'Wool'
  | 'Cotton'
  | 'Paper';

export interface ClothingProduct extends Product {
  sizes: Sizes[];
  gender: 'Women' | 'Men';
  kit?: {
    is: boolean;
    description: string;
  };
}

export interface WorkspaceProduct extends Product {
  material: Materials[] | Materials;
  kit?: {
    is: boolean;
    description?: string;
  };
}

export interface ProductAPIQuery {
  category?: Categories;
  name?: string;
  colors?: Color[] | Color;
}

export interface ClothingAPIQuery extends ProductAPIQuery {
  sizes?: Sizes[] | Sizes;
  gender?: 'Women' | 'Men';
}

export interface WorkspaceAPIQuery extends ProductAPIQuery {
  material?: Materials[] | Materials;
}

export const ProductPageURL = (
  product: Product | ClothingProduct | WorkspaceProduct
) => {
  const name = product.name;
  const productName = name.split(' ').join('-');
  const categoryName: Categories = product.category;

  if (categoryName === Categories.NewArrivals) {
    if ('kit' in product) {
      const kitDesc = (product as ClothingProduct).kit.description;
      const kitName = kitDesc.split(' ').join('-');
      return `/category/${categoryName}/product/${productName}-kit-${kitName}`;
    }

    if (product.colors || product.colors.length === 1) {
      return `/category/${categoryName}/product/${productName}-${product.colors[0].name}`;
    }
  }

  return `/category/${categoryName}/product/${productName}`;
};

export const decodeProduct = (text: string | null): string => {
  if (text === null) {
    return '';
  }

  if (typeof text === 'string') {
    const productName = text?.split('-');

    if (productName.length >= 1) {
      if (productName.find(word => word === 'kit')) {
        const index = productName.findIndex(word => word === 'kit');
        const slice = productName.slice(0, index).join(' ');
        return slice + ' Kit';
      }

      return productName.join(' ');
    }

    return text;
  }

  return text;
};

export const groupColors = (products: Product[]) => {
  const colors: Color[] = [];

  products.forEach(product => {
    if (product.colors) {
      product.colors.forEach(color => {
        if (!colors.find(c => c.hex === color.hex)) {
          colors.push(color);
        }
      });
    }
  });
};

type GroupFilter = {
  colors: Color[];
  material: Materials[];
  sizes: Sizes[];
  gender: [];
};

export const group = (
  products: Product[] | WorkspaceProduct[] | ClothingProduct[]
) => {
  const filtersGroup: GroupFilter = {
    colors: [],
    material: [],
    sizes: [],
    gender: [],
  };

  const properties = Object.keys(filtersGroup);

  products.forEach(product => {
    properties.forEach(key => {
      if (product[key]) {
        const filter = filtersGroup[key];

        if (Array.isArray(product[key])) {
          product[key].forEach((item: Materials | Color) => {
            if (typeof item == 'object') {
              console.log(filter.find((c: Color) => c.hex === item.hex));
              if (!filter.find((c: Color) => c.hex === item.hex)) {
                console.log('HOLA');
                filter.push(item as Color);
                return;
              }
              return;
            }

            if (!filter.includes(item)) {
              //Materials | Sizes | Gender
              filter.push(item);
              return;
            }
          });
        } else {
          if (!filter.includes(product[key])) {
            filter.push(product[key] as Materials);
          }
        }
      }
      return;
    });
  });

  return filtersGroup;
};
