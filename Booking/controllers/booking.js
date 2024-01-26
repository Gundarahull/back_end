const path = require('path')

const fs = require('fs');
const booking = require('../models/booking_model');

exports.getadddetails = (req, res, next) => {
    console.log("product");
    res.sendFile(path.join(__dirname, '../', 'views', 'booking.html'))
}


exports.bookingdetails = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'redirect.html'))
    console.log("posyed");
    const Username = req.body.user;
    console.log(Username);
    const MAIL = req.body.mail;
    const PhoneNumber = req.body.phone;
    booking.create({
        Username: Username,
        PhoneNumber: PhoneNumber,
        Email: MAIL,
    }).then((result => {
        console.log("succesfully ADDED THE PRODUCT in postaddproduct");
        res.redirect('/admin');
    })).catch((err) => {
        console.log(err);
    })
}


exports.getIndex = (req, res, next) => {
    booking.findAll({
        attributes: ['id', 'Username', 'PhoneNumber', 'Email']
    }) // Specify attributes to retrieve
        .then(bookings => {
            // Prepare HTML string
            let html = '<!DOCTYPE html>';
            html += '<html lang="en">';
            html += '<head>';
            html += '<meta charset="UTF-8">';
            html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
            html += '<title>Bookings</title>';
            html += '</head>';
            html += '<body>';
            html += '<h1>Bookings</h1>';
            html += '<ul id="bookingList">'; // Add an id to the <ul> element

            // Loop through each booking and generate HTML list items
            bookings.forEach(booking => {
                html += '<li id="booking_' + booking.id + '">'; // Add an id to each <li> element
                html += 'ID: ' + booking.id + '<br>';
                html += 'Username: ' + booking.Username + '<br>';
                html += 'Phone Number: ' + booking.PhoneNumber + '<br>';
                html += 'Email: ' + booking.Email + '<br>';
                html += '<button onclick="editBooking(' + booking.id + ')">Edit</button>';
                // html += '<button onclick="deleteBooking(' + booking.id + ')">Delete</button>';
                // html += '</li>';
                html += '<button onclick="deleteBooking(' + booking.id + ')">Delete</button>';

                html += '<script>';
                html += 'function deleteBooking(id) { ';
                html += 'fetch("/deleteBooking/" + id, { method: "DELETE" })';
                html += '.then(response => {';
                html += 'if (!response.ok) { throw new Error("Failed to delete booking."); }';
                html += 'return response.json();';
                html += '})';
                html += '.then(data => {';
                html += 'console.log("Booking deleted successfully:", data);';
                html += 'var li = document.getElementById("booking_" + id);';
                html += 'li.parentNode.removeChild(li);';
                html += '})';
                html += '.catch(error => {';
                html += 'console.error("Error deleting booking:", error);';
                html += '});';
                html += '}';
                html += '</script>';
                html += '</body>';
                html += '</html>';
            })

            // Send the HTML response
            res.send(html);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        });
};

exports.postDeleteBooking = (req, res, next) => {
    const bookingId = req.params.id; // Extracting bookingId from URL parameters

    booking.findByPk(bookingId)
        .then((booking) => {
            if (!booking) {
                return res.status(404).json({ message: "Booking not found." });
            }
            return booking.destroy(); // Delete the booking
        })
        .then(() => {
            console.log("Deleted booking with ID:", bookingId);
            res.status(200).json({ message: "Booking deleted successfully." });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

// exports.postDeleteBooking = (req, res, next) => {
//     console.log("welocome to delete");
//     const bookingId = req.body.phone
//     console.log(bookingId); // Assuming the ID of the booking to delete is provided in the request body
//     booking.findByPk(bookingId) // Assuming 'booking' is your Sequelize model
//         .then((appointments) => {
//             return appointments.destroy(); // Delete the booking
//         })
//         .then(() => {
//             console.log("Deleted booking with ID:", bookingId);
//             res.redirect('/'); // Redirect to the desired route after deletion
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             res.status(500).send('Internal Server Error');
//         });
// };