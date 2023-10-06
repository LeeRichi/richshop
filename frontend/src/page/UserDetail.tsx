import { useParams } from 'react-router-dom';
import { Typography } from "@mui/material";
import { RootState } from '../app/rootReducer';
import { useSelector } from 'react-redux';

const UserDetail = () => {
    const { id } = useParams();
    const users = useSelector((state: RootState) => state.allUser.users);
    const user = users?.find((user) => user.id === id);

    const orders = useSelector((state: RootState) => state.order.orders);
    console.log(orders)
    const order = orders?.find((order) => order.userId === id);
    console.log(order)


    console.log(user);

    if (!user) {
        return <Typography variant="body1" align="center">User not found.</Typography>;
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body1" align="center" gutterBottom>
                    User Id: {user.id}
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Name: {user.name}
                </Typography>
                <img src={user.avatar} alt={`avatar`} width="100" style={{ cursor: 'pointer', borderRadius: '50%' }} />
                <Typography variant="body1" align="center" gutterBottom>
                    Address: {user.address}
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Email: {user.email}
                </Typography>
            </div>
        </>
    );
}

export default UserDetail;
