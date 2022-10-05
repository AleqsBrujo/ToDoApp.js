import { Todo } from "./todo.class";

export class TodoList {

    constructor(){
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo (id){
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
        
    }

    marcarCompletado( id ){
        
        for (let todo of this.todos){
            
            console.log(id, todo.id)
            if( todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;

            }

        } 

    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();

    }

    guardarLocalStorage(){

        localStorage.setItem('to-do', JSON.stringify(this.todos));

    }
    
    cargarLocalStorage(){

        this.todos = ( localStorage.getItem('to-do') )?
                      JSON.parse( localStorage.getItem('to-do') ) 
                      : [];    
                      
                      
            this.todos = this.todos.map(  obj  => Todo.fromJson( obj ));

    }
}

