const outfits = [
    {
        name: 'skinny jeans',
        price: 12.99,
        category: 'bottoms',
        season: 'all',
        material: 'denim',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop&crop=center'
    },
    {
        name: 'graphic t-shirt',
        price: 9.99,
        category: 'tops',
        season: 'summer',
        material: 'cotton',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center'
    },
    {
        name: 'sneakers',
        price: 89.99,
        category: 'footwear',
        season: 'all',
        material: 'synthetic',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&crop=center'
    },
    {
        name: 'baseball cap',
        price: 7.99,
        category: 'accessories',
        season: 'summer',
        material: 'cotton',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop&crop=center'
    },
    {
        name: 'hoodie',
        price: 45.99,
        category: 'tops',
        season: 'winter',
        material: 'cotton',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center'
    },
    {
        name: 'leather jacket',
        price: 199.99,
        category: 'outerwear',
        season: 'fall',
        material: 'leather',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop&crop=center'
    },
    {
        name: 'wool sweater',
        price: 75.50,
        category: 'tops',
        season: 'winter',
        material: 'wool',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop&crop=center'
    },
    {
        name: 'summer dress',
        price: 35.00,
        category: 'tops',
        season: 'summer',
        material: 'cotton',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop&crop=center'
    },
    {
        name: 'winter boots',
        price: 120.00,
        category: 'footwear',
        season: 'winter',
        material: 'leather',
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop&crop=center'
    },
    {
        name: 'silk scarf',
        price: 25.99,
        category: 'accessories',
        season: 'spring',
        material: 'synthetic',
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=300&fit=crop&crop=center'
    }
];

// Variable to track which outfit is being edited
let editingIndex = -1;
let filteredOutfits = [...outfits]; // Copy of outfits for filtering

// Filter and Search Functions
function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const priceFilter = document.getElementById('price-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    const seasonFilter = document.getElementById('season-filter').value;
    const materialFilter = document.getElementById('material-filter').value;

    // Start with all outfits
    filteredOutfits = outfits.filter(outfit => {
        // Search filter
        const matchesSearch = outfit.name.toLowerCase().includes(searchTerm);

        // Price filter
        let matchesPrice = true;
        switch (priceFilter) {
            case 'under-10':
                matchesPrice = outfit.price < 10;
                break;
            case '10-50':
                matchesPrice = outfit.price >= 10 && outfit.price <= 50;
                break;
            case '50-100':
                matchesPrice = outfit.price > 50 && outfit.price <= 100;
                break;
            case 'over-100':
                matchesPrice = outfit.price > 100;
                break;
        }

        // Category filter
        const matchesCategory = categoryFilter === 'all' || outfit.category === categoryFilter;

        // Season filter
        const matchesSeason = seasonFilter === 'all' || outfit.season === seasonFilter || outfit.season === 'all';

        // Material filter
        const matchesMaterial = materialFilter === 'all' || outfit.material === materialFilter;

        return matchesSearch && matchesPrice && matchesCategory && matchesSeason && matchesMaterial;
    });

    // Apply sorting
    switch (sortFilter) {
        case 'name-asc':
            filteredOutfits.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredOutfits.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filteredOutfits.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredOutfits.sort((a, b) => b.price - a.price);
            break;
    }

    renderProductGrid();
    updateResultsCount();
}

function updateResultsCount() {
    const count = filteredOutfits.length;
    const resultsSpan = document.getElementById('results-count');
    resultsSpan.textContent = `Showing ${count} of ${outfits.length} items`;
}

function clearAllFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('price-filter').value = 'all';
    document.getElementById('category-filter').value = 'all';
    document.getElementById('sort-filter').value = 'name-asc';
    document.getElementById('season-filter').value = 'all';
    document.getElementById('material-filter').value = 'all';
    applyFilters();
}

// Function to delete outfit
function deleteOutfit(index) {
    // Find the original index in the outfits array
    const outfitToDelete = filteredOutfits[index];
    const originalIndex = outfits.findIndex(outfit =>
        outfit.name === outfitToDelete.name &&
        outfit.price === outfitToDelete.price
    );

    if (originalIndex !== -1) {
        outfits.splice(originalIndex, 1);
        applyFilters(); // Re-apply filters after deletion
        alert('Outfit deleted successfully!');
    }
}

