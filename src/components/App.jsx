import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AppStyled from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from 'services/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      await this.requestImages(searchQuery, page);
    }
  }

  requestImages = async (searchQuery, page) => {
    try {
      this.setState({ isLoading: true });

      const response = await fetchImages(searchQuery, page);
      const images = response.hits;

      if (page === 1) {
        this.setState({ images });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = async query => {
    this.setState({ searchQuery: query, page: 1 });
  };

  handleLoadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <AppStyled>
        <Searchbar
          onSubmit={this.handleSubmit}
          onSearchBtn={this.handleSearchBtn}
        />
        <ImageGallery images={images} isLoading={isLoading} />
        {images.length !== 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
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
}
