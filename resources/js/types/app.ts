export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface PageProps {
    auth: {
        user: AuthUser;
    };
}
