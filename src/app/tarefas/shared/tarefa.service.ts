import { Injectable } from '@angular/core';
import { TarefasModule } from '..';
import { Tarefa } from './';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor() { }

    listarTodos(): Tarefa[]{ // Aqui lista todas tarefas
      const tarefas = localStorage['tarefas'];
      return tarefas ? JSON.parse(tarefas) : [];
    } 

    cadastrar(tarefa: Tarefa): void { // Aqui adiciona uma tarefa
      const tarefas = this.listarTodos();
      tarefa.id = new Date().getTime();
      tarefas.push(tarefa);
      localStorage['tarefas'] = JSON.stringify(tarefas);
    }
    
    buscarPorId(id: number): Tarefa{ // Busca por id
      const tarefas: Tarefa[] = this.listarTodos();
      return tarefas.find(tarefa => tarefa.id === id);
    }

    atualizar(tarefa: Tarefa): void { // Atualiza uma tarefa
      const tarefas: Tarefa[] = this.listarTodos();
      tarefas.forEach((obj, index, objs) => {
        if(tarefa.id === obj.id){
          objs[index] = tarefa;
        }
      });
      localStorage['tarefas'] = JSON.stringify(tarefas);
    }

    remover(id: number): void{ // Remove uma tarefa por id
      let tarefas: Tarefa[] = this.listarTodos();
      tarefas = tarefas.filter(tarefa => tarefa.id !== id);
      localStorage['tarefas'] = JSON.stringify(tarefas);
    }

    alterarStatus(id: number): void { // Altera o status de uma tarefa
      const tarefas: Tarefa[] = this.listarTodos();
      tarefas.forEach((obj, index, objs) => {
        if(id === obj.id){
          objs[index].concluida = !obj.concluida;
        }
      });
      localStorage['tarefas'] = JSON.stringify(tarefas);
    }
}
