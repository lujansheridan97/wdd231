import { fetchData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submittedDataElement = document.getElementById('submitted-data');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    form.addEventListener('submit', handleFormSubmit);

    // Close modal functionality
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    async function handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Display form data on the page
        submittedDataElement.innerHTML = `
            Name: ${name} <br>
            Email: ${email} <br>
            Message: ${message}
        `;
        
        // Store data in localStorage
        localStorage.setItem('userData', JSON.stringify({ name, email, message }));

        // Show modal
        modal.style.display = 'block';

        // Fetch JSON data asynchronously
        await displayFetchedData();
    }

    async function displayFetchedData() {
        try {
            const data = await fetchData();
            const dataContainer = document.createElement('div');
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `
                    <p><strong>${item.name}</strong></p>
                    <p>${item.description}</p>
                    <p>Price: $${item.price}</p>
                `;
                dataContainer.appendChild(itemDiv);
            });
            document.body.appendChild(dataContainer);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});
