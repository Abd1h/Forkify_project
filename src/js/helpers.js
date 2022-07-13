import {TIME_OUT} from "./config"

//defualt time out function
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  
export const getJSON = async function (url){
try{
   //fetching recipe
   const respons = await Promise.race([fetch( url ),timeout(TIME_OUT)]) ; //real life use of race
   console.log(respons)

   const data = await respons.json();
  if (!respons.ok)
     throw new Error(`something went wrong with getting your recipe`);

 return data.data.recipe
}catch(err){
    throw err // doing this to handel the err in the model.js 
}
}