const track = document.getElementById('carouselTrack');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentIndex = 0; // Index of the first visible item
const items = Array.from(track.children);
const totalItems = items.length;
const visibleItems = 3; // Number of items visible at a time
const itemMargin = 10; // Margin on each side (must match CSS)
const itemWidth = items[0].offsetWidth + 2 * itemMargin; // Width of one item including margin

function updateCarousel() {
    // Calculate translation based on the current index
    const translateX = -currentIndex * itemWidth;
    track.style.transform = `translateX(${translateX}px)`;
}

function moveNext() {
    // Move to the next set of items (wrapping back to the start)
    currentIndex = (currentIndex + 1) % (totalItems - visibleItems + 1);
    updateCarousel();
}

function movePrev() {
    // Move to the previous set of items (wrapping back to the end)
    currentIndex = (currentIndex - 1 + (totalItems - visibleItems + 1)) % (totalItems - visibleItems + 1);
    updateCarousel();
}

// Add event listeners for navigation buttons
nextButton.addEventListener('click', moveNext);
prevButton.addEventListener('click', movePrev);

// Auto-scroll every 10 seconds
setInterval(moveNext, 10000);

// Initialize carousel position
updateCarousel();
