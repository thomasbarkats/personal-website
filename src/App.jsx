import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { BusinessCard } from './pages/BusinessCard';
import { Projects } from './pages/Projects';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <AppLayout centerContent={true}>
            <BusinessCard />
          </AppLayout>
        } />
        <Route path="/projects" element={
          <AppLayout centerContent={false}>
            <Projects />
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
};
