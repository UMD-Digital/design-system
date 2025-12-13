type ImageType = {
  url: string;
  altText: string;
}[];

export const standard = ({
  images,
  url,
  label,
}: {
  images: ImageType;
  url?: string;
  label: string;
}) => {
  const image = images[0];
  if (image) {
    const imageElement = document.createElement('img');
    imageElement.src = image.url;
    imageElement.alt = image.altText;

    if (url) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', url);
      link.setAttribute('aria-label', `${label} ${image.altText}`);

      link.appendChild(imageElement);

      return link;
    }

    return imageElement;
  }
};
