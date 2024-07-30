document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("myModal");
    const btnAdd = document.querySelector(".btn-add-lista");
    const span = document.getElementsByClassName("close")[0];
    const submitBtn = document.getElementById("submitBtn");
    const ul = document.getElementById("lista-ul");
    let currentItem = null;

    function loadList() {
        const savedList = JSON.parse(localStorage.getItem('minhaLista')) || [];
        savedList.forEach(item => {
            addItemToDOM(item);
        });
    }

    function saveList() {
        const items = Array.from(ul.children).map(li => li.querySelector('span').textContent);
        localStorage.setItem('minhaLista', JSON.stringify(items));
    }

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

    btnAdd.onclick = function () {
        currentItem = null;
        modal.style.display = "block";
        document.getElementById("titulo").value = "";
        submitBtn.textContent = "Adicionar";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

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
            document.getElementById("titulo").value = ""; 
        }
    }

    function editItem(event) {
        currentItem = event.currentTarget.parentElement.parentElement;
        document.getElementById("titulo").value = currentItem.querySelector("span").textContent;
        submitBtn.textContent = "Salvar";
        modal.style.display = "block";
    }

    function removeItem(event) {
        const li = event.currentTarget.parentElement.parentElement;
        li.remove();
        saveList();
    }

    loadList();
});
