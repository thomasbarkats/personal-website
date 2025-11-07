import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Loader2, AlertCircle, Github, ArrowRight } from 'lucide-react';
import info from '../info.json';
import FadeContent from '../blocks/Animations/FadeContent/FadeContent';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { usePageTitle } from '../hooks/usePageTitle';
import { useFavicon } from '../hooks/useFavicon';
import { useGithubPinnedRepos } from '../hooks/useGithubPinnedRepos';

export const Projects = ({ isDark }) => {
  const navigate = useNavigate();
  const { getTextColor, cardBg, borderColor } = useThemeStyles(isDark);

  // Fetch GitHub pinned repositories
  const { projects: githubProjects, loading, error } = useGithubPinnedRepos(info.githubUsername);

  // Use GitHub projects if available, otherwise fall back to empty array
  const projects = githubProjects;

  const PROFILE_SRC = "https://raw.githubusercontent.com/thomasbarkats/assets/refs/heads/main/personal-website/profile.png";

  usePageTitle(`${info.name} - Projects`);
  useFavicon(PROFILE_SRC);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <FadeContent blur={true} duration={400} delay={0} threshold={0}>
        <button
          onClick={() => navigate('/')}
          className={`mb-8 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isDark
              ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/50'
          }`}
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      </FadeContent>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className={`animate-spin mr-3 ${getTextColor('body')}`} size={24} />
          <span className={`text-lg ${getTextColor('body')}`}>Loading projects from GitHub...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <FadeContent blur={true} duration={400} delay={0} threshold={0}>
          <div className={`mb-8 p-4 rounded-lg border ${isDark ? 'bg-yellow-900/20 border-yellow-800/50 text-yellow-300' : 'bg-yellow-50 border-yellow-300 text-yellow-800'} flex items-start gap-3`}>
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Unable to fetch GitHub projects</p>
              <p className="text-sm opacity-80">Showing fallback projects. Error: {error}</p>
            </div>
          </div>
        </FadeContent>
      )}

      {/* Projects Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <FadeContent
            key={index}
            blur={true}
            duration={500}
            delay={200 + (index * 100)}
            threshold={0.1}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`group block h-full p-6 rounded-lg border backdrop-blur-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${cardBg} ${borderColor} hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${getTextColor('primary')}`}>
                  {project.title}
                </h4>
                <ExternalLink
                  size={18}
                  className={`flex-shrink-0 ml-2 transition-all duration-300 ${
                    isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'
                  } group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
                />
              </div>

              <p className={`text-sm sm:text-base mb-4 transition-colors duration-300 ${getTextColor('body')}`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`px-2 py-1 text-xs sm:text-sm rounded-full transition-colors duration-300 ${
                      isDark
                        ? 'bg-gray-700/50 text-gray-300'
                        : 'bg-gray-200/70 text-gray-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </FadeContent>
        ))}

        {/* View More on GitHub Card */}
        <FadeContent
          blur={true}
          duration={500}
          delay={200 + (projects.length * 100)}
          threshold={0.1}
        >
          <a
            href={`https://github.com/${info.githubUsername}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className={`group flex flex-col items-center justify-center h-full min-h-[200px] p-6 rounded-lg border backdrop-blur-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${cardBg} ${borderColor} hover:scale-105`}
          >
            <Github
              size={48}
              className={`mb-4 transition-all duration-300 ${
                isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'
              } group-hover:scale-110`}
            />
            <h4 className={`text-lg sm:text-xl font-semibold mb-2 transition-colors duration-300 ${getTextColor('primary')}`}>
              View More on GitHub
            </h4>
            <div className={`flex items-center gap-1 text-sm sm:text-base transition-colors duration-300 ${
              isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'
            }`}>
              <span>Explore all my repositories</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </a>
        </FadeContent>
        </div>
      )}
    </div>
  );
};

Projects.propTypes = {
  isDark: PropTypes.bool.isRequired
};
