/* eslint-disable no-unused-vars */
import { useState } from "react";

const localStorageKey = "todo_list_file";

function newTask() {
  let input = document.getElementById("text_entry");

  if (!input.value) {
    prompt("Digite algo para ineserir à lista");
    showValues();
  } else {
    let valuesList = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    valuesList.push({
      name: input.value,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(valuesList));
    showValues();
  }
}

function showValues() {
  let valuesList = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let listView = document.getElementById("todo_list_view");
  listView.inerHTML = "";
  for (let i = 0; i < valuesList.length; i++) {
    listView.innerHTML += `<li>${valuesList[i]["name"]}</li>`;
  }
}

function toDoList() {
  const appName = "Lista de tarefas";
  let task = "";
  let list = "array";

  function addTask() {}

  return (
    <>
      <div>
        <h1>{appName}</h1>
        <p>
          <input
            type="text"
            id="text_entry"
            placeholder="Digite sua tarefa aqui"
          ></input>
          {task} <button onClick={newTask}> + </button>
        </p>
      </div>
      <div>
        <lo id="todo_list_view"></lo>
      </div>
    </>
  );
}

export default toDoList;
