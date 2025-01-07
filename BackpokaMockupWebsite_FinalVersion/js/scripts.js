
// Load products from JSON and render the product grid
function loadProducts() {
    console.log("Loading products");
    fetch("data/products.json")
        .then(response => response.json())
        .then(products => {
            const productGrid = document.getElementById("product-grid");
            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");
                productCard.onclick = () => viewProduct(product.id);
                productCard.innerHTML = `
                    <div>
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    </div>
                    <p><strong>${product.price}</strong></p>
                `;
                productGrid.appendChild(productCard);
            });
        });
}
// Handle product detail page navigation
function viewProduct(productId) {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "product.html";
}

// Load product details on the product page
function loadProductDetails() {
    const productId = localStorage.getItem("selectedProduct");
    if (!productId) return;
    fetch("data/products.json")
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            if (product) {
                document.getElementById("product-name").innerText = product.name;
                document.getElementById("product-image").style.backgroundImage = `url('${product.image}')`;
                document.getElementById("product-description").innerText = product.details;
                document.getElementById("product-price").innerText = product.price;
            }
        });
}


function goToFeature(element, featurePage) {
    // Toggle the 'clicked' class to trigger the animation
    if (!element.classList.contains('clicked')) {
        element.classList.add('clicked');
        setTimeout(() => {
            window.location.href = featurePage;
        }, 50); // Remove the class after the animation duration
    }
}

function loadScrollingFeature(){
    window.addEventListener("scroll", function () {
        const parallaxSection = document.querySelector(".parallax-section");
        if (!parallaxSection) {
            console.log("Parallax section not found");
            return;}
        console.log("Parallax section");
        const scrollPosition = window.scrollY; // How far the user has scrolled
        parallaxSection.style.backgroundPositionY = `${scrollPosition * -0.5}px`; // Adjust multiplier for effect speed
    });
}

