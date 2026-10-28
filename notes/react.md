# React notes — Lab 4

## 1. Props vs state (Strand 1)

`title` is a prop: it is passed in by the parent (`App`) and belongs to the parent, so `TaskCard` can only read it, never change it. `done` is now state created with `useState` inside `TaskCard`, so the card owns it and can update it with `setDone`, which makes React re-render the card. In short, props are inputs from outside, while state is the component's own data that changes over time.

## 2. Why `key={index}` is risky (Strand 2)

React uses the `key` to match each item in the new render with the item from the previous render. If the key is the array index, the key describes a *position*, not a *task*: when the list is reordered, filtered or an item is removed, a different task ends up at the same index, so React reuses the wrong component and its internal state (for example the checkbox in a `TaskCard`) stays attached to the wrong task. `task.id` never changes for a task, so React can always match the right component to the right data.

## 3. Removing `onChange` from the controlled input (Strand 2)

Without `onChange`, I could not type anything — the input stayed empty no matter what I pressed. Its `value` comes from `text` state, and nothing updated that state anymore, so React kept forcing the box back to `""` on every render. React also printed a console warning that I provided a `value` prop without an `onChange` handler, suggesting `readOnly` or `defaultValue` instead.

## 4. The round trip of one "Add" click (Strand 3)

`TaskBoard` owns the `tasks` state, and `NewTaskInput` is the component that asks for a change. `TaskBoard` passes its `handleAddTask` function down to `NewTaskInput` as the `onAddTask` prop; when I click Add, `NewTaskInput` calls `onAddTask(text)`, which actually runs `handleAddTask` inside `TaskBoard` and calls `setTasks` with a new array. That state change makes `TaskBoard` re-render, it passes the new `tasks` array down to `TaskList` as a prop, and `TaskList` renders one more `TaskCard` — the request went up through a callback and the new data came back down through props.
