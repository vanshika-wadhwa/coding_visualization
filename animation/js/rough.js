// Select the toggle button and body
const toggleButton = document.getElementById('modeToggle');
let isDarkMode = false; // Initial theme state

// Function to toggle theme with GSAP
function toggleTheme() {
    if (isDarkMode) {
        // Animate to Light Mode
        gsap.to(":root", {
            "--background-color": "#ffffff",
            "--text-color": "#333333",
            "--button-bg": "#4CAF50",
            "--button-text": "#ffffff",
            duration: 0.5,
            ease: "power1.out"
        });
        toggleButton.textContent = "Switch to Dark Mode";
    } else {
        // Animate to Dark Mode
        gsap.to(":root", {
            "--background-color": "#1f2937",
            "--text-color": "#f9fafb",
            "--button-bg": "#4b5563",
            "--button-text": "#e5e7eb",
            duration: 0.5,
            ease: "power1.out"
        });
        toggleButton.textContent = "Switch to Light Mode";
    }
    isDarkMode = !isDarkMode; // Toggle theme state
}

// Add event listener to the button
toggleButton.addEventListener('click', toggleTheme);
