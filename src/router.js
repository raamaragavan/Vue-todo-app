import { createRouter, createWebHistory } from 'vue-router/dist/vue-router.esm-bundler'
import TodoList from './views/TodoList.vue'

export default () => createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList,
    },
    {
      path: '/add',
      name: 'Add',
      component: () => import('./views/CreateTodo.vue')
    },
    {
      path: '/edittask/:id',
      name: 'EditTask',
      component: () => import('./views/EditTodo.vue')
    },
  ]
})