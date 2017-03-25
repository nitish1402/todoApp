import { TestBed, inject } from '@angular/core/testing';

import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  it('should ...', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos()', () => {
    it('should return an empty array', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Todo Topic 1', complete: false});
      let todo2 = new Todo({title: 'Todo Topic 2', complete: true});

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#save(todo)', () => {
    it('should autmatically increment the id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Todo Topic 1', complete: false});
      let todo2 = new Todo({title: 'Todo Topic 2', complete: true});

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));
  });

  describe('#deleteTodoById(id)', () => {
    it('should delete todo with corresponding id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Todo Topic 1', complete: false});
      let todo2 = new Todo({title: 'Todo Topic 2', complete: true});

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not remove anything if todo with corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Todo Topic 1', complete: false});
      let todo2 = new Todo({title: 'Todo Topic 2', complete: true});

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#updateTodoById(id)', () => {
    it('should return the todo with corresponding id with updated data', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Todo Topic 1', complete: false});
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(1, {
        title: 'Changed The Title'
      });
      expect(updatedTodo.title).toEqual('Changed The Title');
    }));

    it('should return null if todo with corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Todo Topic 1', complete: false});
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(2, {
        title: 'Changed The Title'
      });
      expect(updatedTodo).toEqual(null);
    }));
  });

  describe('#toggleTodoComplete(todo)', () => {
    it('should return the updated todo with inverse complete status', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Todo Topic 1', complete: false});
      service.addTodo(todo1);
      let updatedTodo = service.toggleTodoComplete(todo1);
      expect(updatedTodo.complete).toEqual(true);
      service.toggleTodoComplete(todo1);
      expect(updatedTodo.complete).toEqual(false);
    }));
  });
});
