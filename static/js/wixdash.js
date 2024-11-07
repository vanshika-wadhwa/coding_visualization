document.addEventListener("DOMContentLoaded", function() {
    // Show the login modal after 3 seconds
    setTimeout(function() {
        // Display the modal
        document.getElementById("loginModal").style.display = "flex";
        
        // Add blur effect to dashboard content
        document.querySelector(".dashboard-content").classList.add("blurred");
    }, 3000); // Adjust delay as needed (3000ms = 3 seconds)

    // Optional: Close the modal when clicking outside it
    document.getElementById("loginModal").addEventListener("click", function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});

function closeModal() {
    // Hide the modal and remove blur
    document.getElementById("loginModal").style.display = "none";
    document.querySelector(".dashboard-content").classList.remove("blurred");
}
