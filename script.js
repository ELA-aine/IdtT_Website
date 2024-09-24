const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['', ''];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        // Remove all current gallery-item classes
        this.carouselArray.forEach(el => {
            for (let i = 1; i <= 5; i++) {
                el.classList.remove(`gallery-item-${i}`);
            }
        });

        // Add new classes based on the first 5 items in the array
        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });
    }

    setCurrentState(control) {
        // Move carousel items based on control direction
        if (control.className.includes('gallery-controls-previous')) {
            this.carouselArray.unshift(this.carouselArray.pop()); // Move last item to the front
        } else {
            this.carouselArray.push(this.carouselArray.shift()); // Move first item to the back
        }

        this.updateGallery();
    }

    setControls() {
        // Create and append controls (buttons) to the galleryControlsContainer
        this.carouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            button.innerText = control;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        // Get all control buttons and add click events
        const trigger = [...galleryControlsContainer.childNodes];
        trigger.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

// Instantiate the Carousel class and set up controls
const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();
