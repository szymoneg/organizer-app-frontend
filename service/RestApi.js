//not working yet
export async function postData(url = '', data = {}){
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

//not working yet
export async function getData(url = ''){
   await fetch(url)
    .then(response => response.json())
    .then(json => {
      json.length = 10;
      return json;
    })
}
