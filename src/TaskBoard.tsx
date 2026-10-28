import { useEffect, useState } from "react";
import type { Task } from "./schemas";
import TaskList from "./TaskList";
import NewTaskInput from "./NewTaskInput";
import FilterBar, { type Filter } from "./FilterBar";

const STORAGE_KEY = "task-board.tasks";

const defaultTasks: Task[] = [
  { id: 1, title: "Read Chapter 3", done: false },
  { id: 2, title: "Build TaskCard", done: true },
];

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return defaultTasks;
    return JSON.parse(saved);
  } catch {
    return defaultTasks;
  }
}

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Storage can be unavailable (e.g. private mode); the board still works in memory.
    }
  }, [tasks]);

  function handleAddTask(title: string) {
    setTasks([...tasks, { id: tasks.length + 1, title, done: false }]);
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  }

  return (
    <div>
      <NewTaskInput onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={tasks} filter={filter} onToggleTask={handleToggleTask} />
    </div>
  );
}

export default TaskBoard;
