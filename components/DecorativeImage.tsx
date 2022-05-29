import * as React from 'react';
import {DecorativeImageProps} from '@interfaces/index';

export const DecorativeImage = ({
  src,
  className = 'w-44 h-64 rounded-lg overflow-hidden',
  alt,
}: DecorativeImageProps) => {
  return (
    <div className={className}>
      <img
        src={src}
        alt=""
        className="w-full h-full object-center object-cover"
      />
    </div>
  );
};
