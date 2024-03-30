const itemContainer = document.querySelector(".item_container");

const getData = async () => {
    const { data } = await axios.get(
        "https://my.api.mockaroo.com/voting.json?key=fd46f130"
    );
    const totalVotes = data.reduce((acc, value) => acc + value.Score, 0);
    console.log(totalVotes);
    const voteItems = data.map(
        (item) => `
        <span class="subject">${item.Choice}</span>
        <span class="score">${((item.Score / totalVotes) * 100).toFixed(
            2
        )}%</span>
        <div class="percent-bar percent_5"></div>
    `
    );
    voteItems.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("voting_item");
        div.innerHTML = element;
        itemContainer.appendChild(div);
    });
};

getData();
