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
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const token: string | null | undefined = getToken();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const userDetails = await getUserDetails(token);
          dispatch(updateUserDetails(userDetails)); // Dispatch action with fetched data
          console.log(userDetails.role);
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

  console.log(userDetails)

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
