import './css/styles.css';
import {createMurkUp} from './js/createMarkup';
import {countryMurkUp} from './js/createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { UnsplashAPI } from './js/UnsplashAPI';
import { refs } from './js/refs';
import debounce from 'lodash.debounce';

const unsplash = new UnsplashAPI();

const DEBOUNCE_DELAY = 300;
// const input = document.getElementById('search-box');
// const countryWrapperRef = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info'); 

refs.input.addEventListener('input', debounce(searchInput, DEBOUNCE_DELAY));

  function searchInput(event) {
    event.preventDefault();
    const name = event.target.value.trim().toLowerCase();
    unsplash.getCountrybyName(name).then(data => {
      if (name === '') {
        return  newList () 
      }
      newList () 
      if(data.length === 1) {
        const murkupInfo = countryMurkUp(data);
        refs.countryInfo.insertAdjacentHTML('beforeend', murkupInfo);
        const murkup = createMurkUp(data);
        refs.countryWrapperRef.insertAdjacentHTML('beforeend', murkup);
      } else if (data.length >= 10){
        alertTooManyMatches() 
      }
      else   {
        const murkup = createMurkUp(data);
        refs.countryWrapperRef.insertAdjacentHTML('beforeend', murkup); 
      } 

    }).catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
  }
  
  function newList () {
    refs.countryWrapperRef.innerHTML ='';
    refs.countryInfo.innerHTML =''; 
  }


  function alertTooManyMatches() {
    Notify.info('Too many matches found. Please enter a more specific name.')
  }
  