// Function to open edit modal
function editOutfit(index) {
    // Find the original index in the outfits array
    const outfitToEdit = filteredOutfits[index];
    editingIndex = outfits.findIndex(outfit =>
        outfit.name === outfitToEdit.name &&
        outfit.price === outfitToEdit.price
    );

    if (editingIndex !== -1) {
        const outfit = outfits[editingIndex];

        // Pre-fill the form with current values
        document.getElementById('edit-outfit-name').value = outfit.name;
        document.getElementById('edit-outfit-price').value = outfit.price;

        // Show the modal
        document.getElementById('edit-modal').classList.remove('hidden');
    }
}

// Function to close edit modal
function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
    document.getElementById('edit-outfit-form').reset();
    editingIndex = -1;
}

// Function to render the product grid (now uses filteredOutfits with images)
function renderProductGrid() {
    let cardshtml = '';
    for (let i = 0; i < filteredOutfits.length; i++) {
        const outfit = filteredOutfits[i];
        cardshtml +=
            `
    <div class="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
          <div class="aspect-square bg-gray-100 overflow-hidden">
            <img 
              src="${outfit.image}" 
              alt="${outfit.name}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onerror="this.src='https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(outfit.name)}'"
            >
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">${outfit.name}</h3>
            <p class="text-gray-600 mb-1 text-lg font-bold">$${outfit.price}</p>
            <p class="text-gray-500 text-sm mb-3 capitalize">${outfit.category} • ${outfit.material}</p>
            <div class="space-y-2">
              <button onclick="editOutfit(${i})" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition text-sm">
                Edit
              </button>
              <button onclick="deleteOutfit(${i})" class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
    `
    }
    const divthatcontainsproductcards = document.getElementById('product_grid_main');
    divthatcontainsproductcards.innerHTML = cardshtml;
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    applyFilters();

    // Search and Filter Event Listeners
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('price-filter').addEventListener('change', applyFilters);
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('sort-filter').addEventListener('change', applyFilters);
    document.getElementById('season-filter').addEventListener('change', applyFilters);
    document.getElementById('material-filter').addEventListener('change', applyFilters);
    document.getElementById('clear-filters').addEventListener('click', clearAllFilters);

    // Add outfit button and form functionality
    const addoutfitbtn = document.getElementById('add-outfit-btn');
    const outfitform = document.getElementById('outfit-form');

    addoutfitbtn.addEventListener('click', () => {
        outfitform.classList.remove('hidden');
    });

    // Click outside form to hide it
    document.addEventListener('click', (e) => {
        if (outfitform && !outfitform.contains(e.target) && !addoutfitbtn.contains(e.target)) {
            outfitform.classList.add('hidden');
        }
    });

    // Cancel button functionality
    const cancelBtn = document.getElementById('cancel-form-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            outfitform.classList.add('hidden');
            document.getElementById('add-outfit-form').reset();
        });
    }

    // Add outfit form submission
    const addoutfitform = document.getElementById('add-outfit-form');
    if (addoutfitform) {
        addoutfitform.addEventListener('submit', (e) => {
            e.preventDefault();
            const namevalue = document.getElementById('outfit-name').value;
            const pricevalue = parseFloat(document.getElementById('outfit-price').value);

            let newoutfit = {
                name: namevalue,
                price: pricevalue,
                category: 'tops', // Default values for new items
                season: 'all',
                material: 'cotton',
                image: 'https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=' + encodeURIComponent(namevalue)
            };
            outfits.push(newoutfit);

            applyFilters(); // Re-apply filters after adding
            outfitform.classList.add('hidden');
            addoutfitform.reset();
            alert(`Outfit "${namevalue}" added successfully!`);
        });
    }

    // Edit modal functionality
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-outfit-form');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');

    // Cancel edit button
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', closeEditModal);
    }

    // Click outside modal to close
    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                closeEditModal();
            }
        });
    }

    // Edit form submission
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (editingIndex >= 0) {
                const newName = document.getElementById('edit-outfit-name').value;
                const newPrice = parseFloat(document.getElementById('edit-outfit-price').value);

                // Update the outfit in the array
                outfits[editingIndex].name = newName;
                outfits[editingIndex].price = newPrice;

                // Re-apply filters and close modal
                applyFilters();
                closeEditModal();

                alert(`Outfit updated successfully!`);
            }
        });
    }
});