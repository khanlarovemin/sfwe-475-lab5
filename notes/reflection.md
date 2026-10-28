# Reflection — Lab 5

## 4. Why is an empty list not the same thing as an error, and what should change in the UI between the two? (Strand 1)

An empty list is a successful request that happens to return zero tasks, while an
error means the request itself failed and we have no trustworthy data at all. The UI
should reassure and invite in the empty case ("No tasks yet. Add your first one
below.") and report a problem plus offer a retry in the error case ("We couldn't
load your tasks." with a Try again button). Showing an error for an empty list would
alarm a brand-new user; showing an empty message for a real failure would hide the
outage and lose the user's trust.

## 5. Your form validates with safeParse on submit. Why does the error get stored in errors.title specifically, instead of one single error message for the whole form? (Strand 2)

`result.error.flatten().fieldErrors` keys each message by the field that produced
it, and I store that whole object in `errors`. Rendering `errors.title` directly
beneath the title input lets the user see exactly which field is wrong and why,
right where they need to fix it, instead of scanning one generic banner at the top
and guessing. Per-field errors also scale: when several fields are invalid at once,
each message lands next to its own input.

## 6. What does aria-live actually do, and why does a loading message need it even though a sighted user can already see the screen change? (Strand 3)

`aria-live="polite"` tells assistive technology to announce changes to that region
automatically, without the user having to move focus to it, waiting for a pause so
it doesn't interrupt. A screen-reader user never "sees" the loading text appear, so
without a live region the status change is silent to them — they wouldn't know the
app is working, finished, or failed. The live region turns a purely visual cue into
one that is announced out loud, keeping sighted and non-sighted users equally
informed.
