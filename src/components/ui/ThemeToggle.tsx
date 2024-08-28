import { useTheme } from "@/components/ui/ThemeProvider";
import { Theme } from "@/type/theme";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const handleToggle = () => {
    // Compute the new theme value
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    // Set the new theme value
    setTheme(newTheme);
  };

  return (
    <button
      className={`p-2 rounded-full ${theme === 'dark' ? ' text-white' : 'text-black'}`}
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
