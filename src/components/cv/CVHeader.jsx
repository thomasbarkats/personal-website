import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import PropTypes from 'prop-types';
import DecryptedText from '../../blocks/TextAnimations/DecryptedText/DecryptedText';
import { useThemeStyles } from '../../hooks/useThemeStyles';

export const CVHeader = ({ personalInfo, profileSrc, isDark }) => {
  const { getTextColor, link } = useThemeStyles(isDark);

  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">

        {/* Photo */}
        <div className="flex-shrink-0 mr-2">
          <div className={`w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-700/70 border-gray-600/20' 
              : 'bg-gray-100/70 border-white/20'
          }`}>
            <img src={profileSrc} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex-grow text-center sm:text-left">

          {/* Name & Title */}
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 transition-colors duration-300 ${getTextColor('primary')}`}>
            <DecryptedText text={personalInfo.name} animateOn="view" maxIterations={15} />
          </h1>
          <h2 className={`text-lg sm:text-xl mb-4 transition-colors duration-300 ${getTextColor('secondary')}`}>
            <DecryptedText text={personalInfo.title} animateOn="view" maxIterations={15} />
          </h2>

          {/* Contact details */}
          <div className={`flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm sm:text-base transition-colors duration-300 ${getTextColor('secondary')}`}>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
              <a href={`mailto:${personalInfo.email}`} className={`break-all transition-colors duration-300 ${link}`}>
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className={`break-all transition-colors duration-300 ${link}`}>
                {personalInfo.linkedin}
              </a>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
              <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer" className={`break-all transition-colors duration-300 ${link}`}>
                {personalInfo.github}
              </a>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

CVHeader.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired
  }).isRequired,
  profileSrc: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired
};
