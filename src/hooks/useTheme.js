import { useLayoutEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState('Light'); // Встановимо початкову тему як 'Light'

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, changeTheme };
}

export default useTheme;
