import PropTypes from 'prop-types';
import info from '../info.json';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { CVHeader } from '../components/CVHeader';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useTiltEffect } from '../hooks/useTiltEffect';
import { usePageTitle } from '../hooks/usePageTitle';
import { useFavicon } from '../hooks/useFavicon';


export const BusinessCard = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate();
  const { mainBg, link } = useThemeStyles(isDark);
  const { ref, transform, handlers, isMobile } = useTiltEffect({
    rotateAmplitude: 6,
    scale: 1.015,
    perspective: 1400
  });

  const PROFILE_SRC = "https://raw.githubusercontent.com/thomasbarkats/assets/refs/heads/main/personal-website/profile.png";

  usePageTitle(info.name);
  useFavicon(PROFILE_SRC);

  return (
    <div
      className="w-full max-w-xl mx-auto"
      {...handlers}
    >
      <div
        ref={ref}
        className={`w-full p-6 pb-4 sm:p-6 sm:pb-4 lg:p-8 lg:pb-4 backdrop-blur-2xl rounded-lg shadow-xl transition-all duration-300 ${!isMobile ? 'transform-gpu will-change-transform' : ''} ${mainBg}`}
        style={{
          transform,
          transformStyle: isMobile ? undefined : 'preserve-3d',
          transition: isMobile ? undefined : 'transform 0.1s ease-out'
        }}
      >
        {/* Add a subtle gradient overlay for depth - only on desktop */}
        {!isMobile && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
              transform: 'translateZ(1px)'
            }}
          />
        )}

        {/* Content with subtle 3D effect - only on desktop */}
        <div style={{ transform: isMobile ? undefined : 'translateZ(20px)' }}>
          <CVHeader personalInfo={info} profileSrc={PROFILE_SRC} isDark={isDark} />

          {/* View Projects Link */}
          <div className="mt-6 pt-4 border-t transition-colors duration-300" style={{
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            <div className="flex items-center">
              <div className="w-8 shrink-0" />
              <button
                onClick={() => navigate('/projects')}
                className={`group flex-1 flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-300 ${link}`}
              >
                <span>View My Projects</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
                className={`w-8 shrink-0 flex items-center justify-center p-1.5 rounded-full opacity-25 hover:opacity-100 transition-all duration-300 ${
                  isDark
                    ? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BusinessCard.propTypes = {
  isDark: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired
};
