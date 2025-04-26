export function generateUniqueId() {
    return 'plant-' + Math.random().toString(36).substr(2, 9);
}

export function formatPlantData(plant) {
    return {
        id: plant.id,
        name: plant.name.charAt(0).toUpperCase() + plant.name.slice(1),
        watered: plant.watered, 
        lastWatered: plant.lastWatered ? new Date(plant.lastWatered) : null,
    }
}