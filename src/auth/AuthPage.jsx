import { Navigate, Route, Routes } from 'react-router';
import {  ResetPassword, ResetPasswordChange, ResetPasswordChanged, ResetPasswordCheckEmail, ResetPasswordEnterEmail, Signup, TwoFactorAuth } from './pages/jwt';
import { AuthBrandedLayout } from '@/layouts/auth-branded';
import { AuthLayout } from '@/layouts/auth';
import { CheckEmail } from '@/auth/pages/jwt';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Login from './pages/jwt/Login';
const AuthPage = () => <Routes>
    <Route element={<AuthBrandedLayout />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/2fa" element={<TwoFactorAuth />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/enter-email" element={<ResetPasswordEnterEmail />} />
      <Route path="/reset-password/check-email" element={<ResetPasswordCheckEmail />} />
      <Route path="/reset-password/change" element={<ResetPasswordChange />} />
      <Route path="/reset-password/changed" element={<ResetPasswordChanged />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Route>

    <Route element={<AuthLayout />}>
    <Route path="/classic/user-dashboard" element={<UserDashboard />} />
    <Route path="/classic/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/classic/login" element={<Login />} />
      <Route path="/classic/signup" element={<Signup />} />
      <Route path="/classic/2fa" element={<TwoFactorAuth />} />
      <Route path="/classic/check-email" element={<CheckEmail />} />
      <Route path="/classic/reset-password" element={<ResetPassword />} />
      <Route path="/classic/reset-password/enter-email" element={<ResetPasswordEnterEmail />} />
      <Route path="/classic/reset-password/check-email" element={<ResetPasswordCheckEmail />} />
      <Route path="/classic/reset-password/change" element={<ResetPasswordChange />} />
      <Route path="/classic/reset-password/changed" element={<ResetPasswordChanged />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Route>
  </Routes>;
export { AuthPage };