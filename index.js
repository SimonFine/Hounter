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
