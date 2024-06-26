import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, lazy, useEffect } from 'react';

// Можливо потрібно буде виправивити назви селекторів
import { refreshUser } from '../../redux/auth/operations';
import {
  selectIsRefreshing,
  selectIsLoggedIn,
} from '../../redux/auth/selectors';

import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import PrivateRoute from '../PrivateRoute';
import RestrictedRoute from '../RestrictedRoute';
import Loader from '../Loader/Loader';

import s from './App.module.css';
import ScreensPage from '../ScreensPage/ScreensPage';

const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const AuthPage = lazy(() => import('../../pages/AuthPage/AuthPage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLoggedIn]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense
      fallback={
        <div className={s.loader}>
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <RestrictedRoute redirectTo="/home" component={<WelcomePage />} />
          }
        />
        <Route
          path="/auth/:id"
          element={<PrivateRoute redirectTo="/home" component={<AuthPage />} />}
        />
        <Route
          path="/home"
          element={<PrivateRoute redirectTo="/" component={<HomePage />} />}
        >
          <Route
            path="/home/:boardName"
            element={
              <PrivateRoute redirectTo="/" component={<ScreensPage />} />
            }
          />
        </Route>
        <Route
          path="/auth/register"
          element={
            <RestrictedRoute
              redirectTo="/auth/login"
              component={<RegisterForm />}
            />
          }
        />
        <Route
          path="/auth/login"
          element={
            <RestrictedRoute redirectTo="/home" component={<LoginForm />} />
          }
        />
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
