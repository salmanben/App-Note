var main = document.querySelector(".main")
var addNoteDiv = document.querySelector(".add-note")
var contentAdded = document.querySelector(".content-added")
var closeSymb = document.querySelector(".close")
var createBtn = document.getElementById("create-btn")
var addBtn = addNoteDiv.querySelector(".add-btn")
var update = ''
var title = document.getElementById("title");
var description = document.querySelector("textarea");

function addNote() {
	contentAdded.classList.add("active")
	main.style.filter = "blur(4px)"
}

var closeAddNote = function() {
	contentAdded.classList.remove("active")
	main.style.filter = "none"
	title.value = ""
	description.value = ""

}
closeSymb.onclick = closeAddNote
var arrNotes = []
createBtn.onclick = () => {
	title = document.getElementById("title");
	description = document.querySelector("textarea");
	if (!title.value && !description.value)
		return;
	var objNote = {
		title: title.value,
		description: description.value
	}
	if (localStorage.getItem("notes")) {
		arrNotes = JSON.parse(localStorage.getItem("notes"))
	}
	if (update !== '') {
		arrNotes[update].title = title.value
		arrNotes[update].description = description.value
		closeAddNote()
		update = ''
	} else
		arrNotes.unshift(objNote)
	localStorage.setItem("notes", JSON.stringify(arrNotes))
	showData();
	title.value = ''
	description.value = ''
}

function showData() {
	if (localStorage.getItem("notes")) {
		arrNotes = JSON.parse(localStorage.getItem("notes"))
		main.innerHTML = '';
		main.append(addNoteDiv);
		for (var i = 0; i < arrNotes.length; i++) {
			main.innerHTML += `
        <div class="note-container" id= "${arrNotes[i]}">
        <div class="text">
          <h4 class="title">Title: <span class="title">${arrNotes[i].title}</span>
          </h4>
          <p> Description: <span class="description">${arrNotes[i].description}</span>
          </p>
        </div>
        <div class="footer">
          <span class="date">${new Date().toDateString()}</span>
          <span class="points">...</span>
          <div class="settings-elements">
            <p class="edit" onclick="edit(${i})">
              <i class="fa-solid fa-pen-to-square"></i>
              <span id="edit">Edit</span>
            </p>
            <p class="delete" onclick="deleteNote(${i})">
              <i class="fa-solid fa-trash"></i>
              <span>Delete</span>
            </p>
          </div>
        </div>
      </div>`

		}
		settings()
	}

}
showData()

function settings() {
	var points = document.querySelectorAll(".points")
	points.forEach(e => {
		var settingsElements = e.parentNode.querySelector(".settings-elements")
		e.onclick = () => settingsElements.classList.toggle("active", !settingsElements.classList.contains("active"))
		settingsElements.onmouseleave = () => settingsElements.classList.remove("active")
	})
}

function deleteNote(i) {
	arrNotes = JSON.parse(localStorage.getItem("notes"))
	arrNotes.splice(i, 1)
	localStorage.setItem("notes", JSON.stringify(arrNotes))
	showData()
}

function edit(i) {
	arrNotes = JSON.parse(localStorage.getItem("notes"))
	contentAdded.classList.add("active")
	main.style.filter = "blur(4px)"
	title.value = arrNotes[i].title
	description.value = arrNotes[i].description
	update = i

}
