let selectedSeats = [];
let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

function searchBus() {
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    document.getElementById("busList").innerHTML = `
        <div class="bus-card">
            <h3>${from} → ${to}</h3>
            <p>AC Sleeper | ₹500</p>
            <button onclick="loadSeats()">Select Seats</button>
        </div>
    `;
}

function loadSeats() {
    let layout = document.getElementById("busLayout");
    layout.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        let seat = document.createElement("div");
        seat.classList.add("seat");
        seat.innerText = i;

        if (bookedSeats.includes(i)) {
            seat.classList.add("booked");
        }

        seat.onclick = function () {
            if (seat.classList.contains("booked")) return;

            seat.classList.toggle("selected");

            if (selectedSeats.includes(i)) {
                selectedSeats = selectedSeats.filter(s => s !== i);
            } else {
                selectedSeats.push(i);
            }
        };

        layout.appendChild(seat);
    }
}

function bookTicket() {
    if (selectedSeats.length === 0) {
        alert("Select seats!");
        return;
    }

    bookedSeats = [...bookedSeats, ...selectedSeats];
    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

    let history = JSON.parse(localStorage.getItem("history")) || [];

    let ticket = {
        seats: selectedSeats,
        date: new Date().toLocaleString()
    };

    history.push(ticket);
    localStorage.setItem("history", JSON.stringify(history));

    document.getElementById("ticket").innerHTML = `
        <h3>🎟 Ticket Confirmed</h3>
        <p>Seats: ${selectedSeats.join(", ")}</p>
        <p>Date: ${ticket.date}</p>
    `;

    selectedSeats = [];
    loadSeats();
    showHistory();
}

function showHistory() {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let container = document.getElementById("history");

    container.innerHTML = "";

    history.forEach((h, i) => {
        container.innerHTML += `
            <p>Booking ${i + 1}: Seats ${h.seats.join(", ")} (${h.date})</p>
        `;
    });
}

window.onload = showHistory;
