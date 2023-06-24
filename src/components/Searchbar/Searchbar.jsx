import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SearchbarStyled from './Searchbar.styled';
import SearchForm from './SearchForm.styled';
import { BsSearch } from 'react-icons/bs';

const initialValues = {
  query: '',
};

export default function Searchbar({ onSubmit }) {
  const handleSubmit = ({ query }, { resetForm }) => {
    if (!query) {
      return toast.info('Please, enter a query');
    }
    onSubmit(query.trim().toLowerCase());
    resetForm();
  };

  return (
    <SearchbarStyled>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <SearchForm>
          <button type="submit">
            <span>
              <BsSearch />
            </span>
          </button>

          <Field
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchbarStyled>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
