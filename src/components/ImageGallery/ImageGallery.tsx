import Gallery from './ImageGallery.styled';
import GalleryItem from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { IPicture } from 'interfaces/IPicture';

interface Props {
  images: IPicture[];
}

const ImageGallery = ({ images }: Props) => {
  return (
    <>
      <Gallery>
        {images.length > 0 &&
          images.map(image => (
            <GalleryItem key={image.webformatURL}>
              <ImageGalleryItem image={image} />
            </GalleryItem>
          ))}
      </Gallery>
    </>
  );
};

export default ImageGallery;
