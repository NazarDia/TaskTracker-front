import s from './AuthPage.module.css';

import { Outlet, Link } from 'react-router-dom';

export default function AuthPage() {
  return (
    <div className={s.container}>
      <nav>
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/register">Register</Link>
      </nav>
      <Outlet />
    </div>
  );
}
