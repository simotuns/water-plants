import React, { useEffect, useRef } from 'react';
import PlantList from './components/PlantList'; // Import the PlantList class
import PlantCard from './components/PlantCard'; // Import the PlantCard class
import { generateUniqueId, formatPlantData } from './utils/helper'; // Import helper functions
import './styles/styles.css'; // Import the CSS file

const App = () => {
  const plantListRef = useRef(new PlantList()); // Create a PlantList instance

  const addPlant = () => {
    const plantName = prompt('Enter plant name:');
    const plantSpecies = prompt('Enter plant species:');
    if (plantName && plantSpecies) {
      // Generate a unique ID for the plant
      const plantId = generateUniqueId();

      // Create a new PlantCard instance with the unique ID
      const plantCard = new PlantCard(plantName, plantSpecies);
      plantCard.id = plantId;

      // Format the plant data (optional, for consistency)
      const formattedPlant = formatPlantData({
        id: plantId,
        name: plantName,
        species: plantSpecies,
        watered: false,
        lastWatered: null,
      });

      console.log('Formatted Plant:', formattedPlant); // Debugging: Log the formatted plant data

      plantListRef.current.addPlant(plantCard); // Add the PlantCard to the PlantList
      renderPlantList(); // Re-render the plant list
    }
  };

  const renderPlantList = () => {
    const container = document.getElementById('plant-list-container');
    if (container) {
      container.innerHTML = ''; // Clear the container
      const plantListElement = plantListRef.current.render(); // Render the PlantList
      container.appendChild(plantListElement); // Append the rendered list to the container
    }
  };

  useEffect(() => {
    renderPlantList(); // Initial render of the plant list
  }, []);

  return (
    <div>
      <h1>Plant Watering App</h1>
      <button onClick={addPlant}>Add Plant</button>
      <div id="plant-list-container"></div> {/* Container for the plant list */}
    </div>
  );
};

export default App;