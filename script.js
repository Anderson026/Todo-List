// pegar todos os campos
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userData = inputBox.value;//pega o valor do input
  if (userData.trim() != 0) {//verifica se o valor contém espaços
    addBtn.classList.add("active");//ativa o botão quando o input não está vazio
  } else {
    addBtn.classList.remove("active");//desativa o botão quando está vazio
  }
}

showTasks();//Mostra as tarefas no html

// se o usuário clicar no botão de adicionar tarefa
addBtn.onclick = () => {
  let userData = inputBox.value;//pega o valor do input
  let getLocalStorage = localStorage.getItem("New Todo");//adiciona o dado no localStorage
  if (getLocalStorage == null) {//se o localStorage estiver vazio
    listArr = [];//cria um array vazio
  } else {
    listArr = JSON.parse(getLocalStorage);//transforma o json em um objeto
  }
  listArr.push(userData);//da um push para adicionar o dado no array
  localStorage.setItem("New Todo", JSON.stringify(listArr));//transforma o array em string
  showTasks();//Mostra as tarefas no html
}
// função para adicionar as tarefas na lista
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");//adiciona o dado no localStorage
  if (getLocalStorage == null) {//Se o localStorage estiver vazio
    listArr = [];//cria-se um array vazio
  } else {
    listArr = JSON.parse(getLocalStorage);//senão pega os dados do locaStorage e transforma em json
  }

  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length;//mostra no html a quantidade de tarefas pendentes
  if (listArr.length > 0) {//se adicionar uma tarefa é habilitado o botão de deletar todas as tarefas
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");//senão desativa o botão de deletar todas as tarefas
  }

  let newLiTag = ``;
  listArr.forEach((element, index) =>{
    newLiTag += `<li>${element} <span onclick = "deleteTask(${index})">-</span></li>`;
  });
  todoList.innerHTML = newLiTag; //insere no html as tags li com as tarefas
  inputBox.value = ""; //limpa o campo do input após adicionar a tarefa
}
// função para deletar as tarefas da lista
function deleteTask(index){
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}
// função para deletar todas as tarefas
deleteAllBtn.onclick = () => {
  listArr = [];//esvazia o array
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}


