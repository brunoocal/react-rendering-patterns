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
    colors: Color[];
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
