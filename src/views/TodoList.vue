<template>
  <div id="home">
    <h1>To-Do List</h1>
    <div class="top-actions">

      <div class="inline-flex rounded-md shadow-sm" role="group" style="float:left;">
        <button type="button" @click="selectMode('all')"
          :class="[selectedMode === 'all' ? 'text-purple-500 hover:text-purple-400' : 'text-gray-500 hover:text-purple-400']"
          class="px-4 py-2 text-sm  bg-white border border-gray-200 rounded-l-lg">
          All
        </button>
        <button type="button" @click="selectMode('pending')"
          :class="[selectedMode === 'pending' ? 'text-purple-500 hover:text-purple-400' : 'text-gray-500 hover:text-purple-400']"
          class="px-4 py-2 text-sm font-medium bg-white border-t border-b border-gray-200">
          Pending
        </button>
        <button type="button" @click="selectMode('completed')"
          :class="[selectedMode === 'completed' ? 'text-purple-500 hover:text-purple-400' : 'text-gray-500 hover:text-purple-400']"
          class="px-4 py-2 text-sm font-medium hover:text-purple-400 text-gray-900 bg-white border border-gray-200 rounded-r-md">
          Completed
        </button>
      </div>
      <button type="button"
        class="add-btn bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-sm text-white font-bold py-2 px-4 rounded"
       @click="addTask()">
        Add
      </button>
    </div>
    <div v-if="toDoItems && toDoItems.length">
      <div v-for="(todo) in sortedItems" :key="todo.id"  :class="[checkDueDateValid(todo) ? '':'incomplete-task-error']"
        class="card-outer-section block w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div class="card-inner-section">
          <div class="description-section">
            <h4>{{ todo.todo }} </h4>
            <p class="text-base text-neutral-600 dark:text-neutral-200"
              style="color:#999;font-size:14px;margin-bottom:5px;">
              Due Date on {{ todo.dueDate }}
              
            </p>

          </div>
          <div class="bottom-section">
            <p class="text-base text-neutral-600 dark:text-neutral-200">
              <span
                :class="[todo.completed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300']"
                class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full" style="float:left;">{{ todo.completed ?
                  "Completed" : "Pending" }}</span>
              <a href="javascript:void(0)" v-if="!todo.completed && checkDueDateValid(todo)" class="duplicate-links"
                @click="duplicateTask(todo)"
                style="font-size:12px;margin-right:10px;position: relative;top: -2px;margin-left:10px">
                Duplicate
              </a>
              <a href="javascript:void(0)" @click="completeTask(todo)" class="text-green-500"
                v-if="!todo.completed && checkDueDateValid(todo)"
                style="font-size:12px;position: relative;top: -2px;">Mark as Completed</a>
                <a href="javascript:void(0)" v-if="!todo.completed && checkDueDateValid(todo)" class="links"
              style="font-size:12px;margin-left:10px;margin-right:10px;position: relative;top: -2px;">
              <router-link :to="`/edittask/${todo.id}`">
                Update
              </router-link>
            </a>
            <a href="javascript:void(0)" class="error-links" @click="deleteItem(todo)"
              style="font-size:12px;margin-right:10px;position: relative;top: -2px;">
              Delete
            </a>

            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showConfirmationPopup" class="modal-backdrop">
      <div class="modal-outer-section">
        <div class="modal-section">
          <div class="modal-header">
            <h3>Delete Confirmation Popup</h3>
          </div>
          <div class="modal-content">
            <p>Are you sure do you want to delete the task <b>{{ todoItem?.todo }}</b> ?</p>

          </div>
          <div class="modal-footer">
            <button
              class="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              @click="cancelDeleteConfirmationItem(todoItem)" type="button">
              Cancel
            </button>
            <button
              class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              @click="deleteConfirmationItem(todoItem)" type="button">
              Ok
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { cilPen, cilTrash, cilCheckAlt, cilPlus } from '@coreui/icons';
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "TodoList",
  components: {
  },
  setup() {
    return {
      cilPen,
      cilTrash,
      cilCheckAlt,
      cilPlus
    }
  },
  data() {
    return {
      selectedMode: 'all',
      showConfirmationPopup: false,
      todoItem: null
    };
  },
  mounted() {
    if (!this.toDoItems.length) {
      this.$store.dispatch('loadToDolist')
    }
  },
  methods: {
    ...mapActions([
      'completeItem',
      'duplicateItem',
      'removeItem',
    ]),
    selectMode(mode) {
      this.selectedMode = mode;
    },
    checkDueDateValid(todo) {
      let returnVal = false;
      if (todo.completed) {
        returnVal = true;
      } else {
        const now = Date.parse(new Date());
        const dueDate = Date.parse(new Date(todo?.dueDate));
        returnVal = now > dueDate ? false : true;
      }
      return returnVal;
    },
    addTask() {
      this.$router.push({ path: '/add' });
    },

    deleteItem(item) {
      console.log('delete item', item);
      this.todoItem = item;
      this.showConfirmationPopup = true;
    },
    deleteConfirmationItem(item) {
      console.log('delete item', item);
      this.todoItem = null;
      this.showConfirmationPopup = false;
      this.removeItem(item);
    },
    cancelDeleteConfirmationItem(item) {
      console.log('delete item', item);
      this.todoItem = null;
      this.showConfirmationPopup = false;
    },
    editItem(item) {
      console.log('edit id', item);
    },
    completeTask(item) {
      console.log('mark as completed', item);
      this.completeItem(item);
    },
    duplicateTask(item) {
      const todo = {
        id: Math.round(Math.random()) + new Date().getTime(),
        todo: item.todo,
        dueDate: item.dueDate,
        completed: item.completed,
      }
      console.log('duplicate todo', todo)
      this.duplicateItem(todo);
    }

  },
  computed: {
    ...mapState([
      'todoList',
    ]),
    ...mapGetters([
      'toDoItems',
    ]),
    sortedItems: function () {
      let sortedItems = [];
      if (this.selectedMode === 'pending') {
        sortedItems = this.toDoItems.filter((item) => !item.completed);
        console.log('pending', sortedItems)
      } else if (this.selectedMode === 'completed') {
        sortedItems = this.toDoItems.filter((item) => item.completed);
        console.log('completed', sortedItems)
      } else {
        sortedItems = this.toDoItems;
        console.log('all', sortedItems)
      }
      let itemsClone = [...sortedItems]; // Change added
      return itemsClone.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    },

  }
};
</script>
  
