// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("myModal");
    const btnAdd = document.querySelector(".btn-add-lista");
    const span = document.getElementsByClassName("close")[0];
    const submitBtn = document.getElementById("submitBtn");
    const ul = document.getElementById("lista-ul");
    let currentItem = null;

    // Load list from local storage
    function loadList() {
        const savedList = JSON.parse(localStorage.getItem('minhaLista')) || [];
        savedList.forEach(item => {
            addItemToDOM(item);
        });
    }

    // Save list to local storage
    function saveList() {
        const items = Array.from(ul.children).map(li => li.querySelector('span').textContent);
        localStorage.setItem('minhaLista', JSON.stringify(items));
    }

    // Add item to the DOM
    function addItemToDOM(title) {
        const li = document.createElement("li");
        li.className = "lista";
        li.innerHTML = `<span>${title}</span>
                        <div class="lista-buttons">
                            <button class="btn-edit">&#9998;</button>
                            <button class="btn-remove">&times;</button>
                        </div>`;
        ul.appendChild(li);
        li.querySelector(".btn-edit").addEventListener('click', editItem);
        li.querySelector(".btn-remove").addEventListener('click', removeItem);
    }

    // When the user clicks the button, open the modal to add new item
    btnAdd.onclick = function () {
        currentItem = null;
        modal.style.display = "block";
        document.getElementById("titulo").value = "";
        submitBtn.textContent = "Adicionar";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // When the user clicks the submit button, add or edit the list item
    submitBtn.onclick = function () {
        const title = document.getElementById("titulo").value;
        if (title.trim()) {
            if (currentItem) {
                currentItem.querySelector("span").textContent = title;
            } else {
                addItemToDOM(title);
            }
            saveList();
            modal.style.display = "none";
            document.getElementById("titulo").value = ""; // Clear the input field
        }
    }

    // Add edit functionality to existing items
    function editItem(event) {
        currentItem = event.currentTarget.parentElement.parentElement;
        document.getElementById("titulo").value = currentItem.querySelector("span").textContent;
        submitBtn.textContent = "Salvar";
        modal.style.display = "block";
    }

    // Add remove functionality to existing items
    function removeItem(event) {
        const li = event.currentTarget.parentElement.parentElement;
        li.remove();
        saveList();
    }

    // Load the list when the page is loaded
    loadList();
});
