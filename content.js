let defaultDiscountRate = 0.125;
let defaultTaxRate = 0.21;

// Special rates for books
let bookDiscountRate = 0.20;
let bookTaxRate = 0.09;

// Special rates for entertainments and toys
let playDiscountRate = 0.20;

// Function to calculate discounted price with tax
function calculateDiscountedPriceWithTax(originalPrice, discountRate, taxRate) {
    let priceWithoutTax = originalPrice / (1 + taxRate);
    let originalTax = originalPrice - priceWithoutTax;
    let discountedPriceWithoutTax = priceWithoutTax * (1 - discountRate);
    let discountedPriceWithTax = discountedPriceWithoutTax + originalTax;
    return discountedPriceWithTax.toFixed(2);
}

function isBookCategory() {
    // Look for the <p> tag with data-test="breadcrumb-name" and check if it contains "Books"
    let categories = document.querySelectorAll('p[data-test="breadcrumb-name"]');
    if (categories.length > 0) {
        for (let category of categories) {
            let categoryText = category.textContent.trim().toLowerCase();
            if (categoryText === 'boeken') {
                return true;
            }
        }
    }
    return false;
}

function isPlayCategory() {
    // Select all <p> elements with data-test="breadcrumb-name"
    let breadcrumbElements = document.querySelectorAll('p[data-test="breadcrumb-name"]');
    if (breadcrumbElements.length > 0) {
        let playCategories = ['films & series', 'games', 'muziek'];

        for (let breadcrumbElement of breadcrumbElements) {
            let categoryText = breadcrumbElement.textContent.trim().toLowerCase();
            if (playCategories.some(category => categoryText.includes(category))) {
                return true;
            }
        }
    }
    return false;
}

function isSoldByBol() {
    let sellerElement = document.getElementsByClassName('product-seller')[0];
    console.log("wablabdabdab"); 
    console.log(sellerElement); 
    if (sellerElement) {
        let sellerText = sellerElement.innerText.trim().toLowerCase();
        console.log("namanama"); 
        console.log(sellerText); 
        return sellerText.includes('sold by bol') || sellerText.includes('verkoop door bol'); // Use includes for a flexible match
    }
    return false;
}

// Only run the script if the URL includes '/p/' and the product is "Sold by bol"
if (window.location.href.includes('/p/') && isSoldByBol()) {

    let priceElement = document.querySelector('span[data-test="price"]');
    let priceFractionElement = document.querySelector('sup[data-test="price-fraction"]');

    let integerPart = parseFloat(priceElement.textContent);  // Integer part remains unchanged
    let fractionalPart = 0; // Init fraction with 0 (in case it's dash '-')

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

    // 0.8165p
    if (isBookCategory()) {
        discountRate = bookDiscountRate;
        taxRate = bookTaxRate;
    }
    // 0.8347p
    if (isPlayCategory()) {
        discountRate = playDiscountRate; // 20% off for play categories
        taxRate = defaultTaxRate; // 21% rate
    }

    // 0.8967p
    let discountedPrice = calculateDiscountedPriceWithTax(originalPrice, discountRate, taxRate);

    // Create a new span element to display the discounted price
    let discountElement = document.createElement('span');
    discountElement.style.color = 'green';
    discountElement.style.marginLeft = '10px';
    discountElement.textContent = `Discounted Price: €${discountedPrice}`;

    // Insert the discounted price after the original price
    priceElement.parentNode.appendChild(discountElement);
}


