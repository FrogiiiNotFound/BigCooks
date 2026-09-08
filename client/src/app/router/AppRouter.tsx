import HomePage from '@/pages/home/ui/HomePage';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/main-layout/ui/MainLayout';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
