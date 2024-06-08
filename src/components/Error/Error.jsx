import s from './Error.module.css';

export default function Error() {
  return (
    <p className={s.errorMessage}>
      Oops! Something went wrong. Try refreshing the page or come back later.
    </p>
  );
}
