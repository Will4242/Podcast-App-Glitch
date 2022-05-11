const ratebtn  = document.querySelector("#rateit");

ratebtn &&
  ratebtn.addEventListener("click", () => {
   let userRating = parseInt(prompt("Rate this collection (from 1 to 5 stars)"));
  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("Try again with a number between 1 and 5!");
  }
  else{

    document.querySelector("#rating").innerHTML = "You gave a rating of: ";
    for (let i=0; i < userRating; i++){
        document.querySelector("#rating").innerHTML +="<i class='yellow star icon'></i>";
    }
  }
  
});


$(".delepisode").click(() => confirm('Really delete this episode?'))

$(".delpodcast").click(() => confirm('Really delete this podcast?'))

console.log("Hello from the Web App Dev 1 lab!");

const lightbluebtn = document.querySelector(".blue");

const welcomeUserDiv = document.querySelector("#welcomeuser");

const bluebtn = document.querySelector(".blue");

bluebtn &&
  bluebtn.addEventListener("click", () => {
    let readMoreDiv = document.querySelector("#readmore");
    if (readMoreDiv.style.display === "block") {
      readMoreDiv.style.display = "none";
    } else {
      readMoreDiv.style.display = "block";
    }
  });

const audio = {
  title: 'Podcasts',
  episodes: [
    {
      title: 'Epi No. 3',
      artist: 'Joe Rogan',
    }
  ],
  getRating() {
    let userRating = parseInt(prompt("Rate this collection (from 1 to 5 stars)"));
    if (userRating > 5 || userRating < 1 || isNaN(userRating)) {
      alert("Try again with a number between 1 and 5!");
    } 
    else {
      document.querySelector("#rating").innerHTML = `You gave a rating of: `;
      for (let i = 1; i<= userRating; i++){
        document.querySelector(`#rating`).innerHTML += `<i class="ui yellow star icon"></i>`
      }
      }
}
};


$(document).ready(function() {
  $("#tableoutput").html(`<h2 class='ui header'> ${audio.title}</h2>`);
  $("#tableoutput").append(
    `<table class='ui fixed striped table'><thead><tr><th>Episode</th>
                 <th>Artist</th></tr>
     </thead>
     <tbody>`
  );

  for (let theepisode of audio.episodes) {
    $("#tableoutput tr:last").after(
      `<tr><td>${theepisode.title}</td><td>${theepisode.artist}</td></tr>`);
  }

  $("#tableoutput").append(`</tbody></table>`);
$("#tableoutput").append(`<p><span id="rating"> </span></p>`);
  $("#tableoutput").append(
    `<button class="ui blue button" id = "ratingbtn"> Rate it! 
            <i class="star icon"></i>
    </button>`
);

  let rbtn = $('#ratingbtn');
  rbtn.on('click', () => {
    audio.getRating();
  })
});