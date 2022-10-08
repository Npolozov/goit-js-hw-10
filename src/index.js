import './css/styles.css';
import { refs } from './js/refs';
import {createMurkUp} from './js/createMarkup';
import {countryMurkUp} from './js/createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { UnsplashAPI } from './js/UnsplashAPI';
import debounce from 'lodash.debounce';

const unsplash = new UnsplashAPI();
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(searchInput, DEBOUNCE_DELAY));

  function searchInput(event) {
    event.preventDefault();
    const name = event.target.value.trim().toLowerCase();
    if (name === '') {
      return (refs.countryWrapperRef.innerHTML =''), (refs.countryInfo.innerHTML ='')
    }
    unsplash.getCountrybyName(name).then(data => {
      refs.countryWrapperRef.innerHTML ='';
      refs.countryInfo.innerHTML ='';
      if (name.length) {
        alertTooManyMatches()
      }
      else if(data.length >= 2 && data.length <= 10) {
        const murkup = createMurkUp(data);
        refs.countryWrapperRef.insertAdjacentHTML('beforeend', murkup);
      } else if (data.length === 1) {
        refs.countryWrapperRef.innerHTML ='';
        const murkupInfo = countryMurkUp(data);
        refs.countryInfo.insertAdjacentHTML('beforeend', murkupInfo);
      } 
    }).catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
  }


  function alertTooManyMatches() {
    Notify.info('Too many matches found. Please enter a more specific name.')
  }

  