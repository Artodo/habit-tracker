'use strict'
const taskInput = document.querySelector('.task__input');
const done = document.querySelector('.done');
const contentData = document.querySelector('.content');
let numberClick = 0;
let inputData = '';
const progressStatus = document.querySelector('.progress-status');
const percentages = document.querySelector('.percentages');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.cross');
const panel = document.querySelector('.panel');
const main = document.querySelector('.main');
const nameNewTask = document.getElementById('nameNewTask');
const purposeNewTask = document.getElementById('purposeNewTask');
const addNewTaskBtn = document.querySelector('.add-new-taskBtn');
const listImagesModal = document.querySelectorAll('.img-item');
const welcome = document.querySelector('.welcome');




// show modal //
function showModal() {
  if (modal.classList.contains('show-modal')) {
    modal.classList.remove('show-modal');
  } else {
    modal.classList.add('show-modal');
    if (!document.getElementsByClassName('images-active').length > 0) {
      addNewTaskBtn.disabled = true;
    }
  }
};

// closeModal //
closeModalBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.classList.remove('show-modal');
  if (document.getElementsByClassName('images-active')[0]) {
    document.getElementsByClassName('images-active')[0].classList.remove('images-active');
  }

}

// RENDER CONTENT //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function renderContentDefault(){
 
  const panel = document.createElement('div');
  panel.classList.add('panel');
  main.append(panel);

  const logo = document.createElement('img')
  logo.classList.add('logo');
  logo.src = "./images/logo.svg"
  logo.alt = 'logo';
  panel.append(logo);

  const navList = document.createElement('ul');
  navList.classList.add('nav-list');
  panel.append(navList);
  
  const addNewTaskImg = document.createElement('li');
  addNewTaskImg.classList.add('nav-item');
  addNewTaskImg.setAttribute('id', 'addTask');
  addNewTaskImg.setAttribute('onclick', 'showModal()');
  navList.append(addNewTaskImg);

  const navItemAddNewTaskImg = document.createElement('img');
  navItemAddNewTaskImg.classList.add('nav-img');
  navItemAddNewTaskImg.src = "./images/add.png";
  navItemAddNewTaskImg.alt = 'Add task';
  addNewTaskImg.append(navItemAddNewTaskImg);
}

function renderContent(content) {

  content.forEach(() => {
    
    const navList = document.createElement('ul');
    navList.classList.add('nav-list');
    panel.append(navList);

  const navItem = document.createElement('li');
    navItem.classList.add('nav-item');
    navList.append(navItem);

    const navItemTaskImg = document.createElement('img');
    navItemTaskImg.classList.add('nav-img');
    navItemTaskImg.src = [0].img;
    navItemTaskImg.alt = 'Add task';
    navItem.append(navItemTaskImg);
  });



    content.forEach((habbit, index) => {
      //  add  content ////////////////////////////      
      const habbitWrapper = document.createElement('div');
      habbitWrapper.classList.add('habbit__wrapper');
      habbitWrapper.setAttribute("id", `habbit_${index + 1}`)
      contentData.append(habbitWrapper);

      const subContent = document.createElement('div');
      subContent.classList.add('sub-Content');
      habbitWrapper.append(subContent);

      const section = document.createElement('section');
      section.classList.add('content__title');
      subContent.append(section);

      const h1 = document.createElement('h1');
      h1.classList.add('h1');
      section.append(h1);
      h1.textContent = habbit.name;

      const progress = document.createElement('div');
      progress.classList.add('progress');
      section.append(progress);

      const progressTitle = document.createElement('div');
      progress.classList.add('progress__title');
      progress.append(progressTitle);
      progressTitle.textContent = 'Прогресс';

      const percentages = document.createElement('div');
      percentages.classList.add('percentages');
      progress.append(percentages);
      percentages.textContent = '0%';

      const executionStatus = document.createElement('div');
      executionStatus.classList.add('execution-status');
      progress.append(executionStatus);

      const progressStatus = document.createElement('div');
      progressStatus.classList.add('progress-status');
      executionStatus.append(progressStatus);

      const taskString = document.createElement('div');
      taskString.classList.add('task');
      subContent.append(taskString);

      const newNumberDay = document.createElement('div');
      newNumberDay.classList.add('day-number');
      newNumberDay.textContent = 'Дeнь №';
      taskString.append(newNumberDay);

      const taskNewText = document.createElement('div');
      taskNewText.classList.add('task__text');
      taskString.append(taskNewText);

      const comentImg = document.createElement('img');
      comentImg.classList.add('add-coment');
      comentImg.src = "./images/coment.svg"
      comentImg.alt = 'add coment';
      taskNewText.append(comentImg);

      const inputAddComent = document.createElement('input');
      inputAddComent.classList.add('task__input');
      inputAddComent.type = "text";
      inputAddComent.placeholder = "Комментарий";
      inputAddComent.setAttribute = ("id", "input");
      taskNewText.append(inputAddComent);

      const addComentBtn = document.createElement('button');
      addComentBtn.classList.add('done');
      addComentBtn.setAttribute("onclick", "ttt()");
      addComentBtn.textContent = 'Готово';
      taskNewText.append(addComentBtn);

      const newtask = document.createElement('div');
      newtask.classList.add('task');
      habbitWrapper.append(newtask);

      for (let i = 0; i <= habbit.days.length - 1; i++) {

        const taskWrapper = document.createElement('div');
        taskWrapper.classList.add('task__wrapper');
        newtask.append(taskWrapper);

        const dayNumber = document.createElement('div');
        dayNumber.classList.add('day-number');
        dayNumber.textContent = `День ${i + 1}`;
        taskWrapper.append(dayNumber);

        const taskInput = document.createElement('div');
        taskInput.classList.add('task__text');
        taskInput.textContent = habbit.days[0].textMessage;
        taskWrapper.append(taskInput);
      }
    });
}


document.addEventListener("DOMContentLoaded", () => {
  const localStorageData = localStorage.getItem("app");
  const content = JSON.parse(localStorageData);
  if (localStorageData && localStorageData.length) {
    welcome.style.display = "none";
    renderContent(content);
    console.log('localStorageData');
    renderContentDefault();
  } else {
    renderContentDefault();
    console.log('localStorageData нету');
  }
});



// //////////////// работа с модалкой выделение иконок////////////////////
listImagesModal.forEach((el) => {
  el.addEventListener('click', function () {
    removeClassActive();
    el.classList.add('images-active');
    addNewTaskBtn.disabled = false;
  })
})

function removeClassActive() {
  listImagesModal.forEach((el) => {
    el.classList.remove('images-active');
  })
}


////////добавление новой привычки в массив привычек и localStorage//////////////////////////////////////////////////////
addNewTaskBtn.addEventListener('click', captureData);
function captureData() {
  // добавление изображения в привычку
  const targetImgName = document.getElementsByClassName('images-active')[0].firstChild.getAttribute('id');

const localStorageData = localStorage.getItem("app");
let content = JSON.parse(localStorageData) || [];
console.log(content?.length);

  let habbit = {
    id:  content.length + 1,
    img: `./images/${targetImgName}.svg`,
    "name": nameNewTask.value,
    "purpose": purposeNewTask.value,
    "days": [
      {}
    ]
  }

content.push(habbit);
localStorage.setItem("app", JSON.stringify(content));

  JSON.parse(localStorage.getItem("app"));
  nameNewTask.value = "";
  purposeNewTask.value = "";
  document.getElementsByClassName('images-active')[0].classList.remove('images-active');
  closeModal();
  
  welcome.style.display = "none";
  renderContent(content);
};
