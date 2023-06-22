import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AppStyled from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from 'services/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const requestImages = async (searchQuery, page) => {
      try {
        setIsLoading(true);

        const response = await fetchImages(searchQuery, page);
        const images = response.hits;

        if (page === 1) {
          setImages(images);
        } else {
          setImages(state => [...state, ...images]);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    requestImages(searchQuery, page);
  }, [page, searchQuery]);

  const handleSubmit = async query => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleLoadMore = async () => {
    setPage(state => state + 1);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} isLoading={isLoading} />
      {images.length !== 0 && !isLoading && <Button onClick={handleLoadMore} />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AppStyled>
  );
}
