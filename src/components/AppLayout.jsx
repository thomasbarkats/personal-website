import React from 'react';
import PropTypes from 'prop-types';
import Iridescence from '../blocks/Backgrounds/Iridescence/Iridescence';
import LiquidChrome from '../blocks/Backgrounds/LiquidChrome/LiquidChrome';
import { FloatingButtons } from './FloatingButtons';
import { useTheme } from '../hooks/useTheme';
import { useParallax } from '../hooks/useParallax';

export const AppLayout = ({ children, centerContent = false }) => {
  const { isDark, toggleTheme } = useTheme();

  // Parallax effect
  useParallax();

  return (
    <div className={`h-screen relative overflow-hidden print:h-auto print:overflow-visible print:py-0 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Background layers with parallax */}
      <div className="fixed inset-0 w-full h-[200vh] print:hidden parallax-bg-1">
        {isDark ? (
          <LiquidChrome
            baseColor={[0.1, 0.1, 0.1]}
            speed={0.1}
            amplitude={0.5}
            interactive={false}
          />
        ) : (
          <Iridescence
            color={[1, 1, 1]}
            speed={1.0}
            amplitude={0.1}
            mouseReact={false}
          />
        )}
      </div>

      <div className="fixed inset-0 w-full h-[200vh] print:hidden parallax-bg-2">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-yellow-200 opacity-50"></div>
        {isDark && <div className="absolute inset-0 bg-gray-900 opacity-50"></div>}
      </div>

      <div className={`fixed inset-0 w-full h-[200vh] print:hidden transition-colors duration-300 ${
        isDark ? 'bg-gray-900/40' : 'bg-gray-200/50'
      }`}></div>

      {/* Scrollable content area */}
      <div className={`relative z-10 h-full overflow-y-auto scrollbar-custom scrollable-content py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-0 print:h-auto print:overflow-visible print:py-0 print:text-base ${
        centerContent ? 'flex items-center justify-center min-h-screen' : ''
      }`}>
        {/* Pass isDark to children */}
        {React.cloneElement(children, { isDark })}
      </div>

      <FloatingButtons
        isDark={isDark}
        toggleDark={toggleTheme}
      />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  centerContent: PropTypes.bool
};
