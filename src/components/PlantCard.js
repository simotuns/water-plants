class PlantCard {
    constructor(name, species, image = null) {
        this.name = name;
        this.species = species;
        this.image = image; // Store the uploaded image as a property
        this.watered = false;
        this.lastWatered = null; // Store the last watered time
        this.nextWateringInterval = null; // Store the interval for the countdown
    }

    render() { 
        const card = document.createElement('div');
        card.className = 'plant-card';
        card.innerHTML = `
            <h2>${this.name}</h2>
            <p>Species: ${this.species}</p>
            ${this.image ? `<img src="${this.image}" alt="${this.name}" class="plant-image" />` : ''}
            <p class="last-watered">${this.watered ? `Last watered: ${this.lastWatered}` : ''}</p>
            <p class="next-watering"></p>
            <button class="upload-image-button">Upload Image</button>
            <button class="water-button">Water</button>
        `;

        // Add event listener for the "Upload Image" button
        card.querySelector('.upload-image-button').addEventListener('click', () => this.uploadImage(card));

        // Add event listener for the "Water" button
        card.querySelector('.water-button').addEventListener('click', () => this.water(card));

        return card;
    }

    uploadImage(card) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result; // Store the uploaded image as a Base64 string
                    this.updateImage(card); // Update the card with the new image
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    }

    updateImage(card) {
        const imgElement = card.querySelector('.plant-image');
        if (imgElement) {
            imgElement.src = this.image; // Update the existing image
        } else {
            const newImgElement = document.createElement('img');
            newImgElement.src = this.image;
            newImgElement.alt = this.name;
            newImgElement.className = 'plant-image';
            card.insertBefore(newImgElement, card.querySelector('.last-watered')); // Insert the image before the "last watered" text
        }
    }

    water(card) {
        this.watered = true;
        this.lastWatered = new Date().toLocaleString(); // Record the current date and time
        this.updateWateredStatus(card);
        this.startCountdown(card); // Start the 24-hour countdown
    }

    updateWateredStatus(card) {
        const lastWateredElement = card.querySelector('.last-watered');
        if (lastWateredElement) {
            lastWateredElement.textContent = `Last watered: ${this.lastWatered}`; // Update the text content
        }
    }

    startCountdown(card) {
        const nextWateringElement = card.querySelector('.next-watering');
        const nextWateringTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

        if (this.nextWateringInterval) {
            clearInterval(this.nextWateringInterval); // Clear any existing interval
        }

        this.nextWateringInterval = setInterval(() => {
            const timeLeft = nextWateringTime - Date.now();
            if (timeLeft <= 0) {
                clearInterval(this.nextWateringInterval); // Stop the countdown when it reaches 0
                nextWateringElement.textContent = 'Time to water the plant!';
            } else {
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                nextWateringElement.textContent = `Next watering in: ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000); // Update every second
    }
}

export default PlantCard;