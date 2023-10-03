import React from 'react'
import { Typography } from "@mui/material";
import UserDetails from '../../interface/UserDetails';

interface DashboardUserProps {
  userDetails: UserDetails;
}

const DashboardUser: React.FC<DashboardUserProps> = ({ userDetails }) => {
  return (
    <>
        <Typography variant="h4" align="center" gutterBottom>
        Hi, {userDetails.name}, welcome back!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
        Your UserID: {userDetails.id}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
        Name: {userDetails.name}
        </Typography>
        <img src={userDetails.avatar} alt={`avatar`} width="100" style={{ cursor: 'pointer', borderRadius: '50%' }} />
        <Typography variant="body1" align="center" gutterBottom>
        Address: {userDetails.address}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
        Email: {userDetails.email}
        </Typography>
    </>
  )
}

export default DashboardUser