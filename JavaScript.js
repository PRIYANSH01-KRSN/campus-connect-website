function saveRating() {
  const rating = document.getElementById("ratingSelect").value;
  localStorage.setItem("neevly_rating", rating);

  const status = document.getElementById("ratingStatus");
  status.innerText = `Thanks! You rated Neevly ${rating}★`;
}

function saveComment() {
  const input = document.getElementById("commentInput");
  const comment = input.value.trim();
  if (!comment) return;

  const saved = JSON.parse(localStorage.getItem("neevly_comments") || "[]");
  saved.unshift({
    text: comment,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("neevly_comments", JSON.stringify(saved));
  input.value = "";
  renderComments();
}

function renderComments() {
  const list = document.getElementById("commentList");
  if (!list) return;

  list.innerHTML = "";
  const saved = JSON.parse(localStorage.getItem("neevly_comments") || "[]");

  saved.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.text} (${item.time})`;
    list.appendChild(li);
  });
}

(function initNeevly() {
  renderComments();

  const rating = localStorage.getItem("neevly_rating");
  const status = document.getElementById("ratingStatus");
  if (rating && status) {
    status.innerText = `Current saved rating: ${rating}★`;
  }
})();
