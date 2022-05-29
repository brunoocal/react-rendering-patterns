export enum Categories {
  'NewArrivals' = 'New Arrivals',
  'Accesories' = 'Accesories',
  'Workspace' = 'Workspace',
}

export type Product = {
  id: number;
};

export type Category = {
  name: Categories;
  landing: string;
  products?: Product[];
  big?: boolean;
};
