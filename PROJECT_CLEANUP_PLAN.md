# Project Cleanup Plan

This document is a step-by-step cleanup checklist for removing unnecessary files, CSS, JavaScript, packages, images, brochures, and Angular code from this project.

Do not delete everything in one pass. Remove one group, build the project, then continue. That makes it easy to find which removal caused a problem.

## 1. Start With A Safety Check

1. Make sure the current work is committed or backed up.
2. Check the current changed files:

```powershell
git status --short
```

3. Build before cleanup so you know the current baseline:

```powershell
npm run build
```

4. After each cleanup section, run:

```powershell
npm run build
```

If the build fails, undo only the last cleanup group and inspect the error.

## 2. Remove Generated And Local-Only Folders

These folders are not source code and should not be committed:

- `.angular/`
- `dist/`
- `node_modules/`
- `.vs/`

How to remove locally:

```powershell
Remove-Item -Recurse -Force .angular, dist, node_modules, .vs
npm install
npm run build
```

Recommended `.gitignore` update:

```gitignore
.vs/
```

`node_modules` can always be recreated with `npm install`. `dist` and `.angular` are build/cache output.

## 3. Clean Unused NPM Packages

Current likely removable packages:

- `primeng`
- `@primeng/themes`
- `jquery`
- `@types/jquery`

Why:

- PrimeNG setup is commented out in `src/app/app.config.ts`.
- No Angular component currently imports PrimeNG modules.
- jQuery is only used through legacy files under `src/assets/js`, not through TypeScript.

Remove them with:

```powershell
npm uninstall primeng @primeng/themes jquery @types/jquery
npm run build
```

Only keep them if you plan to continue using PrimeNG components or jQuery plugins.

## 4. Remove PrimeNG Commented Code

After uninstalling PrimeNG, remove the commented PrimeNG lines from:

- `src/app/app.config.ts`

Remove:

```ts
// import { providePrimeNG } from 'primeng/config';
// import Aura from '@primeng/themes/aura';
```

And remove the commented `providePrimeNG` provider block.

Also fix the duplicate router provider in the same file. Keep only one:

```ts
provideRouter(routes),
```

## 5. Remove Unused Imports And Standalone Module Leftovers

Check and remove unused imports:

- `src/app/app.component.ts`
  - `EventEmitter`
  - `Output`
  - `RouterLink`
  - `HomeComponent`

