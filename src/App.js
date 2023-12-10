import React from 'react';
import Header from './Header';
import CalculateTollButton from './CalculateTollButton';
import TollMap from './TollMap';

function App() {
  const [tollData, setTollData] = React.useState(null);

  const handleCalculateToll = async () => {
    const startLocation = 'StartLocation'; // Replace with actual user input
    const endLocation = 'EndLocation'; // Replace with actual user input

    const apiKey = 'your-api-key'; // Replace with your TollGuru API key
    const data = await calculateTollCost(startLocation, endLocation, apiKey);

    setTollData(data);
  };

  const calculateTollCost = async (startLocation, endLocation, apiKey) => {
    const apiUrl = `https://api.tollguru.com/v1/calculate?from=${startLocation}&to=${endLocation}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching toll data:', error);
      return null;
    }
  };

  return (
    <div>
      <Header />
      <CalculateTollButton onClick={handleCalculateToll} />
      {tollData && <TollMap route={tollData.route} />}
    </div>
  );
}

export default App;
