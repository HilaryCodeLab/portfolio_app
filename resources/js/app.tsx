import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import "react-datepicker/dist/react-datepicker.css";
import { route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,

    resolve: (name: string) => {
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}');
        return resolvePageComponent(
            Object.keys(pages).find((key) =>
                key === `./Pages/${name}.jsx` ||
                key === `./Pages/${name}.tsx`
            ) as string,
            pages
        );
    },

    setup({ el, App, props }) {
        const root = createRoot(el as HTMLElement);
        root.render(<App {...props} />);
    },

    progress: {
        color: '#4B5563',
    },
});
