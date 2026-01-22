const input = document.getElementById('bookmarkInput');
const addBtn = document.getElementById('addBookmarkBtn');
const list = document.getElementById('bookmarkList');

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function saveBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function renderBookmarks() {
  list.innerHTML = '';

  bookmarks.forEach((url, index) => {
    const li = document.createElement('li');

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.textContent = url;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.classList.add('delete');

    delBtn.addEventListener('click', () => {
      bookmarks.splice(index, 1);
      saveBookmarks();
      renderBookmarks();
    });

    li.append(link, delBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const url = input.value.trim();
  if (!url) return;

  bookmarks.push(url);
  saveBookmarks();
  renderBookmarks();
  input.value = '';
});

renderBookmarks();

import products from './products.js';

const productsContainer = document.getElementById('products');
const searchInput = document.getElementById('search');

function renderProducts(items) {
  productsContainer.innerHTML = template(items);
}

const source = document.getElementById('products-template').innerHTML;
const template = Handlebars.compile(source);


renderProducts(products);

searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(value)
  );

  renderProducts(filteredProducts);
});




