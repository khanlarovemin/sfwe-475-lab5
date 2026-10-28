# Data-UX notes — Lab 5

## Strand 1 — Loading, empty and error states

**Prediction (Core 2):** With the default 800 ms delay, the fetch promise has not
resolved yet, so for roughly the first 800 ms `status` is still its initial
`"loading"` value and the screen shows **"Loading tasks..."**. Only after the
promise settles does it switch to `success`, `empty`, or `error`. After adding
the four conditional returns, the prediction held — the loading line showed first,
then the task list appeared.

**Why `empty` and `error` must be two separate states (Core 4):** They mean
opposite things to the user. `empty` is a *success*: the request worked, the
server answered, and there simply are no tasks yet — the right response is an
encouraging "add your first one." `error` is a *failure*: we never got a trustworthy
answer, so we don't actually know whether there are tasks. Collapsing them into one
"something's wrong" state would either scare a new user who has an empty list, or
hide a real outage behind a cheerful empty message. They also need different
actions: empty invites you to create, error invites you to retry.

**Min-loading flicker (Challenge):** A very fast response (e.g. 50 ms) would flash
the loading message for a single frame and rip it away, which reads as a glitch and
can cause layout jump. By recording a start timestamp and using `setTimeout` to hold
the *state transition* (not the fetch) until at least 400 ms have passed, the loading
message stays legible. A real app wants this because a flicker looks broken and
erodes trust, and a stable minimum is calmer to the eye than a sub-second flash —
even though it makes the fastest responses feel slightly slower.

## Strand 2 — Forms + Zod

**Disabled button is not a substitute for the Zod check (Challenge):** The
`disabled` attribute only stops *this* button in *this* browser from firing a click
while `title.trim()` is empty. It does nothing about a due date in the wrong format,
an invalid status, a submit triggered by pressing Enter in a field, assistive tech,
or (later) a request forged straight at the API. `disabled` is a UX convenience that
guides the happy path; `safeParse` is the actual gate that decides whether the data
is valid before we trust it. Validation has to live where the data is accepted, not
on the control that usually sends it.

## Strand 3 — Accessibility basics

**Keyboard-only pass (Core 3):** Using only Tab / Shift+Tab / Enter I could reach
the title field, type a title, Tab to the due date and status, Tab to the "Add task"
button and submit with Enter. Everything worked — every control is a real focusable
element (`input`, `select`, `button`), so nothing was reachable only by mouse.

**Vague text fixed (Core 4):** The task checkboxes/toggle controls were the weakest
spot for an icon-only or unlabeled control; each toggle is tied to a real label or
descriptive text so a screen reader announces which task it acts on rather than a
bare control.
