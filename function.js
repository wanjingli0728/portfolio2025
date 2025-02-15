document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.createElement("div");
    navContainer.id = "nav-container";
    document.body.insertAdjacentElement("afterbegin", navContainer);

    // Function to load the correct navigation
    function loadNav() {
        const file = window.innerWidth < 768 ? 'navbar.html' : 'sidebar.html';

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                navContainer.innerHTML = data;
            })
            .catch(error => {
                console.error(`Error loading ${file}:`, error);
            });
    }

    // Function to adjust the margin-left, padding-left, and margin-top of .content
    function adjustContentStyles() {
        const contentElement = document.querySelector('.content');
        if (window.innerWidth < 768) {
            contentElement.style.marginLeft = '0';
            contentElement.style.paddingLeft = '0';
            contentElement.style.marginTop = '50px'; // Add top margin for smaller screens
        } else {
            contentElement.style.marginLeft = '140px';
            contentElement.style.paddingLeft = '10px'; // Reset padding for larger screens
            contentElement.style.marginTop = '0'; // Reset top margin for larger screens
        }
    }

    // Initial load
    loadNav();
    adjustContentStyles();

    // Listen for window resize events
    window.addEventListener("resize", () => {
        loadNav();
        adjustContentStyles();
    });
});