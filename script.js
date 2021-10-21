document.body.innerHTML =`

<form id="form">
    <input type="text" id="search" placeholder="Search a Github User" />
  </form>
  <main id="main"></main>
  <div class="vamsi">  
<h4 class="press"> PRESS ENTER </h4>
</div>
`;                                                                                        
  
  const API_URL = "https://api.github.com/users/";

async function getUser(username) {
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(API_URL + username + "/repos");
    const respData = await resp.json();
    addReposToCard(respData);
  }
  
  function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");
    repos.forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;
            reposEl.appendChild(repoEl);
        });
  }
  
 

function createUserCard(user) {
  const cardHTML = `
<div class="card">
<div>
<img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
 </div>
 <div class="user-info">
<h2>${user.name}</h2>
 <ul class="info">
 <li><strong>Follwers :</strong>${user.followers}</li>
 <li><strong>Forkcount :</strong>${user.forks_count}</li>
  <li><strong>Repos :</strong>${user.public_repos}</li>
  <li><strong>Starcount:</strong>${user.public_starcount}</li>
 </ul>
            
<div id="repos"></div>
 </div>
   </div>
    <h3> RESPECTED SIR/MADAM; </h3>
   <spam> can i get solution for star and fork </spam>
  `;

  main.innerHTML = cardHTML;
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
  });


