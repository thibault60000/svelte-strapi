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

export interface Image {
	id: number;
	attributes: {
		name: string;
		url: string;
		previewUrl: string;
		size: number;
	};
}

export interface Brand {
	id: number;
	attributes: {
		name: string;
		image: {
			data: Image[];
		};
	};
}

export interface AvailableSize {
	id: number;
	attributes: {
		size: number;
	};
}
export interface Sneakers {
	id: number;
	attributes: {
		name: string;
		description: string;
		stock: number;
		price: number;
		color: string;
		availableSizes: {
			data: AvailableSize[];
		};
		image: {
			data: Image[];
		};
		brand: {
			data: Brand;
		};
		createdAt: Date;
		updatedAt: Date;
	};
}
