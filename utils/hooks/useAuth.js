import { useSelector } from 'react-redux';
import { selectUser, selectUserError, selectUserIsLoading } from '../../redux/auth/authSelectors';

export const useAuth = () => {
  const user = useSelector(selectUser);

  const userError = useSelector(selectUserError);
  const isLoadingUser = useSelector(selectUserIsLoading);

  return {
    user,
    userError,
    isLoadingUser,
  };
};
