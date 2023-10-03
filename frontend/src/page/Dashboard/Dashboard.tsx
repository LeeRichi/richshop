import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/tokenStorage';
import {
  Container,
  Typography,
} from "@mui/material";
import getUserDetails from '../../utils/getUserDetails'; //API call
import UserDetails from '../../interface/UserDetails';
import DashboardAdmin from './DashboardAdmin';
import DashboardUser from './DashboardUser';
import { updateUserDetails } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

const Dashboard = () => {
  const token: string | null | undefined = getToken();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userDetails = useSelector((state: RootState) => state.user.userDetails);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const userDetails = await getUserDetails(token);
          dispatch(updateUserDetails(userDetails)); // Dispatch action with fetched data
          console.log(userDetails);
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {userDetails && userDetails.role === 'Admin' ? (
            <DashboardAdmin userDetails={userDetails} />
          ) : userDetails && userDetails.role === 'User' ? (
            <DashboardUser userDetails={userDetails} />
          ) : (
            <Typography>User details not available.</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
