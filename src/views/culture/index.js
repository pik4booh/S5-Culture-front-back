import { useState, useEffect } from 'react';
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
  OutlinedInput,
  // Stack,
  // Typography,
  // useMediaQuery
  Select,
  MenuItem
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

const Culture = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  // const [checked, setChecked] = useState(true);

  const [nameCulture, setNameCulture] = useState('');
  const [seedQuantity, setSeedQuantity] = useState(0);
  const [yieldQuantity, setYieldQuantity] = useState(0);
  const [unit, setUnit] = useState(0);
  const [seedPrice, setSeedPrice] = useState(0);
  const [yieldPrice, setYieldPrice] = useState(0);
  const [groundType, setGroundType] = useState(0);
  const [category, setCategory] = useState(0);

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
    setNameCulture(event.target.value);
  };

  const handleSeedQteChange = (event) => {
    setSeedQuantity(event.target.value);
  };

  const handleYieldQteChange = (event) => {
    setYieldQuantity(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleSeedPriceChange = (event) => {
    setSeedPrice(event.target.value);
  };

  const handleYieldPriceChange = (event) => {
    setYieldPrice(event.target.value);
  };

  const handleTypeChange = (event) => {
    setGroundType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const [groundTypes, setGroundTypes] = useState([]);
  // const [groundType, setGroundType] = useState('');

  useEffect(() => {
    console.log(category);
  }, [category]);

  useEffect(() => {
    // Fetch data from the database using Axios
    axios
      .get('http://localhost:8080/api/groundtypes')
      .then((response) => {
        // Assuming your data is an array of objects with id and name properties
        console.log(response.data);
        setGroundTypes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ground types:', error);
      });
  }, []);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch data from the database using Axios
    axios
      .get('http://localhost:8080/api/categories')
      .then((response) => {
        // Assuming your data is an array of objects with id and name properties
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/culture', {
        name: nameCulture,
        seedQuantity: seedQuantity,
        yieldQuantity: yieldQuantity,
        unit: unit,
        seedPrice: seedPrice,
        yieldPrice: yieldPrice,
        category: {
          idCategory: category
        },
        groundType: {
          idGroundType: groundType
        },
        submit: null
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
          nameRessource: '',
          seedQuantity: 0,
          yieldQuantity: 0,
          unit: 0,
          seedPrice: 0,
          yieldPrice: 0,
          category: 0,
          groundType: 0,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          nameRessource: Yup.string().max(255).required('Name is required'),
          seedQuantity: Yup.number().required('SeedQuantity is required'),
          yieldQuantity: Yup.number().required('YieldQuantity is required'),
          unit: Yup.number().required('Unit is required'),
          seedPrice: Yup.number().required('SeedPrice is required'),
          yieldPrice: Yup.number().required('YieldPrice is required'),
          groundType: Yup.number().required('GroundType is required'),
          category: Yup.number().required('Category is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            handleLogin();
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
                  <InputLabel htmlFor="outlined-adornment-email-login">New Culture Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    value={nameCulture}
                    name="nameCulture"
                    onBlur={handleBlur}
                    onChange={handleNameChange}
                    label="Name Culture"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Seed Quantity</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="number"
                    value={seedQuantity}
                    name="seedQuantity"
                    onBlur={handleBlur}
                    onChange={handleSeedQteChange}
                    label="Seed Quantity"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Yield Quantity</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="number"
                    value={yieldQuantity}
                    name="yieldQuantity"
                    onBlur={handleBlur}
                    onChange={handleYieldQteChange}
                    label="Yield Quantity"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Unit</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="number"
                    value={unit}
                    name="unit"
                    onBlur={handleBlur}
                    onChange={handleUnitChange}
                    label="Unit"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Seed Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="number"
                    value={seedPrice}
                    name="seedPrice"
                    onBlur={handleBlur}
                    onChange={handleSeedPriceChange}
                    label="Seed Price"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Yield Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="number"
                    value={yieldPrice}
                    name="yieldPrice"
                    onBlur={handleBlur}
                    onChange={handleYieldPriceChange}
                    label="Yield Price"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Ground Types</InputLabel>
                  <Select
                    id="outlined-adornment-email-login"
                    name="groundType"
                    onBlur={handleBlur}
                    onChange={handleTypeChange}
                    label="Ground Types"
                    input={<OutlinedInput />}
                  >
                    {/* Map data to MenuItem components */}
                    {groundTypes.map((ground) => (
                      <MenuItem key={ground.idGroundType} value={ground.idGroundType}>
                        {ground.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Category</InputLabel>
                  <Select
                    id="outlined-adornment-email-login"
                    name="category"
                    onBlur={handleBlur}
                    onChange={handleCategoryChange}
                    label="Category"
                    input={<OutlinedInput />}
                  >
                    {/* Map data to MenuItem components */}
                    {categories.map((ground) => (
                      <MenuItem key={ground.idCategory} value={ground.idCategory}>
                        {ground.name}
                      </MenuItem>
                    ))}
                  </Select>
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

export default Culture;
