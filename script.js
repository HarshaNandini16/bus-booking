let selectedSeats = [];

function searchBus() {
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    let busList = document.getElementById("busList");
    busList.innerHTML = `<p>Bus available from ${from} to ${to} at 10:00 AM</p>`;

    loadSeats();
}

function loadSeats() {
    let seatContainer = document.getElementById("seats");
    seatContainer.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        let seat = document.createElement("div");
        seat.classList.add("seat");
        seat.innerText = i;

        seat.onclick = function () {
            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected");
                selectedSeats = selectedSeats.filter(s => s !== i);
            } else {
                seat.classList.add("selected");
                selectedSeats.push(i);
            }
        };

        seatContainer.appendChild(seat);
    }
}

function bookTicket() {
    if (selectedSeats.length === 0) {
        alert("Select seats first!");
        return;
    }

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(selectedSeats);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking Successful!");
    selectedSeats = [];
    loadSeats();
    showHistory();
}

function showHistory() {
    let history = document.getElementById("history");
    history.innerHTML = "";

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.forEach((b, index) => {
        let li = document.createElement("li");
        li.innerText = `Booking ${index + 1}: Seats ${b.join(", ")}`;
        history.appendChild(li);
    });
}

window.onload = showHistory;
