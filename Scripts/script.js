
const itemContainer = document.querySelector('.item_container');

// axios.get("https://my.api.mockaroo.com/voting.json?key=fd46f130").then(response => {
//     console.log(response.data)
// })
const getData = async () => {
    const { data } = await axios.get('https://my.api.mockaroo.com/voting.json?key=fd46f130')
    const voteItems = data.map(item => `
    <span class = "subject"> ${item.Choice}</span>
    <span class = "score"> ${item.Score}</span>`)

    voteItems.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = element;
        itemContainer.appendChild(div);

    });
}
getData();

























