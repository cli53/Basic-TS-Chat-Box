import React from "react";

type ThemeButtonProps = {
  theme: string;
  toggleTheme: (theme: string) => void;
};
const ThemeButton: React.FC<ThemeButtonProps> = ({ toggleTheme, theme }) => {
  return <button onClick={() => toggleTheme(theme)}>Toggle Theme</button>;
};

export default ThemeButton;