<style>
/* Global styles */
.modal-backdrop {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-outer-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.top-actions .add-btn{
    margin-bottom:10px;
    float:right;
  }

.modal-section {
  background: #fff;
  display: block;
  width: 50%;
  min-height: auto;
}

.bottom-section {
  clear: both;
  width: 100%;
  display: block;
}

.modal-header {
  padding: 15px;
  width: 100%;
  display: block;
}

.modal-header h3 {
  text-align: left;
  font-size: 22px;
  color: #000;
}

.modal-content {
  padding: 0px 15px;
  display: block;
  width: 100%;
}

.modal-content p {
  text-align: left;
  color: #333;
  font-size: 14px;
}

.modal-footer {
  padding: 15px;
  width: 100%;
  display: block;
  margin-bottom: 15px;
  height: 55px;
}

.modal-footer button {
  margin-right: 10px;
  float: right;
}

.action-icons {
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 52px;
}

.action-icons .icon {
  cursor: pointer;
  padding: 0px 5px;

}

.top-actions {
  width: 100%;
  clear: both;
  margin-bottom: 10px;
  height: 50px;
}


@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}

.links {
  color: #782aff;
}

.duplicate-links {
  color: rgb(107 114 128);
}

.card-inner-section {
  height: 100%;
  display: block;
  overflow: hidden;
  padding: 1.5rem;
}

.card-outer-section {
  margin-top: 10px;
  min-height: 100px;
  display: block;
}

.description-section {
  width: 100%;
  min-height: 100%;
  display:block;
}

.action-section {
  width: 10%;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 50px;
}

.error-links {
  color: #c66b47;
}

.incomplete-task-error{
  border: 1px solid #c66b47 !important;
}

.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}

[class*="stack"]>* {
  margin-top: 0;
  margin-bottom: 0;
}

.stack-small>*+* {
  margin-top: 1.25rem;
}

.stack-large>*+* {
  margin-top: 2.5rem;
}

@media screen and (min-width: 550px) {
  .stack-small>*+* {
    margin-top: 1.4rem;
  }

  .stack-large>*+* {
    margin-top: 2.8rem;
  }
}

/* End global styles */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
}

@media screen and (max-width: 300px) {
  .top-actions{
    height: 100px;
  }
  .top-actions .add-btn{
    margin-top:10px;
  }
  .description-section {
    width: 100%;
}

.action-section {
  width: 30%;
}
}

@media screen and (max-width: 800px) {
  .description-section {
    width: 100%;
}

.modal-section {
    width: 80%;
}

.action-section {
  width: 30%;
}
}

#app>* {
  margin-left: auto;
  margin-right: auto;
}

#app>form {
  max-width: 100%;
}

#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
  font-size: 24px;
    color: #000;
}</style>
  