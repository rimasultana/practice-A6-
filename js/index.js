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
        <div onclick="loadCategoryHandelarData('${element.category}')" class='btn border-2 border-amber-400 flex  items-center justify-center  text-center '>
        <img class='w-8 object-cover' src='${element.category_icon}'/>
          <p>${element.category}</p>
        </div>
      `;
    categoryContainer.appendChild(div);
  });
};

const loadPetsCardData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  displayPetsCardData(data.pets.slice(0, 6));
};

const displayPetsCardData = (pets) => {
  const cardContainer = document.getElementById("card-container");
  const noData = document.getElementById("noData");
  cardContainer.innerHTML = "";

  noData.classList.add('hidden');
  cardContainer.classList.remove('hidden')
  if (pets.length == 0) {
    noData.classList.remove('hidden');
    cardContainer.classList.add('hidden')
  }

  pets.forEach((pet) => {
    console.log(pet);
    const { category, date_of_birth, price, image, breed, gender, pet_name ,petId } =
      pet;
    const card = document.createElement("div");
    card.classList = "card p-5 border border-gray-100 ";
    card.innerHTML = `
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
                    <button onclick="handelLikeButton('${image}')" class="btn border border-gray-200"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button onclick="countModal(this)" class="btn border border-gray-200 text-green-300">Adopt</button>
                    <button onclick="loadDetailsModalData('${petId}')" class="btn border border-gray-200 text-green-300">Details</button>
                  </div>
                </div>
        `;
    cardContainer.append(card);
  });
};


const loadDetailsModalData = async(petId) =>{
    const modalContainer = document.getElementById('modalContainer');
    my_modal_5.showModal()
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data = await res.json()
    console.log(data.petData);
     const {
      breed,
      gender,
      price,
      image,
      date_of_birth,
      pet_name,
      pet_details,
      vaccinated_status,
    } = data.petData
  modalContainer.innerHTML = '';
  const div = document.createElement('div');
  div.classList ='card card-compact bg-base-100   '
  div.innerHTML = `
          <figure>
                  <img
                    src="${image}"
                    alt="Shoes" />
                </figure>
              <div class='px-2 py-5'>
                  <h2 class="card-title font-bold">${pet_name}</h2>
                <div class=' grid grid-cols-2 gap-2 items-center  '>
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
                <p class="">
                 <i class="fa-solid fa-mercury"></i> Vaccinated status: ${
                   vaccinated_status ? vaccinated_status : "Not Available"
                 }
                </p>

                <p class='font-bold'>Details Information</p>
                <p>${pet_details}</p>
                 <div class="flex  justify-center">
            <div class="modal-action">
                <form method="dialog">
                  <button class="btn w-96 border-green-300 border">Close</button>
                </form>
              </div>
          </div>
  `;
  modalContainer.append(div);

}


const loadCategoryHandelarData = async (category) => {
    console.log(category);
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );
    const data = await res.json();
    displayPetsCardData(data.data);
  };


// Like button

const handelLikeButton =(img)=>{
    const imgContainer = document.getElementById('img-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div>
    <img class='w-28 object-cover rounded-md' src='${img}'/>
    </div>
    `;
    imgContainer.append(div);
}

// count-modal
function countModal(button) {
    button.innerHTML = "Adopted";
    button.disabled = true;
    button.classList.add("bg-gray-400", "text-white");
    let timerInterval;
    let countdown = 3; 
  
    Swal.fire({
      html: `
        <div class="flex items-center flex-col"> 
          <img src="https://img.icons8.com/?size=80&id=aUiThmwNs5sO&format=png" style="width: 80px; height: auto;" />  
          <br/>
          <strong class="text-3xl font-bold">Congratulations!</strong><br/>
          Adoption process is starting for your pet.<br/>
          <b class="text-2xl text-primary">${countdown}</b>
        </div>
      `,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        const timer = Swal.getPopup().querySelector("b");
  
        timerInterval = setInterval(() => {
          countdown--;
          timer.textContent = countdown > 0 ? countdown : 0;
  
          if (countdown <= 0) {
            clearInterval(timerInterval);
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      console.log("Adoption process is starting for your pet.");
    });
  }

loadCategoryData();
loadPetsCardData();
