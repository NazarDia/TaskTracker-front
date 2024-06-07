import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={s.container}>
      <div className={s.img}></div>

      <div className={s.description}>
        <h2>Oops, page not found!</h2>
        <p>
          Sorry, but we couldn&#39;t find the page you&#39;re looking for. It
          may have been deleted, renamed, or temporarily unavailable.
        </p>

        <div className={s.descFromTablet}>
          <p>
            Here are a few steps that might help you find what you&#39;re
            looking for:
          </p>
          <ul>
            <li>Check the correctness of the URL and try again.</li>
            <li>
              Navigate to the homepage and use the navigation to find the
              information you need.
            </li>
          </ul>
        </div>

        <p>Thank you for your understanding and visiting our app.</p>
      </div>

      <Link className={s.backLink} to="/">
        Back to home page
      </Link>
    </div>
  );
}
