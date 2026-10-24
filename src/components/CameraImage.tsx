import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface CameraImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fitMode?: 'contain' | 'cover';
}

export const CameraImage: React.FC<CameraImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fitMode = 'contain'
}) => {
  const [hasError, setHasError] = useState(false);
  const fallbackAsset = '/src/assets/images/hero_camera_lifestyle_1792869327299.jpg';

  return (
    <div className={`relative bg-zinc-100 overflow-hidden flex items-center justify-center ${containerClassName}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={`w-full h-full transition-transform duration-300 ${
            fitMode === 'contain' ? 'object-contain p-3' : 'object-cover'
          } ${className}`}
        />
      ) : (
        <img
          src={fallbackAsset}
          alt={alt}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover ${className}`}
        />
      )}
    </div>
  );
};
