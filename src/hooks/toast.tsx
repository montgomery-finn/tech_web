import React, { createContext, useCallback, useContext, useState } from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import { v4 } from 'uuid';

interface ToastContextData {
    addToast(toast: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

export interface ToastMessage {
    id: string;
    title: string;
    description: string;
    type?: 'info' | 'success' | 'danger' | 'warning';
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({children}) => {
    
    const[toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback(({title, description, type}: Omit<ToastMessage, 'id'>)=>{
        const id = v4();

        const toast = {
            id,
            title,
            description,
            type,
        }

        setToasts(state => [...state, toast]);

    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(state => state.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{addToast, removeToast}} >
            {children}
            <ToastContainer position="top-end" className="p-3">
                {toasts.map((toast) => (
                    <Toast onClose={() => removeToast(toast.id)} autohide>
                        <Toast.Header className={`bg-${toast.type ?? "info"}`} >
                            <strong className="me-auto text-light">{toast.title}</strong>
                        </Toast.Header>
                        <Toast.Body>{toast.description}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    )
}

export function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if(!context){
        throw new Error('useToast must be within a ToastContextProvider');
    }

    return context;
}

