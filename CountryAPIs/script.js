const countrySearch = document.getElementById("country-search");
const searchBtn = document.getElementById("searchBtn");
const countryContainer = document.getElementById("country-container");

const mainNeighborContainer = document.getElementById("main-neighbor-container")

const rest_api = "https://restcountries.com/v3.1/all"

function fetchCountry(rest_api){
    fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
        
        window.countriesData = data;
    })
};

function displayCountryInfo(countries) {
    countryContainer.innerHTML = ""; 

    countries.forEach((country) => {
        let divContainer = document.createElement("div");
        divContainer.classList.add("divContainer");

        console.log(country);

        divContainer.innerHTML = `
            <img src=${country.flags.png} alt="Country logo"/>
            <h2>${country.name.common}</h2>
            <h3>${country.continents}</h3><br>
            <h4>👨‍👩‍👧‍👦 ${country.population}</h4>
            <h4>👩‍🦱 ${country.languages ? Object.values(country.languages).join(', ') : 'Unknown'}</h4>
            <h4>💸 ${country.currencies ? Object.values(country.currencies)[0].name : 'Unknown'}</h4>
        `;

        countryContainer.appendChild(divContainer); 

       
        mainNeighborContainer.innerHTML = "";

        if (country.borders && country.borders.length > 0) {
            const firstNeighborCode = country.borders[0];
            const firstNeighbor = window.countriesData.find(c => c.cca3 === firstNeighborCode);

            if (firstNeighbor) {
                let neighborContainer = document.createElement("div");
                neighborContainer.classList.add("neighborContainer");

                neighborContainer.innerHTML += `
                    <h3>🌍 Neighboring Country: ${firstNeighbor.name.common}</h3>
                    <img src=${firstNeighbor.flags.png} alt="Neighbor flag"/>
                    <h4>${firstNeighbor.name.common}</h4>
                    <h5>${firstNeighbor.continents}</h5>
                    <h5>👨‍👩‍👧‍👦 ${firstNeighbor.population}</h5>
                    <h5>👩‍🦱 ${firstNeighbor.languages ? Object.values(firstNeighbor.languages).join(', ') : 'Unknown'}</h5>
                    <h5>💸 ${firstNeighbor.currencies ? Object.values(firstNeighbor.currencies)[0].name : 'Unknown'}</h5>
                `;

                mainNeighborContainer.appendChild(neighborContainer); 
            }
        }
    });
}

searchBtn.addEventListener("click", function() {
    const searchTerm = countrySearch.value.trim().toLowerCase()

    if ( window.countriesData) {
        const filteredCountry =  window.countriesData.filter((country) => {
            return country.name.common.toLowerCase().includes(searchTerm);
        })
        displayCountryInfo(filteredCountry)
    }
    

})

fetchCountry()




