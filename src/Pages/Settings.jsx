// pages/Settings.js
import { useState } from 'react';
import { useSettings } from '../Authcontext/SettingContext';
import { Moon, Sun, Languages, Type } from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme, language, setLanguage, fontSize, setFontSize } = useSettings();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Settings</h1>
        
        {/* Theme Toggle */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {theme === 'dark' ? <Moon className="text-purple-500" /> : <Sun className="text-yellow-500" />}
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Theme</h2>
                <p className="text-gray-500 dark:text-gray-400">Toggle between light and dark mode</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600"
            >
              <span className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'} 
                inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Languages className="text-purple-500" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Language</h2>
              <p className="text-gray-500 dark:text-gray-400">Select your preferred language</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-full p-2 text-left border rounded-md flex justify-between items-center dark:border-gray-700 dark:text-white"
            >
              {languages.find(lang => lang.code === language)?.name}
              <span className="text-gray-500">▼</span>
            </button>
            {isLangOpen && (
              <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg dark:border-gray-700">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Font Size */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Type className="text-purple-500" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Font Size</h2>
              <p className="text-gray-500 dark:text-gray-400">Adjust the text size</p>
            </div>
          </div>
          <div className="flex gap-4">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => setFontSize(size.value)}
                className={`px-4 py-2 rounded-md ${
                  fontSize === size.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;