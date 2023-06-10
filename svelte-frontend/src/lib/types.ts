export interface User {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	role: Role;
	createdAt: string;
	UpatedAt: string;
	restaurants: Restaurant[];
}

export interface Role {
	id: number;
	name: string;
	description: string;
	type: string;
}

export interface Restaurant {
	id: number;
	attributes: {
		name: string;
		description: string;
		created_at: Date;
	};
}
