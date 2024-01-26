document.addEventListener('DOMContentLoaded', function() {
    // Fetch data and populate HTML elements
    fetchBookings();

    // Define the function to fetch bookings and populate HTML elements
    function fetchBookings() {
        fetch('/bookings')
            .then(response => response.json())
            .then(bookings => {
                // Get the list element to populate
                const list = document.getElementById('bookingList');
                
                // Clear existing content
                list.innerHTML = '';

                // Loop through each booking and generate HTML list items
                bookings.forEach(booking => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <span>ID: ${booking.id}</span><br>
                        <span>Username: ${booking.username}</span><br>
                        <span>Phone Number: ${booking.phone_number}</span><br>
                        <span>Email: ${booking.email}</span><br>
                        <button onclick="editBooking(${booking.id})">Edit</button>
                        <button onclick="deleteBooking(${booking.id})">Delete</button>
                        <br><br>
                    `;
                    list.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Define the editBooking and deleteBooking functions
    function editBooking(id) {
        // Logic to handle editing the booking with the given ID
        console.log('Editing booking with ID:', id);
    }

    function deleteBooking(id) {
        // Logic to handle deleting the booking with the given ID
        console.log('Deleting booking with ID:', id);
    }
});
