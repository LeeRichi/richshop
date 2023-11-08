import { Button, InputBase, useMediaQuery } from '@mui/material';

const NewsLetterForm = () =>
{
  const isSmallDevice = useMediaQuery('(max-width:900px)');
    
  return (
   <div style={{
      flexDirection: isSmallDevice ? 'column' : 'row',
      width: '100%',
      minHeight: '100px',
      height: isSmallDevice ? '200px' : '100px',    
      backgroundColor: '#f5a623',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '10px',
      marginTop: '10px'
      }}>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Join our crew
            </div>
            <div style={{ fontSize: '20px', marginTop: '15px' }}>
            Get exclusive promotion codes and be the first to know about our offers!
            </div>
        </div>
        <form onSubmit={() => (console.log('Upcoming feature'))} style={{ display: 'flex', alignItems: 'center' }}>
            <InputBase
            placeholder="Enter your email"
            inputProps={{ 'aria-label': 'search' }}
            style={{
                borderBottom: '1px solid white',
                backgroundColor: 'transparent',
                color: 'white',
                marginRight: '10px',
                width: isSmallDevice ? '250px':'500px',
            }}
            />
            <Button variant="outlined" style={{ border: '1px solid white', color: 'white', cursor: 'pointer', backgroundColor: 'transparent', boxShadow: 'none' }}>
            Sign up
            </Button>
        </form>
    </div>
  );
}

export default NewsLetterForm;
