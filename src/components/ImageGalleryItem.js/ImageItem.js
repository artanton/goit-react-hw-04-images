import { useState } from 'react';
import { ImgStyled } from './ImageItemStyled';
import { ImageModal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const { webformatURL, largeImageURL, tags } = image;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ImgStyled onClick={openModal} src={webformatURL} alt={tags} />
      <ImageModal
        BigImage={largeImageURL}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        Tag={tags}
      />
    </div>
  );
};
