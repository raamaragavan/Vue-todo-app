import { createStore } from "vuex";
import axios from 'axios';

export default createStore({
  state: {
    toDoList: [
    ]
  },
  getters: {
    toDoItems: state => {
      return state.toDoList;
    }
  },
  mutations: {
    setToDolist(state, items) {
      state.toDoList = items
    },
    addItem(state, item) {
      state.toDoList.push(item)
      console.log('item added')
    },
    duplicateItem(state, item) {
      state.toDoList.push(item)
      console.log('duplicate item added')
    },
    editItem(state, item) {
      state.toDoList.forEach((todo) => {
        if(todo.id === item.id){
          todo.todo = item.todo;
          todo.completed = item.completed;
          todo.dueDate = item.dueDate;
        }
      })
    },
    completeItem(state, item) {
      item.completed = !item.completed;
      console.log('item completed')
    },
    removeItem(state, item) {
      state.toDoList.splice(state.toDoList.indexOf(item), 1);
    }
  },
  actions: {
    addItem({ commit }, item) {
      commit("addItem", {
        id: item.id,
        todo: item.todo,
        completed: false,
        dueDate: item.dueDate
      })
    },
    duplicateItem({ commit }, item) {
      commit("duplicateItem", {
        id: item.id,
        todo: item.todo,
        completed: item.completed,
        dueDate: item.dueDate
      })
    },

    editItem({ commit }, item) {
      commit("editItem", item);
    },
    completeItem({ commit }, item) {
      commit("completeItem", item);
    },
    removeItem({ commit }, item) {
      commit("removeItem", item);
    },
    randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))?.toLocaleDateString();
    },
    loadToDolist({ commit }) {
      axios
        .get(`https://dummyjson.com/todos`)
        .then((response) => {
          const todoList = response.data.todos;
          const today = new Date();
          const startDate = new Date(today.setDate(today.getDate() - 2));
          todoList.forEach((item) => {
            const endDate = new Date(today.setDate(today.getDate() + 1));
            item.dueDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))?.toLocaleDateString();
            delete item.userId;
          })
          commit('setToDolist', todoList)
        })
    }
  }
});