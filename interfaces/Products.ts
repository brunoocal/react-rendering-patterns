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
  for: 'Women' | 'Men';
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
  for?: 'Women' | 'Men';
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
