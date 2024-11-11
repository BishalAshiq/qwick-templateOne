import { Navigate, Route, Routes } from 'react-router';

import { AuthPage } from '@/auth';
// import { RequireAuth } from '@/auth/RequireAuth';
// element={<RequireAuth />}
// import { Demo1Layout } from '@/layouts/demo1';
import { ErrorsRouting } from '@/errors';
// import { AuthenticationWelcomeMessagePage, AuthenticationAccountDeactivatedPage, AuthenticationGetStartedPage } from '@/pages/authentication';

import AdminDashboard from '../auth/pages/dashboard/AdminDashboard';
import UserDashboard from '../auth/pages/dashboard/UserDashboard';
import DeskDashboard from '../auth/pages/dashboard/DeskDashboard';
import SupportDashboard from '../auth/pages/dashboard/SupportDashboard';

const AppRoutingSetup = () => {
  return <Routes>
     <Route > 
        {/* Role-based dashboard routes */}
        <Route path="/AdminDashboard/:number" element={<AdminDashboard />} />
        <Route path="/UserDashboard/:number" element={<UserDashboard />} />
        <Route path="/DeskDashboard/:number" element={<DeskDashboard />} />
        <Route path="/SupportDashboard/:number" element={<SupportDashboard />} />
      </Route>
    <Route path="error/*" element={<ErrorsRouting />} />
    <Route path="auth/*" element={<AuthPage />} />
    <Route path="*" element={<Navigate to="/error/404" />} />
  </Routes>;
};
export { AppRoutingSetup };




// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from '../auth/pages/jwt/Login';
// import AdminDashboard from '';
// import UserDashboard from '../pages/dashboard/UserDashboard';
// import DeskDashboard from '../pages/dashboard/DeskDashboard';
// import SupportDashboard from '../pages/dashboard/SupportDashboard';
// import DeskDashboard from './../auth/pages/dashboard/DeskDashboard';
// import SupportDashboard from './../auth/pages/dashboard/SupportDashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//         <Route path="/desk-dashboard" element={<DeskDashboard />} />
//         <Route path="/support-dashboard" element={<SupportDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
