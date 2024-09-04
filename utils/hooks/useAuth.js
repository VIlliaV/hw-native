import { useSelector } from 'react-redux';
import { selectUser, selectUserError } from '../../redux/auth/authSelectors';

export const useAuth = () => {
  const user = useSelector(selectUser);

  const userError = useSelector(selectUserError);

  return {
    user,
    userError,
  };
};
