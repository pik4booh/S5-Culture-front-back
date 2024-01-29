// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  // Button,
  // Card,
  // CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  // Stack,
  Typography
} from '@mui/material';

import { useState } from 'react';
import axios from 'axios';

// assets
// import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = (props) => {
  const theme = useTheme();

  const chipSX = {
    height: 24,
    padding: '0 6px'
  };
  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRight: '5px'
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light
  };

  // const chipSuccessSX = {
  //   ...chipSX,
  //   color: theme.palette.success.dark,
  //   backgroundColor: theme.palette.success.light,
  //   height: 28
  // };

  // const [notifications, setNotif] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the database using Axios
  //   axios
  //     .get('http://localhost:8080/api/notifications')
  //     .then((response) => {
  //       // Assuming your data is an array of objects with id and name properties
  //       console.log(response.data);
  //       setNotif(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching categories:', error);
  //     });
  // }, []);

  const handleSave = async (hashcode) => {
    try {
      const response = await axios.get('https://culturereposteam-production.up.railway.app/api/validate?hashcode=' + hashcode, {});

      if (response.status == 200) {
        // navigate('/home/category');
        console.log('Insertion success');
        setRemovedChips([...removedChips, hashcode]);
      }
      // Redirect or perform other actions after successful login
    } catch (error) {
      // Handle login error
      console.error('Insertion failed');
      console.error(error);
    }
  };

  const handleRemove = async (hashcode) => {
    try {
      const response = await axios.get('https://culturereposteam-production.up.railway.app/api/refuse?hashcode=' + hashcode, {});

      if (response.status == 200) {
        // navigate('/home/category');
        console.log('Delete success');
        setRemovedChips([...removedChips, hashcode]);
      }
      // Redirect or perform other actions after successful login
    } catch (error) {
      // Handle login error
      console.error('Delete failed');
      console.error(error);
    }
  };

  const [removedChips, setRemovedChips] = useState([]);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 330,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22
        },
        '& .MuiDivider-root': {
          my: 0
        },
        '& .list-container': {
          pl: 7
        }
      }}
    >
      <>
        {props.notif.map(
          (notif) =>
            !removedChips.includes(notif.hashcode) && (
              <div key={notif.hashcode}>
                <ListItemWrapper>
                  <ListItem alignItems="center">
                    <ListItemAvatar>
                      <Avatar alt={notif.name} src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={notif.name} />
                    <ListItemSecondaryAction>
                      <Grid container justifyContent="flex-end">
                        <Grid item xs={12}>
                          <Typography variant="caption" display="block" gutterBottom>
                            2 min ago
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                      <Typography variant="subtitle2">send a request for validation of the field identified by Hashcode=</Typography>
                      <Typography variant="subtitle2"> {notif.hashcode}</Typography>
                      <Typography variant="subtitle2">
                        Localisation: lat({notif.latitude}) by long({notif.longitude})
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item>
                          <Chip label="Validate" sx={chipErrorSX} onClick={() => handleSave(notif.hashcode)} />
                        </Grid>
                        <Grid item>
                          <Chip label="Refuse" sx={chipWarningSX} onClick={() => handleRemove(notif.hashcode)} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItemWrapper>
                <Divider />
              </div>
            )
        )}
      </>
      {/* <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{
                color: theme.palette.success.dark,
                backgroundColor: theme.palette.success.light,
                border: 'none',
                borderColor: theme.palette.success.main
              }}
            >
              <IconBuildingStore stroke={1.5} size="1.3rem" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Store Verification Done</Typography>} />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">We have successfully received your request.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="Unread" sx={chipErrorSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{
                color: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light,
                border: 'none',
                borderColor: theme.palette.primary.main
              }}
            >
              <IconMailbox stroke={1.5} size="1.3rem" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Check Your Mail.</Typography>} />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">All done! Now check your inbox as you&apos;re in for a sweet treat!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Button variant="contained" disableElevation endIcon={<IconBrandTelegram stroke={1.5} size="1.3rem" />}>
                  Mail
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={User1} />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography component="span" variant="subtitle2">
              Uploaded two file on &nbsp;
              <Typography component="span" variant="h6">
                21 Jan 2020
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.secondary.light
                  }}
                >
                  <CardContent>
                    <Grid container direction="column">
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={2}>
                          <IconPhoto stroke={1.5} size="1.3rem" />
                          <Typography variant="subtitle1">demo.jpg</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={User1} />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="Confirmation of Account." sx={chipSuccessSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper> */}
    </List>
  );
};

export default NotificationList;
