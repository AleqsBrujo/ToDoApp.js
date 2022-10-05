
//Referencias HTML

import { todoList } from '../index';
import { Todo } from "../classes";


const divTodoList       = document.querySelector('.todo-list');
const inputTodo         = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const ulFiltros         = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');



export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id='${todo.id}'>
    <div class="view">
        <input class="toggle" type="checkbox" ${todo.completado? 'checked' : ''}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;


}

//Eventos
inputTodo.addEventListener('keyup', (event)=>{

    if(event.keyCode === 13 && inputTodo.value.length > 2){
        
        const nuevoTodo = new Todo(inputTodo.value);

        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        inputTodo.value = '';
        
    }

})

divTodoList.addEventListener( 'click', ( event ) => {

    const elementName = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');
    
    if( elementName.includes('input')){ //Detectar que se dio click en el input checkbox
        todoList.marcarCompletado( todoId );
        todoElement.classList.toggle('completed');

    }

    if ( elementName.includes('button') ){

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild( todoElement );
    }



})

borrarCompletados.addEventListener('click', ()=>{

   todoList.eliminarCompletados();

   for(let i = divTodoList.children.length - 1; i >= 0; i-- ){

        const elemento = divTodoList.children[i];
        
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

   }

})

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const element of divTodoList.children) {
        
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');
        
        switch ( filtro ) {

            case 'Pendientes':
                if( completado ){
                    element.classList.add('hidden')
                }
            break;

            case 'Completados':
                if( !completado ){
                    element.classList.add('hidden')
                }
            break;


        }


    }


})
 