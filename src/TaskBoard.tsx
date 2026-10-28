import { useEffect, useState } from "react";
import type { Task, CreateTaskInput } from "./schemas";
import { simulateFetchTasks } from "./mockApi";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import FilterBar, { type Filter } from "./FilterBar";

type Status = "loading" | "success" | "empty" | "error";

// Challenge — keep the loading message up for at least this long so a very fast
// response doesn't make it flicker in and out.
const MIN_LOADING_MS = 400;

function TaskBoard() {
  const [status, setStatus] = useState<Status>("loading");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  function loadTasks() {
    const startedAt = Date.now();

    // Delay only the state transition, never the fetch itself, so the loading
    // message stays visible for at least MIN_LOADING_MS even on a fast response.
    function settle(apply: () => void) {
      const remaining = MIN_LOADING_MS - (Date.now() - startedAt);
      if (remaining > 0) {
        setTimeout(apply, remaining);
      } else {
        apply();
      }
    }

    simulateFetchTasks()
      .then((data) => {
        settle(() => {
          setTasks(data);
          setStatus(data.length === 0 ? "empty" : "success");
        });
      })
      .catch(() => settle(() => setStatus("error")));
  }

  // Initial status is already "loading", so the effect only kicks off the fetch.
  useEffect(() => {
    loadTasks();
  }, []);

  // Stretch — the retry handler flips back to loading (from a click, not an
  // effect) and re-runs the fetch so a failure can recover.
  function handleRetry() {
    setStatus("loading");
    loadTasks();
  }

  function handleAddTask(input: CreateTaskInput) {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title: input.title,
        done: input.status === "done",
        dueDate: input.dueDate || undefined,
        status: input.status,
      },
    ]);
    // Adding the first task moves us out of the empty state.
    setStatus("success");
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  }

  // Status messages share one aria-live region so a screen reader announces the
  // change automatically instead of relying on the user noticing it visually.
  return (
    <div>
      <h1>Task Board</h1>

      <div aria-live="polite">
        {status === "loading" && <p>Loading tasks...</p>}
        {status === "error" && <p>We couldn't load your tasks.</p>}
        {status === "empty" && <p>No tasks yet. Add your first one below.</p>}
      </div>

      {status === "error" && (
        <button onClick={handleRetry}>Try again</button>
      )}

      {(status === "success" || status === "empty") && (
        <>
          <NewTaskForm onAddTask={handleAddTask} />
          {status === "success" && (
            <>
              <FilterBar filter={filter} onFilterChange={setFilter} />
              <TaskList
                tasks={tasks}
                filter={filter}
                onToggleTask={handleToggleTask}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TaskBoard;
