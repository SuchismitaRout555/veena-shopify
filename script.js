document.addEventListener('DOMContentLoaded', function () {
    
    fetch('slider-config.json')
        .then(response => response.json())
        .then(config => {
            const sliderContainer = document.getElementById('slider-container');
            
            // slides dynamically
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

            // Initialize Splide slider
            new Splide('.splide', {
                ...config.splide.options,
                arrows: true,
                pagination: true,
                classes: {
                    arrow: 'splide__arrow',
                    prev: 'splide__arrow--prev',
                    next: 'splide__arrow--next'
                }
            }).mount();
        })
        .catch(error => console.error('Error loading slider configuration:', error));
});