import { Formik, Field, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SearchbarStyled from './Searchbar.styled';
import SearchForm from './SearchForm.styled';
import { BsSearch } from 'react-icons/bs';

interface Props {
  onSubmit: (query: string) => void;
}

interface SearchbarData {
  query: string;
}

const initialValues = {
  query: '',
};

export default function Searchbar({ onSubmit }: Props) {
  const handleSubmit = async (
    { query }: SearchbarData,
    { resetForm }: FormikHelpers<SearchbarData>
  ) => {
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
