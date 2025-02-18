//featured-house section filtering logic
document.querySelectorAll('.featured-house__checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const selectedTypes = Array.from(document.querySelectorAll('.featured-house__checkbox:checked'))
        .map(checkedBox => checkedBox.id);
        
        document.querySelectorAll('.featured-house__cards .house-card').forEach(card => {
            const cardType = card.getAttribute('type');
            card.style.display = selectedTypes.length === 0 || selectedTypes.includes(cardType) ? 'block' : 'none';
        });
    });
});

//featured-house carousel logic
const PRIMARY_COLOR = '#10b981';

const scrollContainer = document.querySelector('.featured-house__cards');
const cardWidth = document.querySelector(".house-card").offsetWidth;
const nextButton = document.querySelector('.circle-nav-btn.next');
const prevButton = document.querySelector('.circle-nav-btn.prev');

let lastScroll = 0;

const checkScroll = function() {
    if (scrollContainer.scrollLeft === 0) {
        prevButton.classList.add('circle-nav-btn__disabled');
        document.querySelector(".circle-nav-prev-icon").setAttribute('fill', PRIMARY_COLOR);
    } else {
        prevButton.classList.remove('circle-nav-btn__disabled');
        nextButton.classList.remove('circle-nav-btn__disabled');
        document.querySelector(".circle-nav-prev-icon").setAttribute('fill', 'white');
        document.querySelector(".circle-nav-next-icon").setAttribute('fill', 'white');
    }

    lastScroll = scrollContainer.scrollLeft <= 0 ? 0 : scrollContainer.scrollLeft;
    if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth ){
        nextButton.classList.add('circle-nav-btn__disabled');
        document.querySelector(".circle-nav-next-icon").setAttribute('fill', PRIMARY_COLOR);
    }
}

nextButton.addEventListener('click', () => scrollContainer.scrollBy({ left: cardWidth }));
prevButton.addEventListener('click', () => scrollContainer.scrollBy({ left: -cardWidth }));

checkScroll();

scrollContainer.addEventListener('scroll', checkScroll);    //i should add a debouncer here later on
    
//testimonial-slider logic
const slider = function () {
    const slides = document.querySelectorAll('.testimonial');
    //const btnLeft = document.querySelector('.slider__btn--left');
    //const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.slider-dots');
  
    let curSlide = 1;
    const maxSlide = slides.length;
  
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="slider-dots__dot" data-slide="${i}"></button>`
                );
            });
    };
  
    const activateDot = function (slide) {
        document
            .querySelectorAll('.slider-dots__dot')
            .forEach(dot => dot.classList.remove('slider-dots__dot--active'));
  
        document
            .querySelector(`.slider-dots__dot[data-slide="${slide}"]`)
            .classList.add('slider-dots__dot--active');
    };
  
    const goToSlide = function (slide) {
        slides.forEach((s, i) => (s.style.transform = `translateX(${105 * (i - slide)}%)`));
    };
  
    const nextSlide = function () {
        curSlide = (curSlide + 1) % maxSlide;

        goToSlide(curSlide);
        activateDot(curSlide);
    };
  
    const prevSlide = function () {
        curSlide = (curSlide - 1 + maxSlide) % maxSlide;

        goToSlide(curSlide);
        activateDot(curSlide);
    };
  
    const init = function () {
        goToSlide(1);
        createDots();
  
        activateDot(1);
    };
    init();
  
    document.addEventListener('keydown', function (e) {
        e.key === 'ArrowLeft' && prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });
  
    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('slider-dots__dot')) {
  
            curSlide = Number(e.target.dataset.slide);
            goToSlide(curSlide);
            activateDot(curSlide);
        }
    });
  };
  slider();