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

const Ressource = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  // const [checked, setChecked] = useState(true);

  const [nameRessource, setNameRessource] = useState('');
  const [price, setPrice] = useState(0);

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
    setNameRessource(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSave = async () => {
    console.log('hehe');
    try {
      const response = await axios.post('https://d3ds3c.me/api/ressource', {
        name: nameRessource,
        pricePerUnit: price
      });

      if (response.status == 200) {
        navigate('/home/ressource');
      }
      // Redirect or perform other actions after successful login
    } catch (error) {
      // Handle login error
      console.error('Insertion failed');
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          nameRessource: '',
          pricePerUnit: 0,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          nameRessource: Yup.string().max(255).required('Ressource Name is required'),
          pricePerUnit: Yup.number().required('Price Per Unit is required')
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
                  <InputLabel htmlFor="outlined-adornment-email-login">New Ressource Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    value={nameRessource}
                    name="nameRessource"
                    onBlur={handleBlur}
                    onChange={handleNameChange}
                    label="Ressource Name"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Price Per Unit</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="number"
                    value={price}
                    name="price"
                    onBlur={handleBlur}
                    onChange={handlePriceChange}
                    label="Price"
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

export default Ressource;
