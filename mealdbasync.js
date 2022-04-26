const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';

    if (searchText == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Please write the meal name to search",

        });
    }

    else {

        //load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));

    }

    displaySearchResult = meals => {
        const searchResult = document.getElementById('search-result');
        searchResult.innerHTML = '';


        if (meals == null) {
            //show no result found

            const nullSearch = document.getElementById('null-search');

            nullSearch.innerText = `No result found please search for another meal`;

        }
        else {

            const nullSearch = document.getElementById('null-search');
            nullSearch.innerHTML = '';

            meals.forEach(meal => {
                // console.log(meal);
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
          <div onclick="loadMealDetail(${meal.idMeal})" class="card">
          <img src="${meal.strMealThumb}"class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
          </div>
        </div>
          `;
                searchResult.appendChild(div);

            });
        }
    }
}

const loadMealDetail = async mealId => {
    // console.log(mealId);
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);

    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetail(data.meals[0]));
}



const displayMealDetail = meal => {

    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
      </div>
      `;
    mealDetails.append(div);
}