# todo-vue

Sample todo app built with the Vue framework.

For the live version, see https://github.com/raamaragavan/Vue-todo-app

## Getting Started

To get up and running, follow these steps:

```bash
npm install
```

### Compile and hot-reload for development

```bash
npm run serve
```

### Compile and minify for production

```bash
npm run build
```

### Lint and fix files

```bash
npm run lint
```

## Features
List of todo fetched from dummy json
added duedate value for each todo with random date range from (current date -2 to increment current date++ )
can Add To-do
can update To-do
can delete To-do
can mark as complete to-do
list of Form validations done 
	Task must not be empty
	duedate should be in future
Vuex used
Axios used
Tailwind used
Mobile responsive
can view all To-dos
can view Pending To-dos
can view Completed To-dos

if duedate is overdue it is highlighted with Red border.it cant be edited only we can delete
if To-do is completed it cant be edited only we can delete
If To-do is pending it can be edited, deleted,mark as complete

