// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

if('serviceWorker' in navigator){
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      //successful
      console.log('Serviceworker succesful with scope: ', registration.scope);

      }, function(err){
        //failed
        console.log('ServiceWorker Failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        newPost.addEventListener('click', ()=> {
          //console.log(window.location.hash);
          router.setState('single-entry', newPost, false);
        })
      });
    });
});

var settingsButton = document.querySelector("img[src='settings.svg']");
settingsButton.addEventListener('click', ()=> { 
 
  router.setState('settings', null, false);
  
});


//when click big text to go home on click
var bigText = document.querySelector('header h1');
bigText.addEventListener('click', () => {
  //console.log("hello");
  if(history.state.name != 'home' && history.state != null){
  router.setState('home', null, false);
  }
});

//popstate event listener back button
window.addEventListener('popstate', (e) => {
  setState(e.state, e, true);
});