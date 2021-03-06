import axios from "axios";

console.log('Location app starts...');

const form = document.querySelector('form')!; 
const addressInput=document.getElementById('address')! as HTMLInputElement; 

const GOOGLE_API_KEY= 'AIzaSyAb8LDRqUOhRoxYmH7Oop1F-aIMVKAT4io'; 
//declare let google:any; // we installed npm install google types something. 


//own custom type
type GoogleGeoCodingResponse={
    results:{geometry:{location:{lat:number; lng:number}}}[]; 
    status:'OK'|'ZERO_RESULTS';
}

function searchAddressHandler(e:Event){
    e.preventDefault(); 
    const enteredAddress =addressInput.value;
    // third part API to check the address 
   /*  axios.get(`
    https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`) */

    axios
    .get<(GoogleGeoCodingResponse)>(`
    https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)

    .then((response)=>{
        if (response.data.status !=='OK'){
            throw new Error('Could not find location'); 
        }
        console.log(response);
        const coordinates=response.data.results[0].geometry.location
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
            center:coordinates, 
            zoom:80,
        }
        );
        new google.maps.Marker({position:coordinates, map:map})
    })
    
    .catch((error) =>{
        alert(error.message);
        console.log(error);  
    })
}

//event listener for form button 

form.addEventListener('submit', searchAddressHandler); 