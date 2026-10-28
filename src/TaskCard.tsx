import type { Task } from "./schemas";
import TaskCheckbox from "./TaskCheckbox";

type TaskCardProps = Pick<Task, "title" | "done" | "dueDate"> & {
  onToggle: () => void;
};

function TaskCard({ title, done, dueDate, onToggle }: TaskCardProps) {
  return (
    <div className="task-card">
      <h3>{title}</h3>
      <TaskCheckbox done={done} onToggle={onToggle} />
      {dueDate && <p>Due: {dueDate}</p>}
    </div>
  );
}

export default TaskCard;
