import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import info from '../info.json';
import { CVHeader } from '../components/cv/CVHeader';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useTiltEffect } from '../hooks/useTiltEffect';
import { usePageTitle } from '../hooks/usePageTitle';
import { useFavicon } from '../hooks/useFavicon';


export const BusinessCard = ({ isDark }) => {
  const navigate = useNavigate();
  const { mainBg, link } = useThemeStyles(isDark);
  const { ref, transform, handlers, isMobile } = useTiltEffect({
    rotateAmplitude: 12,
    scale: 1.03,
    perspective: 1200
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
          <CVHeader personalInfo={info} profileSrc={PROFILE_SRC}  isDark={isDark} />

          {/* View Projects Link */}
          <div className="mt-6 pt-4 border-t transition-colors duration-300" style={{
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={() => navigate('/projects')}
              className={`group w-full flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-300 ${link}`}
            >
              <span>View My Projects</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

BusinessCard.propTypes = {
  isDark: PropTypes.bool.isRequired
};
