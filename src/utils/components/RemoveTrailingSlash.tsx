import { Navigate, useLocation } from 'react-router-dom';

const RemoveTrailingSlash = ({ ...rest }) => {
  const location = useLocation();

  if (location.pathname.match('/.*/$')) {
    return (
      <Navigate
        replace
        {...rest}
        to={{
          pathname: location.pathname.replace(/\/+$/, ''),
          search: location.search
        }}
      />
    );
  } else return null;
};

export default RemoveTrailingSlash;
