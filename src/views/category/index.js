import { useState } from 'react';
// import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
// import Cookies from 'js-cookie';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  // Checkbox,
  // Divider,
  FormControl,
  // FormControlLabel,
  FormHelperText,
  Grid,
  // Grid,
  // IconButton,
  // InputAdornment,
  InputLabel,
  OutlinedInput
  // Stack,
  // Typography,
  // useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const Category = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  // const [checked, setChecked] = useState(true);

  const [nameCateg, setNameCateg] = useState('');

  const navigate = useNavigate();

  // const googleHandler = async () => {
  //   console.error('Login');
  // };

  // const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleNameChange = (event) => {
    setNameCateg(event.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('https://culturereposteam-production.up.railway.app/api/category', {
        name: nameCateg
      });

      if (response.status == 200) {
        navigate('/home/category');
      }
      // Redirect or perform other actions after successful login
    } catch (error) {
      // Handle login error
      console.error('Insertion failed');
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          nameCateg: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          nameCateg: Yup.string().max(255).required('Category Name is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleSubmit, touched }) => (
          <Grid container direction="column" justifyContent="center" spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <form noValidate onSubmit={handleSubmit} {...others}>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">New Category Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    value={nameCateg}
                    name="nameCateg"
                    onBlur={handleBlur}
                    onChange={handleNameChange}
                    label="Category Name"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button onClick={handleSave} fullWidth size="large" type="submit" variant="contained" color="secondary">
                      Insert
                    </Button>
                  </AnimateButton>
                </Box>
              </form>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        )}
      </Formik>
    </>
  );
};

export default Category;
