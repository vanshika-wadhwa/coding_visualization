document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleMode");

    // Check if toggle button exists
    if (toggleButton) {
        const toggleIcon = toggleButton.querySelector("span");

        // Check localStorage for dark mode preference
        let isDarkMode = localStorage.getItem("theme") === "dark";
        applyTheme();

        // Function to apply the theme
        function applyTheme() {
            if (isDarkMode) {
                gsap.to(":root", {
                    "--background-color": "#1f2937",
                    "--text-color": "#f9fafb",
                    duration: 0.5,
                    ease: "power1.out"
                });
                toggleIcon.textContent = "nightlight";
            } else {
                gsap.to(":root", {
                    "--background-color": "#ffffff",
                    "--text-color": "#333333",
                    duration: 0.5,
                    ease: "power1.out"
                });
                toggleIcon.textContent = "sunny";
            }
        }

        // Toggle and save dark mode preference
        toggleButton.addEventListener("click", function() {
            isDarkMode = !isDarkMode;
            localStorage.setItem("theme", isDarkMode ? "dark" : "light");
            applyTheme();
        });
    } else {
        console.error("Toggle button not found. Ensure logoNav.html includes #toggleMode");
    }
});
