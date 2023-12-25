import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { IPicture } from 'interfaces/IPicture';

interface Props {
  image: IPicture;
}

export default function ImageGalleryItem({
  image: { webformatURL, largeImageURL, tags },
}: Props) {
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
