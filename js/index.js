const loadCategoryData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCategoryData(data.categories);
};

const displayCategoryData = (categories) => {
    console.log(categories);
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

loadCategoryData();
