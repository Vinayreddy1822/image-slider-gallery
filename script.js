// ===========================
// IMAGE DATA
// ===========================
const imageData = [
    {
        src: './images/1.jpg',
        title: 'Autumn Bird Pause',
        description: 'A small bird resting on a branch with a warm blurred background.'
    },
    {
        src: './images/2.jpg',
        title: 'Spring Blossom Breeze',
        description: 'Soft pink cherry blossoms blooming in a warm spring atmosphere.'
    },
    {
        src: './images/3.jpg',
        title: 'Golden Desert Waves',
        description: 'Smooth sand dunes stretching endlessly under a pale sky.'
    },
    {
        src: './images/4.webp',
        title: 'Sunset Over the Falls',
        description: 'Golden evening light falling over deep cliffs and a powerful waterfall.'
    },
    {
        src: './images/5.jpg',
        title: 'Moon Through the Clouds',
        description: 'A glowing full moon surrounded by dark misty clouds.'
    },
    {
        src: './images/6.jpg',
        title: 'Panda Daydream',
        description: 'A cute panda resting lazily on a tree branch in the wild.'
    },
    {
        src: './images/7.jpg',
        title: 'Ocean Twilight',
        description: 'A peaceful beach scene under a dramatic purple sunset sky.'
    },
    {
        src: './images/8.png',
        title: 'Medieval Castle',
        description: 'Ancient European castle surrounded by colorful autumn foliage'
    },
    {
        src: './images/9.png',
        title: 'Lavender Fields',
        description: 'Endless rows of purple lavender flowers in Provence'
    },
    {
        src: './images/10.png',
        title: 'Rainforest Waterfall',
        description: 'Majestic waterfall cascading through lush green rainforest.'
    },
    {
        src: './images/11.jpg',
        title: 'Temple Gathering',
        description: 'A grand temple courtyard filled with people and cultural energy.'
    },
    {
        src: './images/12.jpg',
        title: 'Silent Turtle Rest',
        description: 'A calm turtle relaxing on a log in golden water.'
    },
    {
        src: './images/13.jpg',
        title: 'Clear Morning Tracks',
        description: 'A bright blue sky over quiet railway tracks and green countryside.'
    },
    {
        src: './images/14.jpg',
        title: 'Hilltop Silence',
        description: 'A calm view from a small house balcony overlooking endless mountains.'
    },
    {
        src: './images/15.jpg',
        title: 'Empty Court Morning',
        description: 'A quiet basketball court shining under a clear summer sky.'
    },
    {
        src: './images/16.jpg',
        title: 'Valley of Light',
        description: 'A wide green valley glowing under the warm afternoon sun.'
    },
    {
        src: './images/17.jpg',
        title: 'Window to Summer',
        description: 'A peaceful room opening into a bright blue sky and green nature.'
    },
    {
        src: './images/18.jpg',
        title: 'Train Into the Green Tunnel',
        description: 'A magical train entering a glowing forest tunnel filled with light.'
    },
    {
        src: './images/19.jpg',
        title: 'Rainy Street Serenity',
        description: 'A peaceful rainy road scene with reflections and soft sunlight.'
    },
    {
        src: './images/20.jpg',
        title: 'Hidden Garden Café',
        description: 'A cozy nature-covered café surrounded by lush greenery.'
    }
];

// ===========================
// STATE MANAGEMENT
// ===========================
let currentIndex = 0;
let isPlaying = false;
let autoplayInterval = null;
const AUTOPLAY_DELAY = 4000;

