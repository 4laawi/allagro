export type Profile = {
    id: string;
    full_name: string | null;
    role: 'admin' | 'employee';
    created_at: string;
};

export type Client = {
    id: string;
    name: string;
    phone: string | null;
    region: string | null;
    created_at: string;
};

export type Project = {
    id: string;
    client_id: string | null;
    culture_type: string | null;
    description: string | null;
    status: 'planned' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    surface_area: number | null;
    created_at: string;
    completed_at: string | null;
    clients?: {
        name: string;
    } | null;
};

export type Order = {
    id: string;
    client_id: string | null;
    product_name: string;
    category: 'equipment' | 'phytosanitary';
    quantity: number;
    total_amount: number;
    status: 'pending' | 'validated' | 'delivered';
    created_at: string;
    clients?: {
        name: string;
    } | null;
};
