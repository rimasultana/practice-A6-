const loadCategoryData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCategoryData(data.categories);
};

const displayCategoryData = (categories) => {
    const categoryContainer = document.getElementById("category");
  
    categories.forEach((element) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class='btn border-2 border-amber-400 flex  items-center justify-center  text-center '>
        <img class='w-8 object-cover' src='${element.category_icon}'/>
          <p>${element.category}</p>
        </div>
      `;
      categoryContainer.appendChild(div); 
    });
  };

  const loadPetsCardData = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    displayPetsCardData(data.pets.slice(0,6));
  }

  const displayPetsCardData = (pets) =>{
    const cardContainer = document.getElementById('card-container');

    pets.forEach((pet) =>{
        console.log(pet);
        const {category, date_of_birth,  price, image,breed,gender,pet_name } = pet
        const card = document.createElement('div');
        card.classList = "card p-5 border border-gray-100 "
        card.innerHTML =`
         <figure>
                  <img
                    src="${image}"
                    alt="Shoes" />
                </figure>
              <div class='px-2 py-5'>
                  <h2 class="card-title font-bold">${pet_name}</h2>
                  <p class="">
                  <i class="fa-solid fa-border-all"></i> Breed: ${
                    breed ? breed : "Not Available"
                  }
                </p>
                 <p class="">
                 <i class="fa-regular fa-calendar"></i> Birth: ${
                   date_of_birth ? date_of_birth : "Not Available"
                  }
                </p>
                 <p class="">
                 <i class="fa-solid fa-mercury"></i> Gender: ${
                    gender ? gender : "Not Available"
                  }
                </p>
                 <p class="">
                 <i class="fa-solid fa-mercury"></i> Price: ${
                    price ? price : "Not Available"
                  }
                </p>
              </div>
              <hr class='mx-2'/>
                  <div class="flex justify-between items-center gap-3 px-2 py-2 ">
                    <button class="btn border border-gray-200"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button class="btn border border-gray-200 text-green-300">Adopt</button>
                    <button class="btn border border-gray-200 text-green-300">Details</button>
                  </div>
                </div>
        `;
        cardContainer.append(card);
    })
  }

loadCategoryData();
loadPetsCardData();