// ===========================
// DOM ELEMENTS
// ===========================
const elements = {
    currentImage: document.getElementById('currentImage'),
    prevImage: document.getElementById('prevImage'),
    nextImage: document.getElementById('nextImage'),
    imageTitle: document.getElementById('imageTitle'),
    imageDescription: document.getElementById('imageDescription'),
    thumbnailStrip: document.getElementById('thumbnailStrip'),
    navPrev: document.getElementById('navPrev'),
    navNext: document.getElementById('navNext'),
    prevPreview: document.getElementById('prevPreview'),
    nextPreview: document.getElementById('nextPreview'),
    scrollLeft: document.getElementById('scrollLeft'),
    scrollRight: document.getElementById('scrollRight'),
    playPauseBtn: document.getElementById('playPauseBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    playIcon: document.querySelector('.play-icon'),
    pauseIcon: document.querySelector('.pause-icon')
};

// ===========================
// INITIALIZATION
// ===========================
function init() {

    // Generate thumbnails
    generateThumbnails();

    // Display first image
    updateSlider(0);

    // Add event listeners
    addEventListeners();

    // Add keyboard navigation
    addKeyboardNavigation();
}

// ===========================
// THUMBNAIL GENERATION
// ===========================
function generateThumbnails() {
    imageData.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');

        thumbnail.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <span class="thumbnail-number">${index + 1}</span>
        `;

        thumbnail.addEventListener('click', () => {
            updateSlider(index);
            stopAutoplay();
        });

        elements.thumbnailStrip.appendChild(thumbnail);
    });
}

// ===========================
// SLIDER UPDATE
// ===========================
function updateSlider(index, direction = 'next') {
    // Ensure index is within bounds
    currentIndex = (index + imageData.length) % imageData.length;

    // Calculate prev and next indices
    const prevIndex = (currentIndex - 1 + imageData.length) % imageData.length;
    const nextIndex = (currentIndex + 1) % imageData.length;

    // Add loading class for smooth transition
    elements.currentImage.classList.add('loading');

    // Update images with a slight delay for smooth transition
    setTimeout(() => {
        // Update current image
        elements.currentImage.src = imageData[currentIndex].src;
        elements.currentImage.alt = imageData[currentIndex].title;

        // Update side previews
        elements.prevImage.src = imageData[prevIndex].src;
        elements.prevImage.alt = imageData[prevIndex].title;
        elements.nextImage.src = imageData[nextIndex].src;
        elements.nextImage.alt = imageData[nextIndex].title;

        // Update text content
        elements.imageTitle.textContent = imageData[currentIndex].title;
        elements.imageDescription.textContent = imageData[currentIndex].description;

        // Update thumbnails
        updateThumbnails();

        // Remove loading class
        elements.currentImage.classList.remove('loading');

        // Scroll thumbnail into view
        scrollThumbnailIntoView(currentIndex);
    }, 100);
}

// ===========================
// THUMBNAIL UPDATES
// ===========================
function updateThumbnails() {
    const thumbnails = elements.thumbnailStrip.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });
}

function scrollThumbnailIntoView(index) {
    const thumbnails = elements.thumbnailStrip.querySelectorAll('.thumbnail');
    if (thumbnails[index]) {
        thumbnails[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
}

// ===========================
// NAVIGATION
// ===========================
function goToPrevious() {
    updateSlider(currentIndex - 1, 'prev');
}

function goToNext() {
    updateSlider(currentIndex + 1, 'next');
}

// ===========================
// AUTOPLAY
// ===========================
function startAutoplay() {
    if (!isPlaying) {
        isPlaying = true;
        elements.playIcon.classList.add('hidden');
        elements.pauseIcon.classList.remove('hidden');

        autoplayInterval = setInterval(() => {
            goToNext();
        }, AUTOPLAY_DELAY);
    }
}

function stopAutoplay() {
    if (isPlaying) {
        isPlaying = false;
        elements.playIcon.classList.remove('hidden');
        elements.pauseIcon.classList.add('hidden');

        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
}

function toggleAutoplay() {
    if (isPlaying) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

// ===========================
// FULLSCREEN
// ===========================
function toggleFullscreen() {
    const container = document.querySelector('.slider-container');

    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.error('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// ===========================
// THUMBNAIL SCROLLING
// ===========================
function scrollThumbnailsLeft() {
    elements.thumbnailStrip.scrollBy({
        left: -200,
        behavior: 'smooth'
    });
}

function scrollThumbnailsRight() {
    elements.thumbnailStrip.scrollBy({
        left: 200,
        behavior: 'smooth'
    });
}

// ===========================
// EVENT LISTENERS
// ===========================
function addEventListeners() {
    // Navigation arrows
    elements.navPrev.addEventListener('click', () => {
        goToPrevious();
        stopAutoplay();
    });

    elements.navNext.addEventListener('click', () => {
        goToNext();
        stopAutoplay();
    });

    // Side previews
    elements.prevPreview.addEventListener('click', () => {
        goToPrevious();
        stopAutoplay();
    });

    elements.nextPreview.addEventListener('click', () => {
        goToNext();
        stopAutoplay();
    });

    // Thumbnail scrolling
    elements.scrollLeft.addEventListener('click', scrollThumbnailsLeft);
    elements.scrollRight.addEventListener('click', scrollThumbnailsRight);

    // Controls
    elements.playPauseBtn.addEventListener('click', toggleAutoplay);
    elements.fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Stop autoplay on user interaction
    elements.currentImage.addEventListener('click', stopAutoplay);
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                goToPrevious();
                stopAutoplay();
                break;
            case 'ArrowRight':
                goToNext();
                stopAutoplay();
                break;
            case ' ':
                e.preventDefault();
                toggleAutoplay();
                break;
            case 'f':
            case 'F':
                toggleFullscreen();
                break;
            case 'Escape':
                stopAutoplay();
                break;
        }
    });
}

// ===========================
// TOUCH SUPPORT
// ===========================
let touchStartX = 0;
let touchEndX = 0;

elements.currentImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

elements.currentImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            goToNext();
        } else {
            // Swipe right - previous image
            goToPrevious();
        }
        stopAutoplay();
    }
}

// ===========================
// PRELOAD IMAGES
// ===========================
function preloadImages() {
    imageData.forEach((image) => {
        const img = new Image();
        img.src = image.src;
    });
}

// ===========================
// START APPLICATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    init();
    preloadImages();
});
