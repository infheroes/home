const track = document.getElementById('carouselTrack');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentIndex = 0;
const items = track.children;
const totalItems = items.length;
const visibleItems = 3;

function updateCarousel() {
    track.style.transform = `translateX(-${((currentIndex) *(100+currentIndex+2)) / visibleItems}%)`;
}

function moveNext() {
    currentIndex = (currentIndex + 1)%(totalItems-2);
    updateCarousel();
}

function movePrev() {
    currentIndex = (currentIndex - 1 + totalItems)%(totalItems-2);
    updateCarousel();
}

nextButton.addEventListener('click', moveNext);
prevButton.addEventListener('click', movePrev);

setInterval(moveNext, 10000);