import { useSelector } from 'react-redux';
import { selectUserData } from 'redux/auth/selectors';

export const useUserData = () => useSelector(selectUserData);
