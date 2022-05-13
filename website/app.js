/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=9f76e62168ca5ff8f168f2cfdea20553&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


// add event linser to generate button

document.getElementById('generate').addEventListener('click',()=>{
    let zipCode = document.getElementById('zip').value;
    if(!zipCode || zipCode.length != 5){
        //if the user didn't enter a valid zip code
        alert("Please enter a valid zip code");
    }else{
        /*get data from the api using fetch function*/
        const getData = async ()=>{
            const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`);
            try {
                const data = await request.json();
                let feelings = document.getElementById('feelings').value;
                console.log(`${data.main.temp},,${feelings},,${newDate}`);
                postData('/postData',{temp:data.main.temp, date:newDate,feel:feelings});
                retrieveData();
            } catch (error) {
                console.log(`Error Msg : ${error}`);
            }
        }
        getData();
    }

});

// POST data to server.js api
const postData = async(url = '',data={})=>{
    const response = await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const getData = await response.json();
        return getData;
    }catch(error){
        console.log("error",error);
    }
}

// get data from my server.js api
const retrieveData = async () =>{
    const request = await fetch('/getData');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }