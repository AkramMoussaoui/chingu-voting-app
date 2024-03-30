const itemContainer = document.querySelector(".voting_container");
const btn = document.querySelector(".btn");
let selectedOne = false;

const handleItemClick = (event) => {
  const newSelectedChoice = event.target;
  const parent = event.target.parentNode;

  // If there's already a selected choice, remove it
  const oldSelectedChoice = parent.querySelector(".active");
  if (oldSelectedChoice) {
    oldSelectedChoice.classList.toggle("active");
  }

  // Add active class to the new selected choice
  newSelectedChoice.classList.toggle("active");
  selectedOne = true;
};

const getData = async () => {
  // Get data from API
  const { data } = await axios.get(
    "https://my.api.mockaroo.com/voting.json?key=fd46f130"
  );

  // Create new items HTML
  const voteItems = data.map(
    (item) => `
        <span class="subject">${item.Choice}</span>
        <span class="score"></span>
        <div class="percent-bar"></div>
    `
  );

  // Append them in the dom
  voteItems.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("voting_item");
    div.innerHTML = element;

    // Add event listener to handle click
    div.addEventListener("click", handleItemClick);

    itemContainer.appendChild(div);
  });

  // When submiting vote, show the results
  btn.addEventListener("click", (event) => {
    // Check if an element is selected
    if (!selectedOne) {
      // If the there's no project selected, show alert
      alert("You must select a choice before submiting");
      return;
    }

    // Compute the sum of all votes
    const totalVotes = data.reduce((acc, value) => acc + value.Score, 1);

    const votingItems = document.querySelectorAll(".voting_item");
    for (const votingItem of votingItems) {
      // Remove click event listener
      votingItem.removeEventListener("click", handleItemClick);

      const subject = votingItem.querySelector(".subject").innerText;
      const scoreElement = votingItem.querySelector(".score");
      const percentElement = votingItem.querySelector(".percent-bar");
      const active = votingItem.querySelector(".active");

      // Find the item inside the data array with the subject
      const dataItem = data.find((item) => item.Choice === subject);

      // If it's the active item, add the vote we give it
      if (active) dataItem.Score += 1;

      // Compute the score we will display
      const displayedScore = ((dataItem.Score / totalVotes) * 100).toFixed(2);

      scoreElement.innerText = displayedScore + "%";

      // Show the percent bar of the score
      percentElement.style.width = displayedScore + "%";
    }
  });
};

getData();
