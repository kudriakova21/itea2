document.addEventListener('DOMContentLoaded', async () => {
   // Отримуємо параметри з URL
   const params = new URLSearchParams(window.location.search);
   const userId = params.get('id');

   if (!userId) {
       console.error('User ID not provided');
       return;
   }

   // Отримуємо дані про конкретного користувача
   const user = await fetchUserData(userId);

   // Відображаємо інформацію про користувача
   displayUserDetails(user);
});

// Функція для отримання даних про користувача
async function fetchUserData(userId) {
   const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
   const userData = await response.json();
   return userData;
}

// Функція для відображення інформації про користувача на сторінці
function displayUserDetails(user) {
   const userDetailsContainer = document.getElementById('user-details-container');
   const userDetailsElement = document.createElement('div');
   userDetailsElement.classList.add('col-12', 'user-details__item');
   userDetailsElement.innerHTML = `
       <h2>${user.name}</h2>
       <p>Email: ${user.email}</p>
       <p>Phone: ${user.phone}</p>
       <p>Website: ${user.website}</p>
       <p>Username: ${user.username}</p>
       <p>Company: ${user.company.name}</p>
       <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
       <p>Geo: Lat ${user.address.geo.lat}, Lng ${user.address.geo.lng}</p>
   `;
   userDetailsContainer.appendChild(userDetailsElement);
}