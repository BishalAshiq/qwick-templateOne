import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert } from '@/components';

const loginSchema = Yup.object().shape({
  number: Yup.string()
    .matches(/^\d+$/, 'Only numeric values are allowed')
    .min(9, 'Number must be at least 9 digits')
    .required('Number is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().required('Role is required')
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const formik = useFormik({
    initialValues: { number: '', password: '', role: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setStatus(null);
    
      // Check if the phone number and password match the required values
      const correctPhoneNumber = '01611111111';
      const correctPassword = '1111';
    
      if (values.number !== correctPhoneNumber || values.password !== correctPassword) {
        setStatus('Invalid phone number or password');
        setLoading(false);
        return;
      }
    
      const apiEndpoints = {
        Admin: 'https://qwikit1.pythonanywhere.com/adminProfile/',
        User: 'https://qwikit1.pythonanywhere.com/dietitianProfile/',
        Desk: 'https://qwikit1.pythonanywhere.com/deskProfile/',
        Support: 'https://qwikit1.pythonanywhere.com/supportProfile/'
      };
    
      try {
        const response = await fetch(
          `${apiEndpoints[values.role]}?phonenumber=${values.number}&password=${values.password}`, 
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        );
    
        if (!response.ok) {
          setStatus('Invalid phone number or password');
          setLoading(false);
          return;
        }
    
        const userProfileData = await response.json();
        const userProfile = Array.isArray(userProfileData) ? userProfileData[0] : userProfileData;
        console.log("Received User Profile:", userProfile);
    
        if (userProfile && userProfile.user_type) {
          const pathMap = {
            Admin: `/adminDashboard/${userProfile.phonenumber}`,
            Dietitians: `/userDashboard/${userProfile.phonenumber}`,
            Desk: `/deskDashboard/${userProfile.phonenumber}`,
            Support: `/supportDashboard/${userProfile.phonenumber}`
          };
          
    
          const redirectPath = pathMap[userProfile.user_type];
          if (redirectPath) {
            console.log(`Navigating to ${redirectPath}`);
            navigate(redirectPath);  // Confirm if this console.log runs
          } else {
            setStatus('Login failed: Unknown user type');
          }
        } else {
          setStatus('Invalid phone number or password');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setStatus('An error occurred. Please try again.');
      }
    
      setLoading(false);
    }
    
  });

  return (
    <div className="card max-w-[390px] w-full">
      <form className="card-body flex flex-col gap-5 p-10" onSubmit={formik.handleSubmit} noValidate>
        {status && <Alert variant="danger">{status}</Alert>}

        <TextField
          label="Number"
          {...formik.getFieldProps('number')}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        />

        <TextField
          label="Password"
          type="password"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <FormControl required fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            {...formik.getFieldProps('role')}
            error={formik.touched.role && Boolean(formik.errors.role)}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Desk">Desk</MenuItem>
            <MenuItem value="Support">Support</MenuItem>
          </Select>
          {formik.touched.role && formik.errors.role && <div className="text-danger">{formik.errors.role}</div>}
        </FormControl>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;

