document.addEventListener('DOMContentLoaded', function () {
    // Fetch slider configuration
    fetch('slider-config.json')
        .then(response => response.json())
        .then(config => {
            const sliderContainer = document.getElementById('slider-container');
            
            // Populate slides dynamically
            config.splide.slides.forEach(slide => {
                const slideElement = document.createElement('li');
                slideElement.className = 'splide__slide';
                
                slideElement.innerHTML = `
                    <img src="${slide.image}" alt="${slide.alt}">
                    <div class="splide__slide__overlay">
                        <div class="splide__slide__category">${slide.category}</div>
                        <h2>${slide.title}</h2>
                        <a href="#" class="btn">${slide.buttonText}</a>
                    </div>
                `;
                
                sliderContainer.appendChild(slideElement);
            });

            // Create custom navigation
            const splideContainer = document.querySelector('.splide');
            const customNavigation = document.createElement('div');
            customNavigation.className = 'custom-navigation';
            customNavigation.innerHTML = `
                <div class="custom-prev">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <div class="custom-next">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            `;
            splideContainer.appendChild(customNavigation);

            // Initialize Splide slider
            const splide = new Splide('.splide', {
                ...config.splide.options,
                arrows: false, // Disable default arrows
                pagination: true
            });

            // Add custom navigation events
            const prevButton = customNavigation.querySelector('.custom-prev');
            const nextButton = customNavigation.querySelector('.custom-next');

            prevButton.addEventListener('click', () => splide.go('<'));
            nextButton.addEventListener('click', () => splide.go('>'));

            splide.mount();
        })
        .catch(error => console.error('Error loading slider configuration:', error));
});