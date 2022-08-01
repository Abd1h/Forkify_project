import { TIME_OUT } from './config';

//defualt time out function
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    //fetching recipe
    const respons = await Promise.race([fetch(url), timeout(TIME_OUT)]); //real life use of race

    const data = await respons.json();

    if (!respons.ok) throw new Error(`${data.message} --- (${data.status})`);

    return data.data;
  } catch (err) {
    throw err; // doing this to handel the err in the controller
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    //sending recipe
    const respons = await Promise.race([
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        catch: 'no-catch',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIME_OUT),
    ]); //real life use of race

    // forkfy API will return the data that we send
    // so await for it
    const data = await respons.json();

    if (!respons.ok) throw new Error(`${data.message} --- (${data.status})`);

    return data.data;
  } catch (err) {
    throw err; // doing this to handel the err in the controller
  }
};
