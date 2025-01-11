// Scroll-based animations
let isScrolling = false;

// Function to reveal sections when scrolled into view
function revealSections() {
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
            const sections = document.querySelectorAll('.section');
            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                const triggerPoint = window.innerHeight * 0.8;

                // Check if the section is in the view
                if (sectionTop < triggerPoint) {
                    section.classList.add('visible'); // Add 'visible' class to reveal the section
                }
            });
            isScrolling = false;
        });
    }
}

// Event listener for scroll event to trigger revealSections function
window.addEventListener('scroll', revealSections);
revealSections(); // Initial check on page load

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        // Send form data to the server using a POST request
        const response = await fetch("https://your-backend-url.vercel.app/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();

        // If the request is successful
        if (response.ok) {
            // Reset the form fields
            document.getElementById("contactForm").reset();

            // Create success message element
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message'); // Add CSS class
            successMessage.textContent = result.message; // Display success message

            // Append the success message to the contact section
            document.querySelector('.contact').appendChild(successMessage);

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            // Alert error message if the submission failed
            alert(result.message);
        }
    } catch (error) {
        // Alert if there is an issue with the request
        alert("Something went wrong. Please try again later.");
    }
});

// Toggle dropdown on click
document.getElementById("userIcon").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.classList.toggle("active"); // Toggle the 'active' class to show/hide dropdown
});

// Close the dropdown when clicking outside the menu
document.addEventListener("click", (e) => {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const userIcon = document.getElementById("userIcon");
    if (!dropdownMenu.contains(e.target) && !userIcon.contains(e.target)) {
        dropdownMenu.classList.remove("active"); // Remove 'active' class if clicked outside
    }
});

// Cart item count functionality
document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".buy-btn"); // Select all "Buy Now" buttons
    const cartCount = document.getElementById("cartCount");   // Select cart count display element

    let count = 0; // Initial cart count

    // Add event listener to each "Buy Now" button to update the cart count
    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            count++; // Increment cart count
            cartCount.textContent = count; // Update cart count display
        });
    });
});

// Toggle menu function for mobile navigation
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu
}