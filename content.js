// Global variables for discount rate and tax rate
let discountRate = 0.125;  // 12.5% discount
let taxRate = 0.21;  // 21% tax

// Function to calculate discounted price with tax
function calculateDiscountedPriceWithTax(originalPrice) {
    let priceWithoutTax = originalPrice / (1 + taxRate);
    let originalTax = originalPrice - priceWithoutTax;    
    let discountedPriceWithoutTax = priceWithoutTax * (1 - discountRate);    
    let discountedPriceWithTax = discountedPriceWithoutTax + originalTax;
    return discountedPriceWithTax.toFixed(2);
}

// Select the price element in the HTML
let priceElement = document.querySelector('span[data-test="price"]');
let priceFractionElement = document.querySelector('sup[data-test="price-fraction"]');

if (priceElement && priceFractionElement) {
    // Extract the integer and fractional part of the price
    let integerPart = parseFloat(priceElement.textContent);
    let fractionalPart = parseFloat(priceFractionElement.textContent) / 100;
    let originalPrice = integerPart + fractionalPart;  // Combine to get the full original price

    // Calculate the discounted price including tax
    let discountedPrice = calculateDiscountedPriceWithTax(originalPrice);

    // Create a new span element to display the discounted price
    let discountElement = document.createElement('span');
    discountElement.style.color = 'green';
    discountElement.style.marginLeft = '10px';
    discountElement.textContent = `Employee Price: €${discountedPrice}`;

    // Insert the discounted price after the original price
    priceElement.parentNode.appendChild(discountElement);
}
