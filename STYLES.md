## How to apply the custom properties in `_tokens.scss` to components
1. Apply to Components

   Now, in your component SCSS files, you use the semantic alias. This allows for easy overrides. Example:
    ```scss 
     :host { 
        /* Override the default if this specific component needs a unique look */
        --popover-radius: var(--app-radius-dialog);
     }
   
     .tooltip {
        /* Inherits global tooltip roundness */
        border-radius: var(--app-radius-tooltip);
     }
   
     .btn { 
        /* Uses the global pill-shape default */
        border-radius: var(--app-radius-button);
     }
    ```
2. How to handle Overrides

   The beauty of this system is that you can change the look of a single section of the site by simply redefining the variable within a CSS class.  If a specific component needs a different style than the global default, you can override it by setting the semantic alias to a different value within that component's styles. This keeps your design consistent while allowing flexibility where needed.
    ```scss
   /* Make all buttons square in a specific section */
   footer {
      --app-radius-button: 2px;
   }
    ```
## Integration with Angular Material

Since you are using `mat.define-theme`, Angular Material 21 components will attempt to use their own internal tokens. By using CSS variables for your custom components, you ensure they stay in sync with the Material components while giving yourself a "master switch" for your custom UI.
