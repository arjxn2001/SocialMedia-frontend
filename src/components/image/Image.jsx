import { IKImage } from 'imagekitio-react';

const Image = ({ path, src, alt, className, w, h }) => {
  const urlEndpoint = import.meta.env.VITE_URL_IK_ENDPOINT;

  if (!path && !src) return null;

  const isUsingPath = !!path;
  const transformation = w && h ? [{ width: w, height: h }] : undefined;

  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      {...(isUsingPath ? { path } : { src })}
      transformation={transformation}
      lqip={isUsingPath ? { active: true, quality: 20 } : undefined}
      alt={alt || 'Image'}
      loading="lazy"
      className={className}
    />
  );
};

export default Image;
