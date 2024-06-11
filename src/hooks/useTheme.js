import { useSelector } from 'react-redux';
import { selectUserTheme } from '../redux/auth/selectors';

export const useTheme = () => useSelector(selectUserTheme);
