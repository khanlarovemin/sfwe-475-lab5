# Reflection — Lab 4

## 1. Why can't FilterBar and TaskList share filter state directly?

In React, data only flows from a parent to its children through props, so two siblings have no direct channel to each other. If `FilterBar` kept `filter` in its own `useState`, `TaskList` would have no way to read it. Lifting `filter` up into their shared parent `TaskBoard` lets it pass the value down to both, and pass `setFilter` down to `FilterBar` so it can request changes.

## 2. What would go wrong with the array index as the key?

When the filter changes (e.g. from "All" to "Open"), different tasks end up at index 0, 1, 2…, so React would think the same items are still there and only their props changed, reusing the wrong component instances. Any state or DOM state inside a card (such as the local checkbox state from Strand 1, or focus) would stick to the position instead of the task, so a checkbox could show a task as done when it isn't. With `task.id`, each card stays tied to its own task no matter how the list is filtered or reordered.

## 3. "Props flow down, requests flow up" — examples in my app

Props flowing down: `TaskBoard` passes the `tasks` array and the current `filter` down to `TaskList`, which passes `title`, `done` and `dueDate` down to each `TaskCard`. Requests flowing up: when I click Add, `NewTaskInput` calls the `onAddTask` callback, and when I tick a checkbox, `TaskCard` calls `onToggle`, which reaches `onToggleTask` in `TaskBoard` — only `TaskBoard` actually changes the state with `setTasks`.
