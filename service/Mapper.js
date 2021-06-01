//function mapping json from api to list key-value, unable to read by agenda
export function mapper(listArr, listCalendar){
  listArr.map(item => {
    let startTaskTime = item.startTask.substring(11,item.startTask.length - 2);
    addValueToDict(listCalendar, item.startTask.substring(0,10), {
      //Task Content
      name: item.descriptionTask + "Od:" + startTaskTime,
      marked: true})
  })
  console.log(listCalendar)
  return listCalendar;
}

//function add value to exist disc
function addValueToDict(arr, key, value){
  if (!arr[key]) {
    arr[key] = [value];
  }
  else {
    arr[key].push(value);
  }
}
