import LoaderStyled from './Loader.styled';

const Loader = () => {
  return (
    <LoaderStyled
      height="80"
      width="80"
      radius="9"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default Loader;
