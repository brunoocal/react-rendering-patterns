// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type DecorativeImageProps = {
  src: string;
  className?: string;
  alt?: string;
};

export type TilesProps = {
  src?: string;
  title?: string;
  desc?: string;
  button?: {
    text: string;
    link: string;
  };
  bgColor?: string;
  bgOpacity?: string;
};
