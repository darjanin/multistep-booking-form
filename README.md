# Multi-step Booking form with real-time pricing

Project is setup by [example template with redux referenced in the redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started#create-a-react-redux-app) codebase.

For UI library was chosen [shadcn/ui](https://ui.shadcn.com/) as had worked with it for the last year on my previous project.

The root page `/` has 2 options - start the booking process or filling the store with prefilled data (development/demo feature).

## Getting Started

```bash
npm install
npm run dev
```

## Comments

- There's no validation on the date if it's into the future or really old where the passenger would be well above 100years. This one would need to be revisited and defined how it should behave to the past.
- For validation of the fields in the passenger form has naive approach where changing the fields trigger validation and in case that the name of the passenger doesn't meet length it fills the `errorMessage` in the store and prevents continuation. If I spend more time on this one I would like to replace this one with `react-hook-form` with `zod` validation or similar approach (mentioned libraries are ones that I used during last year and liked them). 
- Formatting of the date is done simply by using `Intl` in the browser with hardcoded locale. In production version this needs to respect user's locale and not having hardcoded format.
- The monetary formatting in the overview assumes EUR only. That should be replace by functionality to store an amount with currency to allow correct formatting and calculation with respect to rounding rules.
- As progress is stored in the Redux store, any hard refresh wipes it's content. With more time I would add middleware to the store so updates to the store are persisted in the local storage.
- Types for the passengerSlice are located in the same files even that are exported in some cases as for this example project it makes sense to keep it together.
