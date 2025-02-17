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
    console.log(scrollContainer.scrollLeft, scrollContainer.offsetWidth, scrollContainer.scrollWidth);
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
    
