export function createMurkUp(data) {
    console.log(data.length);
    const { name , flags } = data[0];
    return data.map(({ name, flags }) =>
      `<li class="country_item">
    <h3 class="country"> 
    <img src="${flags.svg}" class="flag" alt="" width=25px height=25px >
  </svg>
    ${name.official}           
    </h3>
  </li>`
  ).join('');
}

export function countryMurkUp(data) {
    const { name , flags, capital, population, languages } = data[0];
    const langList = Object.values(languages).join('');
    console.log(langList);
    return data.map(({ name , flags, capital, population, languages }) =>
    `<ul class="country-list">
    <li class="country_item">
      <h3 class="country"> 
      <img src="${flags.svg}" class="flag" alt="" width=25px height=25px >
    </svg>
      ${name.official}           
      </h3>
    </li>
  </ul>
    <p class='country-info_list'><b>Capital:</b> <span>${capital}</span></p>
    <p class='country-info_list'><b>Population:</b> <span>${population}</span></p>
    <p class='country-info_list'><b>Languages: </b><span>${langList}</span></p>`
  ).join('');
}