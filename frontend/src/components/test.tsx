import React, { useEffect } from 'react';
import axios from 'axios';

const Test: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5052/api/v1/users');
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Component</h1>
      {/* You can add more JSX here if needed */}
    </div>
  );
};

export default Test;
