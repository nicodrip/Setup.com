document.addEventListener("DOMContentLoaded", function () {
    const catalogGrid = document.querySelector(".catalog-grid");
    const paginationContainer = document.querySelector(".pagination");
    const searchInput = document.querySelector(".catalog-search");
    const categorySelect = document.getElementById("category");
    const sortSelect = document.getElementById("sort");

    let gameCards = Array.from(document.querySelectorAll(".game-card"));
    const itemsPerPage = 6;
    let currentPage = 1;
    let filteredCards = [...gameCards];

    updateDisplay();

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            filteredCards.forEach(item => item.setAttribute('style', ''));
            filterCards();
            currentPage = 1;
            updateDisplay();
        });
    }

    function closeAllSelect(elmnt) {
        const selectItems = document.getElementsByClassName("select-items");
        const selectSelected = document.getElementsByClassName("select-selected");

        for (let i = 0; i < selectSelected.length; i++) {
            if (elmnt !== selectSelected[i]) {
                selectSelected[i].classList.remove("select-arrow-active");
            }
        }

        for (let i = 0; i < selectItems.length; i++) {
            if (elmnt !== selectItems[i] && elmnt !== selectSelected[i]) {
                selectItems[i].classList.add("select-hide");
            }
        }
    }

    function filterCards() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const category = categorySelect ? categorySelect.value : "all";

        filteredCards = gameCards.filter(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();
            const cardTag = card.querySelector(".game-tag").textContent.toLowerCase();

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);

            let matchesCategory = true;
            if (category !== "all") {
                matchesCategory = false;

                if (category === "fps" && (title.includes("counter") || title.includes("call of duty") ||
                    title.includes("valorant") || title.includes("apex"))) {
                    matchesCategory = true;
                } else if (category === "battle-royale" && (title.includes("fortnite") || title.includes("pubg") ||
                    title.includes("apex"))) {
                    matchesCategory = true;
                } else if (category === "rpg" && (title.includes("genshin") || title.includes("minecraft"))) {
                    matchesCategory = true;
                } else if (category === "racing" && title.includes("forza")) {
                    matchesCategory = true;
                } else if (category === "sandbox" && (title.includes("gta") || title.includes("minecraft"))) {
                    matchesCategory = true;
                }
            }

            return matchesSearch && matchesCategory;
        });

        sortCards();
    }

    function sortCards() {
        const sortBy = sortSelect ? sortSelect.value : "popular";

        filteredCards.sort((a, b) => {
            const downloadsA = getDownloads(a);
            const downloadsB = getDownloads(b);

            const ratingA = parseFloat(a.querySelector(".game-meta span:last-child").textContent.match(/\d+\.\d+/)[0]);
            const ratingB = parseFloat(b.querySelector(".game-meta span:last-child").textContent.match(/\d+\.\d+/)[0]);

            const tagA = a.querySelector(".game-tag").textContent;
            const tagB = b.querySelector(".game-tag").textContent;

            switch (sortBy) {
                case "popular":
                    return downloadsB - downloadsA;
                case "newest":
                    const isNewA = tagA === "NEW" || tagA === "UPDATED";
                    const isNewB = tagB === "NEW" || tagB === "UPDATED";
                    if (isNewA && !isNewB) return -1;
                    if (!isNewA && isNewB) return 1;
                    return downloadsB - downloadsA;
                case "rating":
                    return ratingB - ratingA;
                case "downloads":
                    return downloadsB - downloadsA;
                default:
                    return 0;
            }
        });
    }

    function getDownloads(card) {
        const downloadsText = card.querySelector(".game-meta span:first-child").textContent;
        const match = downloadsText.match(/(\d+(\.\d+)?)([K|M]?)/);

        if (match) {
            const value = parseFloat(match[1]);
            const unit = match[3];

            if (unit === 'K') {
                return value * 1000;
            } else if (unit === 'M') {
                return value * 1000000;
            } else {
                return value;
            }
        }

        return 0;
    }

    function updateDisplay() {
        gameCards.forEach(card => {
            card.style.display = "none";
            card.classList.remove("hidden");
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredCards.length);

        for (let i = startIndex; i < endIndex; i++) {
            if (filteredCards[i]) {
                filteredCards[i].style.display = "flex";
            }
        }

        if (filteredCards.length <= itemsPerPage) {
            paginationContainer.style.display = "none";
        } else {
            paginationContainer.style.display = "flex";
            updatePagination();
        }

        const noResults = document.querySelector(".no-results");
        if (filteredCards.length === 0) {
            if (!noResults) {
                const noResultsDiv = document.createElement("div");
                noResultsDiv.classList.add("no-results");
                noResultsDiv.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>No Results Found</h3>
                    <p>We couldn't find any games matching your search criteria.</p>
                `;
                catalogGrid.appendChild(noResultsDiv);
                catalogGrid.style.gridTemplateColumns = 'auto';
            }
            paginationContainer.style.display = "none";
        } else {
            if (noResults) {
                noResults.remove();
                catalogGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
            }
        }
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
        paginationContainer.innerHTML = "";

        const prevBtn = document.createElement("div");
        prevBtn.classList.add("pagination-btn");
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
        paginationContainer.appendChild(prevBtn);

        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            const firstBtn = document.createElement("div");
            firstBtn.classList.add("pagination-btn");
            firstBtn.textContent = "1";
            firstBtn.addEventListener("click", () => goToPage(1));
            paginationContainer.appendChild(firstBtn);

            if (startPage > 2) {
                const dotsBtn = document.createElement("div");
                dotsBtn.classList.add("pagination-dots");
                dotsBtn.textContent = "...";
                paginationContainer.appendChild(dotsBtn);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement("div");
            pageBtn.classList.add("pagination-btn");
            if (i === currentPage) {
                pageBtn.classList.add("active");
            }
            pageBtn.textContent = i;
            pageBtn.addEventListener("click", () => goToPage(i));
            paginationContainer.appendChild(pageBtn);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dotsBtn = document.createElement("div");
                dotsBtn.classList.add("pagination-dots");
                dotsBtn.textContent = "...";
                paginationContainer.appendChild(dotsBtn);
            }

            const lastBtn = document.createElement("div");
            lastBtn.classList.add("pagination-btn");
            lastBtn.textContent = totalPages;
            lastBtn.addEventListener("click", () => goToPage(totalPages));
            paginationContainer.appendChild(lastBtn);
        }

        const nextBtn = document.createElement("div");
        nextBtn.classList.add("pagination-btn");
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    function goToPage(page) {
        currentPage = page;
        updateDisplay();

        const catalogSection = document.querySelector(".catalog-content");
        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: "smooth" });
        }
    }
});