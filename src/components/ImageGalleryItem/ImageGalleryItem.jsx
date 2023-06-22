import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';

export default function ImageGalleryItem({
  image: { webformatURL, largeImageURL, tags },
}) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <img src={webformatURL} alt={tags} onClick={openModal} />

      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
};
