import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            userId: null,
            role: null,

            login: (userId, role) => set({ isAuthenticated: true, userId, role }),
            logout: () => {
                set({ isAuthenticated: false, userId: null, role: null });
                localStorage.removeItem('auth-storage');
            },
            isAdmin: () => get().role === 0,
            isManager: () => get().role === 1,
            isMusician: () => get().role === 2,
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                userId: state.userId,
                role: state.role,
            }), 
        }
    )
);

