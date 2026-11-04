import HomePage from '@/pages/home/ui/HomePage';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/main-layout/ui/MainLayout';
import Register from '@/pages/register/ui/Register';
import Login from '@/pages/login/ui/Login';
import { Profile } from '@/pages/profile/ui/Profile';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/me/profile" element={<Profile />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
