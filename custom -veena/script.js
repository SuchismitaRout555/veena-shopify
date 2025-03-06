class CustomSlider extends HTMLElement {
    constructor() {
        super();
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('custom.json'); // Fetch JSON file
            const sliderData = await response.json(); // Convert response to JSON
            this.render(sliderData);
        } catch (error) {
            console.error('Error loading slider data:', error);
        }
    }

    render(sliderData) {
        this.innerHTML = `
            <section class="splide">
                <div class="splide__track">
                    <ul class="splide__list">
                        ${sliderData.map(item => 
                            `<li class="splide__slide">
                                <img src="${item.image}">
                                <div class="slide-content">
                                    <span class="category">${item.category}</span>
                                    <h2>${item.description}</h2>
                                    <button class="explore-btn">Explore More</button>
                                </div>
                            </li>`
                        ).join('')}
                    </ul>
                </div>
            </section>
        `;

        this.initSplide();
    }

    initSplide() {
        const splide = new Splide(this.querySelector('.splide'), {
            type: 'loop',
            perPage: 1,
            pagination: true,  
            arrows: true,       
        });

        splide.mount();
    }
}

customElements.define('custom-slider', CustomSlider);