const track = document.getElementById('carouselTrack');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentIndex = 0;
const items = Array.from(track.children);
const totalItems = items.length;
const visibleItems = 3; // Liczba widocznych elementów
const itemMargin = 10; // Margines
const itemWidth = items[0].offsetWidth + 2 * itemMargin; // Szerokość z marginesami

let autoScrollInterval; // Zmienna do przechowywania `setInterval`
const autoScrollDelay = 5000; // Czas automatycznego przewijania
const autoRestartDelay = 5000; // Czas ponownego uruchomienia automatycznego przewijania

// Klonowanie elementów
const clonesStart = [];
const clonesEnd = [];

// Klonuj widoczne elementy na początku i na końcu
for (let i = 0; i < visibleItems; i++) {
    const cloneStart = items[i].cloneNode(true);
    const cloneEnd = items[totalItems - 1 - i].cloneNode(true);

    cloneStart.classList.add('clone');
    cloneEnd.classList.add('clone');

    track.appendChild(cloneStart);
    track.insertBefore(cloneEnd, track.firstChild);

    clonesStart.push(cloneStart);
    clonesEnd.push(cloneEnd);
}

// Ustaw startowy indeks (po dodaniu klonów)
currentIndex = visibleItems;

// Zaktualizuj widoczną pozycję
updateCarousel(false);

// Funkcja aktualizująca pozycję karuzeli
function updateCarousel(animate = true) {
    const translateX = -currentIndex * itemWidth;
    track.style.transition = animate ? 'transform 0.6s ease' : 'none'; // Skrócony czas
    track.style.transform = `translateX(${translateX}px)`;
}

// Przesuwanie w prawo
function moveNext() {
    currentIndex++;
    updateCarousel();

    if (currentIndex >= totalItems + visibleItems) {
        track.addEventListener('transitionend', function handleTransition() {
            track.style.transition = 'none';
            currentIndex = visibleItems; // Wracamy na początek
            updateCarousel(false);
            track.removeEventListener('transitionend', handleTransition);
        });
    }
}

// Przesuwanie w lewo
function movePrev() {
    currentIndex--;
    updateCarousel();

    if (currentIndex < visibleItems) {
        track.addEventListener('transitionend', function handleTransition() {
            track.style.transition = 'none';
            currentIndex = totalItems + visibleItems - 1; // Wracamy na koniec
            updateCarousel(false);
            track.removeEventListener('transitionend', handleTransition);
        });
    }
}

// Zatrzymanie automatycznego przewijania
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Uruchomienie automatycznego przewijania
function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(moveNext, autoScrollDelay);
}

// Obsługa przycisków nawigacji
nextButton.addEventListener('click', () => {
    stopAutoScroll();
    moveNext();
    setTimeout(startAutoScroll, autoRestartDelay);
});

prevButton.addEventListener('click', () => {
    stopAutoScroll();
    movePrev();
    setTimeout(startAutoScroll, autoRestartDelay);
});

// Automatyczne przewijanie
startAutoScroll();
