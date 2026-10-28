# Lab 5 — Data UX, Forms & Accessibility

Branch: `feature/data-ux-forms-a11y` → `main`

Continues the task-board project. Adds a mock API (delay + failure), a four-state
loading/empty/error/success status machine in `TaskBoard`, a Zod-validated
`NewTaskForm`, and an accessibility pass (labels, `aria-live`, `aria-describedby`,
keyboard-only support).

## Checklist
- [x] All four statuses (loading, success, empty, error) show distinct, correct UI
- [x] NewTaskForm validates with Zod and shows errors next to the right field
- [x] Every form field has a real `<label>`, not just a placeholder
- [x] The form is fully usable with only the keyboard
- [x] notes/dataux.md answers all written questions

> Do **not** merge this pull request yet. The PR link itself is the submission.
