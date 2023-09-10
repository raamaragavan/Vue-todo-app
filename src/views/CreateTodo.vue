<template>
  <form class="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] max-w-sm" @submit.prevent="onSubmit">
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
          Task Name
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name" type="text" autocomplete="off" v-model="taskName" name="taskName">
      </div>
    </div>
    <div class="md:flex md:items-center mb-6" v-if="taskNameRequiredError">
      <div class="w-full">
        <p>
          <span style="color:red;font-size:12px;">{{ taskNameRequiredError }}</span>
        </p>
      </div>
    </div>

    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
          Due Date
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-password" type="date" v-model="dueDate" name="dueDate" />

      </div>

    </div>
    <div class="md:flex md:items-center  mb-6" v-if="dueDateError">
      <div class="w-full">
        <p>
          <span style="color:red;font-size:12px;">{{ dueDateError }}</span>
        </p>
      </div>
    </div>
    <div class="md:flex md:items-center">
      <div class="md:w-1/3"></div>
      <div class="md:w-2/3">
        <button
          class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit">
          Add Task
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapActions,mapState} from 'vuex';

export default {
  components: {
  },
  methods: {
    ...mapActions([
      'addItem',
    ]),
    ...mapState([
      'todoList',
    ]),
    onSubmit() {
      this.taskNameRequiredError = null;
      this.dueDateError = null;
      let validationError = false;

      if (!this.taskName) {
        this.taskNameRequiredError = 'Task Name required.';
        validationError = true;
      }
      if (!this.dueDate) {
        this.dueDateError = 'Due Date required.';
        validationError = true;
      }
      const selectedDate = new Date(this.dueDate);
      const now = new Date();
      if (this.dueDate && selectedDate < now) {
        this.dueDateError = 'Due Date must be in the future';
        validationError = true;
      }
      const updateDueDate = new Date(this.dueDate);
      this.dueDate = new Date(updateDueDate.setDate(updateDueDate.getDate())).toLocaleDateString();
      if(!validationError){
        const todo = {
          id: Math.round(Math.random()) + new Date().getTime(),
          todo: this.taskName,
          dueDate:this.dueDate,
          completed: false,
        }
        console.log('todo',)
         this.addItem(todo);
         
        this.$router.push({ path: '/' });
      }
    },
  },
  data() {
    return {
      taskNameRequiredError: null,
      dueDateError: null,
      taskName: null,
      dueDate: null,
    };
  },
};
</script>
<style>
#app form{
  width: 75%;
  margin: 0px auto;
  padding: 2rem;
}

@media screen and (max-width: 300px) {
  #app form{
  width: 100%;
}
}

@media screen and (max-width: 800px) {
  #app form{
  width: 100%;
}
}
</style>