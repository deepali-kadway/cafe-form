$(document).ready(function() {
    
    $('#order-form').on('submit', function(event){
        event.preventDefault();

        const customerName = $('#exampleInputName').val();
        const email = $('#email').val();
        const phone = $('#phone').val();

        const selectedCoffee = $('.form-radio-input:checked');
        const coffeeItem = selectedCoffee.val();
        const coffeePrice = parseFloat(selectedCoffee.data('price')) || 0;

        // Debug logging
        console.log('Selected coffee:', coffeeItem, 'Price:', coffeePrice);

        const selectExtra = $('.form-check-input:checked')
        let extras = [];
        let extrasTotal = 0;

        selectExtra.each(function() {
            const extraName = $(this).val();
            const extraPrice = $(this).data('price');

            extras.push({
                item: extraName,
                price: extraPrice
            });

            extrasTotal += extraPrice;
        });

        // Calculate total
        const totalPrice = coffeePrice + extrasTotal;

        // Create URL parameters
        const params = new URLSearchParams();
        params.append('name', customerName);
        params.append('email', email);
        params.append('phone', phone);
        params.append('coffee', coffeeItem);
        params.append('coffeePrice', coffeePrice);
        params.append('extrasTotal', extrasTotal);
        params.append('total', totalPrice);
        
        // Add extras as separate parameters
        extras.forEach(function(extra, index) {
            params.append(`extra${index}`, extra.item);
            params.append(`extraPrice${index}`, extra.price);
        });
        params.append('extrasCount', extras.length);

        // Redirect with parameters
        window.location.href = `summary.html?${params.toString()}`;
    });
});