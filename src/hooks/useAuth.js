import { useSelector } from 'react-redux';

// Можливо потрібно буде виправивити назви селекторів
import {
  selectUserData,
  selectIsLoggedIn,
  selectIsRefreshing,
} from '../redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUserData);

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};
