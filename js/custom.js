// СТВОРЮЄМО СЛАЙДЕР З ПОСТАМИ
// Беремо рандомні пости з API
async function fetchRandomPosts() {
   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
   const posts = await response.json();
   return posts.sort(() => Math.random() - 0.5).slice(0, 10);
}

// Генеруємо тіло слайдера і його контент
async function createSlider() {
   const sliderContainer = document.getElementById('slider__body');
   const posts = await fetchRandomPosts();

   posts.forEach(post => {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      slide.innerHTML = `<p class="h2">${post.title}</p><p>${post.body}</p>`;
      sliderContainer.appendChild(slide);
   });

   // Запускаємо генерацію слайдера
   startSlider();
}

// Описуємо слайдер
function startSlider() {
   const sliderContainer = document.getElementById('slider__container');
   const slider = document.getElementById('slider__body');
   const prevBtn = document.getElementById('prevBtn');
   const nextBtn = document.getElementById('nextBtn');
   let currentSlide = 0;
   let autoSlideInterval;

   // Перегортування слайдів вперед
   function slideNext() {
      currentSlide++;
      slider.style.transform = `translateX(${-(currentSlide) * 100}%)`;

      if (currentSlide === 10) {
         setTimeout(() => {
            slider.style.transition = 'none';
            slider.style.transform = 'translateX(0)';
         }, 500);
         setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
         }, 600);
         currentSlide = 0;
      }
   }

   // Перегортування слайдів назад
   function slidePrev() {
      currentSlide--;
      slider.style.transform = `translateX(${-(currentSlide) * 100}%)`;

      if (currentSlide === -1) {
         setTimeout(() => {
            slider.style.transition = 'none';
            slider.style.transform = 'translateX(-900%)';
         }, 500);
         setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
         }, 600);
         currentSlide = 9;
      }
   }

   // Запускаємо автоматичне перегортування слайдів кожні 5 секунд
   function startAutoSlide() {
      autoSlideInterval = setInterval(slideNext, 5000);
   }

   // Зупиняємо автоматичне перегортування
   function stopAutoSlide() {
      clearInterval(autoSlideInterval);
   }

   // Стоп при наведенні курсора на слайдер
   sliderContainer.addEventListener('mouseenter', stopAutoSlide);
   // Автозапуск після того, як прибрали курсор із слайдера
   sliderContainer.addEventListener('mouseleave', startAutoSlide);

   prevBtn.addEventListener('click', slidePrev);
   nextBtn.addEventListener('click', slideNext);

   // Визиваємо автозапуск слайдера
   startAutoSlide();
}

// Запускаємо весь ланцюг створення слайдера
createSlider();



// СТВОРЮЄМО СЕКЦІЮ З КОРИСТУВАЧАМИ
// Функція для отримання випадкового елементу з массива
// Функція для загрузки даних з сервера
async function fetchData(url) {
   const response = await fetch(url);
   const data = await response.json();
   return data;
}

// Функція для отримання випадкового елементу з массива
function getRandomElement(arr) {
   const randomIndex = Math.floor(Math.random() * arr.length);
   return arr[randomIndex];
}

// Функция для отримання випадкових користувачів і фотографій
async function getRandomUsersAndPhotos() {
   const users = await fetchData('https://jsonplaceholder.typicode.com/users');
   const photos = await fetchData('https://jsonplaceholder.typicode.com/albums/1/photos');

   // Вибираємо 6 випадкових користувачів
   const randomUsers = Array.from({ length: 6 }, () => getRandomElement(users));

   // Для кожного користувача вибираємо випадкову фотографію
   randomUsers.forEach(user => {
      const randomPhoto = getRandomElement(photos);

      // Створюємо елемент для відтворення користувача і його фотографії
      const userContainer = document.getElementById('users-container');
      const userElement = document.createElement('div');
      userElement.classList.add('col-6', 'col-md-4', 'col-lg-2', 'users__item');
      userElement.setAttribute('data-user-id', user.id); // Додаємо атрибут data-user-id
      userElement.innerHTML = `
         <img src="${randomPhoto.thumbnailUrl}" alt="${user.name}'s photo">
         <p>${user.name}</p>
      `;
      userContainer.appendChild(userElement);

      // Додаємо обробник події для кожного блока користувача
      userElement.addEventListener('click', handleUserClick);
   });

   return randomUsers;
}

// Функція для обробки кліка по блоку користувача
function handleUserClick(event) {
   const userId = event.currentTarget.dataset.userId;

   // Перехід на сторінку користувача
   window.location.href = `pages/user.html?id=${userId}`;
}

// Запускаємо створення секції з користувачами при завантаженні сторінки
document.addEventListener('DOMContentLoaded', async () => {
   await getRandomUsersAndPhotos();
});