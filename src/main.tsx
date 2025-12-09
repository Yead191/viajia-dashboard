import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { UserProvider } from './provider/User.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Toaster
                position="top-center"
                duration={2000}
                toastOptions={{
                    style: {
                        background: '#1C1C1E',
                        color: '#ffffff',
                        border: '1px solid #2a2a2a',
                    },
                }}
            />
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </Provider>
    </StrictMode>,
);