Possible cleanup:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
```

Review whether `src/app/app.module.ts` is still needed. This app is bootstrapped with standalone Angular APIs in `src/main.ts`, and routes use standalone components. If nothing imports `AppModule`, it can likely be deleted after verification:

```powershell
Get-ChildItem -Path src -Recurse -Include *.ts | Select-String -Pattern "AppModule"
```

If the only match is `app.module.ts`, delete:

- `src/app/app.module.ts`

Then run:

```powershell
npm run build
```

## 6. Review Legacy Global CSS

The project loads many old template styles from `angular.json`:

- `src/assets/css/bootstrap.min.css`
- `src/assets/css/nice-select.css`
- `src/assets/css/font-awesome.min.css`
- `src/assets/css/icofont.css`
- `src/assets/css/slicknav.min.css`
- `src/assets/css/owl-carousel.css`
- `src/assets/css/datepicker.css`
- `src/assets/css/animate.min.css`
- `src/assets/css/magnific-popup.css`
- `src/assets/css/normalize.css`
- `src/assets/css/style.css`
- `src/assets/css/responsive.css`

Do not delete all of these at once. First remove files from the `styles` array in `angular.json`, then build and inspect the site.

Suggested order:

1. Remove plugin-specific CSS first:
   - `nice-select.css`
   - `slicknav.min.css`
   - `owl-carousel.css`
   - `datepicker.css`
   - `animate.min.css`
   - `magnific-popup.css`
2. Build and check home, products, about, certificate, and contact pages.
3. If the pages still look correct, delete those CSS files.
4. Review whether `font-awesome.min.css`, `icofont.css`, and `src/assets/fonts/` are still needed. The current header/footer use inline SVGs in places, but old template CSS may still reference icon fonts.
5. Only remove `bootstrap.min.css`, `normalize.css`, `style.css`, and `responsive.css` after replacing any classes that still depend on them, such as `btn`, `dropdown`, `dropdown-menu`, grid/layout classes, and global utility styles.

Verification command:

```powershell
npm run build
```

## 7. Review Legacy JavaScript

The `scripts` array in `angular.json` loads these legacy scripts:

- `src/assets/js/jquery.min.js`
- `src/assets/js/jquery-migrate-3.0.0.js`
- `src/assets/js/jquery-ui.min.js`
- `src/assets/js/easing.js`
- `src/assets/js/colors.js`
- `src/assets/js/popper.min.js`
- `src/assets/js/bootstrap-datepicker.js`
- `src/assets/js/jquery.nav.js`
- `src/assets/js/slicknav.min.js`
- `src/assets/js/jquery.scrollUp.min.js`
- `src/assets/js/niceselect.js`
- `src/assets/js/tilt.jquery.min.js`
- `src/assets/js/owl-carousel.js`
- `src/assets/js/jquery.counterup.min.js`
- `src/assets/js/steller.js`
- `src/assets/js/wow.min.js`
- `src/assets/js/jquery.magnific-popup.min.js`
- `src/assets/js/bootstrap.min.js`
- `src/assets/js/main.js`

There are also files not listed in `angular.json`:

- `src/assets/js/gmaps.min.js`
- `src/assets/js/map-active.js`

Recommended cleanup:

1. Remove `gmaps.min.js` and `map-active.js` first if no page uses an embedded Google map.
2. Remove plugin scripts from `angular.json` in small groups:
   - carousel: `owl-carousel.js`
   - mobile menu: `slicknav.min.js`
   - datepicker: `bootstrap-datepicker.js`, `jquery-ui.min.js`
   - popup: `jquery.magnific-popup.min.js`
   - animation/counter: `wow.min.js`, `jquery.counterup.min.js`, `steller.js`
   - visual effects: `tilt.jquery.min.js`, `easing.js`, `colors.js`, `jquery.nav.js`, `jquery.scrollUp.min.js`, `niceselect.js`
3. If the site still works, remove `main.js`.
4. If no remaining script needs jQuery, remove:
   - `jquery.min.js`
   - `jquery-migrate-3.0.0.js`
   - `popper.min.js`
   - `bootstrap.min.js`

After removing script references from `angular.json`, delete the corresponding files.

## 8. Clean Brochures

Currently used in `src/app/app.component.html`:

- `src/assets/brochures/Nutraceutical Product List_Melizza.pdf`
- `src/assets/brochures/Cosmetic Product.pdf`
- `src/assets/brochures/Medical Devices List_Melizza.pdf`
- `src/assets/brochures/Pharmaceutical Product_Melizza.pdf`
- `src/assets/brochures/Surgical Product List_Melizza.pdf`
- `src/assets/brochures/API_Product_List_Melizza-1.pdf`
- `src/assets/brochures/Cosmetics Range.pdf`

Commented or apparently unused brochure files:

- `src/assets/brochures/FINAL_MEDICAL_DEVICES_BROWSER.pdf`
- `src/assets/brochures/MELLIZA_MEDICINE_LIST.pdf`
- `src/assets/brochures/Oncology Product Details.pdf`
- `src/assets/brochures/Oncology Product List_Melizza.pdf`
- `src/assets/brochures/OTC Product_Melizza.pdf`

Before deleting any brochure, confirm whether the business still wants it downloadable. If not, delete the PDF and remove any old commented links to it.

## 9. Clean Images

Keep images referenced by active templates, certificate data, or product JSON.

Important active image sources:

- `src/app/home/home.component.html`
- `src/app/about-us/about-us.component.html`
- `src/app/header/header.component.html`
- `src/app/footer/footer.component.html`
- `src/app/certificate/certificate.component.ts`
- `src/assets/data/products.json`

Product image folders are active because `products.json` references them:

- `src/assets/img/DEVLOPED PHARMA PRODUCT IMAGE SELECTED/`
- `src/assets/img/Effervecent/`
- `src/assets/img/Protein powder/`
- `src/assets/img/Sachet/`
- `src/assets/img/Tablets/`

Potential image cleanup candidates:

- Duplicate logo/certification variants, for example multiple ANVISA, FDA, WHO, ISO, and logo files.
- Old template background images referenced only from legacy `src/assets/css/style.css`.
- Gallery images that are not displayed in the current home/about pages.
- Duplicate `MELI-CLAV 625 MOKEUP.jpg` if the `.webp` version is the one used in `products.json`.

How to check before deleting one image:

```powershell
Get-ChildItem -Path src -Recurse -Include *.ts,*.html,*.css,*.json | Select-String -Pattern "image-file-name.ext"
```

If there is no match, move/delete the image, build, and manually inspect the pages.

## 10. Remove Empty Component CSS Files

Some component CSS files may be empty or nearly empty. Check them with:

```powershell
Get-ChildItem -Path src/app -Recurse -Include *.component.css | Select-Object FullName,Length
```

If a component CSS file is empty:

1. Remove the file.
2. Remove the `styleUrl` or `styleUrls` entry from that component.
3. Run `npm run build`.

Do not remove CSS files that contain page-specific layout or responsive styling.

## 11. Remove Unused Components Only After Route Check

Currently active routed components:

- `home`
- `about-us`
- `product`
- `certificate`
- `contactus`

Currently active shell components:

- `header`
- `footer`
- `preloader`
- `download-modal`

Only delete a component if you also remove every route, template usage, and import for it.

Example if removing `preloader`:

1. Delete `<app-preloader></app-preloader>` from `src/app/app.component.html`.
2. Remove `PreloaderComponent` import and entry from `imports` in `src/app/app.component.ts`.
3. Delete `src/app/preloader/`.
4. Run `npm run build`.

Use the same pattern for any other component.

## 12. Remove Broken Or Dead Links

Review these routes in templates because some do not exist in `app.routes.ts`:

- `/certifications` should probably be `/certificate`
- `/privacy-policy`
- `/terms`
- `/products/pharmaceutical`
- `/products/surgical`
- `/products/ayurvedic`
- `/products/nutraceutical`

Fix or remove dead links before deleting related content.

## 13. Final Verification

After all cleanup:

```powershell
npm install
npm run build
git status --short
```

Then manually check:

- Home page
- About page
- Product list
- Each product category
- Product search
- Certificate modal
- Contact form
- Brochure dropdown/downloads
- Mobile header menu

Only commit once the build passes and the visible site still works.
