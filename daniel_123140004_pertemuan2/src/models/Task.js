class Task {
  constructor(id, title, description, deadline,priority, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.completed =completed;
    this.createdAt= new Date().toISOString();
  }

  toggleComplete(){
    this.completed = !this.completed;
    return this;
  }

  updateTask(updates){
    Object.assign(this, updates);
    return this;
  }
}

export default Task;
