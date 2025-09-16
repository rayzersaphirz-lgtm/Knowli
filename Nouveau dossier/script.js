// --------------------
// Panier global
// --------------------
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --------------------
// Ajouter un produit générique (coques et T-shirts)
// --------------------
function addToCart(productName, button) {
    const card = button.closest('.product-card');
    const priceText = card.querySelector('p') ? card.querySelector('p').textContent : '0';
    const priceMatch = priceText.match(/[\d,.]+/); 
    let basePrice = priceMatch ? parseFloat(priceMatch[0].replace(',', '.')) : 0;

    // Frais de livraison pour tous les produits physiques (coques + T-shirts)
    let fraisLivraison = 0;
    const isBoutiqueProduit = card.closest('#produits') !== null; // section boutique
    if (isBoutiqueProduit) {
        fraisLivraison = 2.99;
    }

    const select = card.querySelector('select');
    const model = select ? select.value : '';

    cart.push({ 
        name: productName, 
        price: basePrice, 
        model: model, 
        fraisLivraison: fraisLivraison 
    });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Animation bouton
    button.innerText = 'Ajouté ✅';
    button.style.background = '#ffd700';
    setTimeout(() => {
        button.innerText = 'Ajouter au panier';
        button.style.background = '#ff416c';
    }, 1200);

    updateCart();
}

// --------------------
// Ajouter une formation
// --------------------
function addFormationToCart(button) {
    const select = document.getElementById('formation-select');
    if (!select) return;

    const [name, price] = select.value.split('|');
    cart.push({ name: name, price: parseFloat(price), model: '', fraisLivraison: 0 });
    localStorage.setItem('cart', JSON.stringify(cart));

    button.innerText = 'Ajouté ✅';
    button.style.background = '#ffd700';
    setTimeout(() => {
        button.innerText = 'Ajouter au panier';
        button.style.background = '#ff416c';
    }, 1200);

    updateCart();
}

// --------------------
// Ajouter un fournisseur
// --------------------
function addFournisseurToCart(button) {
    const select = document.getElementById('fournisseur-select');
    if (!select) return;

    const [name, price] = select.value.split('|');
    cart.push({ name: name, price: parseFloat(price), model: '', fraisLivraison: 0 });
    localStorage.setItem('cart', JSON.stringify(cart));

    button.innerText = 'Ajouté ✅';
    button.style.background = '#ffd700';
    setTimeout(() => {
        button.innerText = 'Ajouter au panier';
        button.style.background = '#ff416c';
    }, 1200);

    updateCart();
}

// --------------------
// Ajouter un site
// --------------------
function addSiteToCart(button) {
    const select = document.getElementById('site-select');
    if (!select) return;

    const [name, price] = select.value.split('|');
    cart.push({ name: name, price: parseFloat(price), model: '', fraisLivraison: 0 });
    localStorage.setItem('cart', JSON.stringify(cart));

    button.innerText = 'Ajouté ✅';
    button.style.background = '#ffd700';
    setTimeout(() => {
        button.innerText = 'Ajouter au panier';
        button.style.background = '#ff416c';
    }, 1200);

    updateCart();
}

// --------------------
// Supprimer un produit du panier
// --------------------
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// --------------------
// Mettre à jour le panier sur Panier.html
// --------------------
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    if (!cartItemsContainer || !cartTotalSpan) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price + item.fraisLivraison;

        const li = document.createElement('li');
        li.classList.add('cart-item');

        // Affichage avec frais de livraison séparé
        let detail = '';
        if (item.fraisLivraison > 0) {
            detail = ` +${item.fraisLivraison.toFixed(2)}€ (Livraison)`;
        }

        li.innerHTML = `
            <span>${item.name}${item.model ? ' ('+item.model+')' : ''} - €${item.price.toFixed(2)}${detail}</span>
            <button onclick="removeFromCart(${index})">Supprimer</button>
        `;
        cartItemsContainer.appendChild(li);
    });

    cartTotalSpan.innerText = total.toFixed(2);
}

// --------------------
// Bouton "Payer" → choix produits physiques / digitales
// --------------------
function payer() {
    const choice = prompt("Sélectionnez votre type de produit :\n1️⃣ Produits physiques\n2️⃣ Produits digitaux\n\nEntrez 1 ou 2");
    if (choice === '1') {
        window.location.href = 'paiement-physique.html';
    } else if (choice === '2') {
        window.location.href = 'paiement-digital.html';
    } else {
        alert("Choix invalide !");
    }
}

// --------------------
// Initialiser le panier sur Panier.html
// --------------------
document.addEventListener('DOMContentLoaded', updateCart);

