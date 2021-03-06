document.addEventListener("DOMContentLoaded", (e) => {
    const symbol = document.getElementById("symbol");
    const data_container = document.getElementById("data-container");

    const name_container = document.getElementById("name-container");
    const price_container = document.getElementById("price-container");
    const symbol_container = document.getElementById("symbol-container");

    data_container.style.display = "none";

    symbol.addEventListener("keyup", (e) => {
        // POST request using fetch()
        fetch("/stock-info", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify({
                    symbol: symbol.value,
                }),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            // Converting to JSON
            .then(response => response.json())
            // Displaying information to its container
            .then((data) => {
                if (data) {
                    data_container.style.display = "block";
                    const {
                        name,
                        price,
                        symbol
                    } = data;
                    name_container.innerHTML = name ? name : "-";
                    price_container.innerHTML = price ? `$${price}` : "0.00";
                    symbol_container.innerHTML = symbol ? symbol : "-";
                } else {
                    data_container.style.display = "none";
                    name_container.innerHTML = "-";
                    price_container.innerHTML = "0.00";
                    symbol_container.innerHTML = "-";
                }
            })
            .catch(console.warn);
    });
});