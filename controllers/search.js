document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const cards = document.querySelectorAll(".card");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase().trim();

        cards.forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            const description = card.querySelector(".card-text").textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
