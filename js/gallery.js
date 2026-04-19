const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

function updateLightboxImage(instance, index) {
  const img = instance.element().querySelector('.lightbox-image');
  const counter = instance.element().querySelector('.image-counter');
  const description = instance.element().querySelector('.image-description');
  // Wrap around the index if it goes out of bounds
  index = index < 0 ? images.length - 1 : index >= images.length ? 0 : index;
  img.src = images[index].original;
  img.alt = images[index].description;
  counter.textContent = `${index + 1} / ${images.length}`;
  description.textContent = images[index].description;
}

let currentIndex = 0;
const lightboxHTML = `
  <div class="lightbox-overlay">
    <div class="lightbox-header">
      <span class="image-counter">${currentIndex + 1} / ${images.length}</span>
      <button class="close-btn">&times;</button>
    </div>
    <div class="lightbox-container">
      <button class="prev-btn">&lt;</button>
      <img src="${images[currentIndex].original}" alt="${images[currentIndex].description}" class="lightbox-image">
      <button class="next-btn">&gt;</button>
    </div>
    <div class="lightbox-footer">
      <p class="image-description">${images[currentIndex].description}</p>
    </div>
  </div>
`;
const instance = basicLightbox.create(lightboxHTML);

const onClickImage = event => {
  console.log(event.target.dataset.source);
  if (event.target.className === 'gallery-image') {
    event.preventDefault();

    currentIndex = parseInt(event.target.dataset.index, 0);
    updateLightboxImage(instance, currentIndex);

    instance.show();
  }
};

instance
  .element()
  .querySelector('.prev-btn')
  .addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Циклічне перемикання
    updateLightboxImage(instance, currentIndex);
  });

instance
  .element()
  .querySelector('.next-btn')
  .addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage(instance, currentIndex);
  });

// Додати обробник для кнопки закриття
instance
  .element()
  .querySelector('.close-btn')
  .addEventListener('click', () => {
    instance.close();
  });

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', onClickImage);

gallery.innerHTML = '';
let imageCounter = 0;

const listitems = images.map(image => {
  const listitem = document.createElement('li');
  listitem.className = 'gallery-item';

  const link = document.createElement('a');
  link.className = 'gallery-link';
  link.href = image.original;

  const img = document.createElement('img');
  img.classList.add('gallery-image');
  img.src = image.preview;
  img.dataset.source = image.original;
  img.dataset.index = imageCounter++;
  img.alt = image.description;

  link.appendChild(img);

  listitem.appendChild(link);
  return listitem;
});

gallery.append(...listitems);
