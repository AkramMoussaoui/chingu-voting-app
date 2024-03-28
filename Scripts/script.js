// const itemContainer = document.querySelector('.item_container');

axios.get("https://my.api.mockaroo.com/voting.json?key=fd46f130").then(response => {
    console.log(response.data)
})

// const getData = async () => {
//     const response = await axios.get("https://my.api.mockaroo.com/voting.json?key=fd46f130")
//     console.log(response.data)
// }

// getData()

