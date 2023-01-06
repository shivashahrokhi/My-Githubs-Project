
const profilePhoto = document.querySelector('img');
const userName = document.getElementById('userName');
const submitButton = document.querySelector('.submit');
const bioField = document.querySelector('.bio');
const infoField = document.querySelector('.info');
const conectionInfoFeild = document.querySelector('.connectionInfo')



// send request to server and get data for input name then call functions to show result
async function getInfo(e) {
  e.preventDefault();
  let info = "";
  let name = userName.value;
  let savedData = await JSON.parse(window.localStorage.getItem(name));
  console.log(savedData);
  if (savedData != null) {
    info = savedData;
    setInfo(info);
    showAlert("Loaded From Local History.")
  } else {
    showAlert("");
    try {
      let response = await fetch(`https://api.github.com/users/${name}`);
        info = await response.json();
        if (response.status == 404) {
          showAlert("User Not Found...");
          return Promise.reject(`Request failed with error ${response.status}`);
        }
        let repos = await fetch(`https://api.github.com/users/${name}/repos`);
          repos = await repos.json();
          info.favRepo = findLanguage(repos);


      } catch (e) {
        console.log(e);
        showAlert("Oops...Something went wrong in your connecrion!");
      }
      setInfo(info);
      window.localStorage.setItem(name,JSON.stringify(info));
    }
  }


  // show result to user
  function setInfo(obj) {
    console.log(obj);
    profilePhoto.src = obj.avatar_url;
    if (obj.bio != null && obj.bio != "" ) {
      bioField.innerHTML = "<span>" + obj.bio.replace('\n', "<br/>") + "</span>";
    }
    else {
      bioField.innerHTML = "<span>" + "</span>";
    }
    let info = '';
    if (obj.name != null && obj.name != "" ) {
      info += obj.name + "<br/>";
    }
    if (obj.blog != null && obj.blog != "") {
      info += obj.blog + "<br/>";
    }
    if (obj.location != null && obj.location != "") {
      info += obj.location + "<br/>";
    }
    if (obj.favRepo == null) {
      info += "Favorite Programming Languge Could Not Be Found!";

    }else {
      info += "Favorite Programming Languge May Be: " + obj.favRepo;
    }

    infoField.innerHTML = "<span>" + info + "</span>";

  }

  submitButton.addEventListener('click', getInfo);


  // show error and messages to user
  function showAlert(title) {
    conectionInfoFeild.style.display = "block";
    conectionInfoFeild.innerHTML = "<span>" + title + "</span>";
  }

// find favorite language
  function findLanguage(obj) {
    let reposArray = [];
    if (obj.length > 5) {
      obj.forEach(makeRepoArray);
      function makeRepoArray(value,index,array) {
        if (value.language != null) {
          reposArray.push([value.pushed_at,value.language]);
        }
      }
      reposArray.sort(function (a, b) {
        return b[0].localeCompare(a[0]);
      });

      let scoreArray = new Array(0,0,0,0,0);
      for (var i = 0; i < 5; i++) {
        for (var j = i; j < 5; j++) {
          if (reposArray[i][1] == reposArray[j][1]) {
            scoreArray[i]++;
          }
        }
      }
      return reposArray[scoreArray.indexOf(Math.max(...scoreArray))][1];
    }
    return null;
  }

  window.localStorage.clear();
