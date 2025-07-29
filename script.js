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

        // Calculate total cost of the order
        const totalPrice = coffeePrice + extrasTotal;

        // Create order data object
        const orderData = {
            customerName: customerName,
            email: email,
            phone: phone,
            coffee: {
                item: coffeeItem,
                price: coffeePrice
            },
            extras: extras,
            extrasTotal: extrasTotal,
            total: totalPrice,
            orderTime: new Date().toLocaleString() // convert date object to string. formats according to user's locale region
        };

        // Store in localStorage. localStorage can only store strings, not JavaScript Objects.
        // Hence, Convert object to string, so that we can later retrieve it and parse it back to an object.
        // This allows us to retrieve it later on the summary page
        localStorage.setItem('cafeOrderData', JSON.stringify(orderData));

        // Redirect to summary page
        window.location.href = 'summary.html';
    });
});