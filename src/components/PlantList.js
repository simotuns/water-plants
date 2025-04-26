class PlantList {

    constructor(){
        this.plants = [];
    }

    addPlant(plant) {
        this.plants.push(plant);
    }

    render() {
        const plantListContainer = document.createElement('div'); // Create a container for the plant list
        plantListContainer.className = 'plant-list-container'; // Add a class to the container
        plantListContainer.innerHTML = ''; // Clear any existing content in the container
        this.plants.forEach(plant => {
            const plantCard = plant.render(); // Call the `render` method of each plant (assumes each plant is an instance of `PlantCard`)
            plantListContainer.appendChild(plantCard); // Append the rendered plant card to the container
        });
        return plantListContainer; // Return the container with all the plant cards
    }
}

export default PlantList;