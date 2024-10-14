// Global variables for the default discount rate and tax rate
let defaultDiscountRate = 0.125;  // 12.5% discount for non-books
let defaultTaxRate = 0.21;  // 21% tax for non-books

// Special rates for books
let bookDiscountRate = 0.20;  // 20% discount for books
let bookTaxRate = 0.09;  // 9% tax for books

// Function to calculate discounted price with tax
function calculateDiscountedPriceWithTax(originalPrice, discountRate, taxRate) {
    // Step 1: Remove the tax to get the price without tax
    let priceWithoutTax = originalPrice / (1 + taxRate);
    
    // Step 2: Calculate the original tax directly
    let originalTax = originalPrice - priceWithoutTax;
    
    // Step 3: Apply the discount on the price without tax
    let discountedPriceWithoutTax = priceWithoutTax * (1 - discountRate);
    
    // Step 4: Add the original tax back to the discounted price without tax
    let discountedPriceWithTax = discountedPriceWithoutTax + originalTax;
    
    // Return the final discounted price, including tax
    return discountedPriceWithTax.toFixed(2);  // Round to 2 decimal places
}

// Function to check if the product is a book
function isBookCategory() {
    // Look for the <p> tag with data-test="breadcrumb-name" and check if it contains "Books"
    let breadcrumbElement = document.querySelector('p[data-test="breadcrumb-name"]');
    if (breadcrumbElement) {
        let categoryText = breadcrumbElement.textContent.trim().toLowerCase();
        return categoryText === 'books';  // Check if the text is "Books"
    }
    return false;
}

// Select the price element in the HTML
let priceElement = document.querySelector('span[data-test="price"]');
let priceFractionElement = document.querySelector('sup[data-test="price-fraction"]');

let integerPart = parseFloat(priceElement.textContent);  // Integer part remains unchanged
let fractionalPart = 0; // init fraction with 0 (in case it's dash '-')

if (priceFractionElement) {
    let fractionalPartText = priceFractionElement.textContent.trim();
    fractionalPart = parseFloat(fractionalPartText);
    if (isNaN(fractionalPart)) {
        fractionalPart = 0;
    }
}

let originalPrice = integerPart + (fractionalPart / 100);

// Determine if the product is a book and apply the appropriate discount and tax rates
let discountRate = defaultDiscountRate;
let taxRate = defaultTaxRate;

if (isBookCategory()) {
    // If the product is a book, apply the special rates
    discountRate = bookDiscountRate;
    taxRate = bookTaxRate;
}

// Calculate the discounted price including tax
let discountedPrice = calculateDiscountedPriceWithTax(originalPrice, discountRate, taxRate);

// Create a new span element to display the discounted price
let discountElement = document.createElement('span');
discountElement.style.color = 'green';
discountElement.style.marginLeft = '10px';
discountElement.textContent = `Discounted Price: €${discountedPrice}`;

// Insert the discounted price after the original price
priceElement.parentNode.appendChild(discountElement);

