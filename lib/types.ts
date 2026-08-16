import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export type IUser = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        id: string,
        name: string,
        email: string,
        role: string,
        status: string,
        phone: string | null,
        address: string | null,
        photoUrl: string | null,
        createdAt: string,
        updatedAt: string,
    }
}

export type NavbarProps = {
    user: IUser
}

export type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export type RegisterState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        id: string,
        name: string,
        email: string,
        role: string,
        status: string,
        phone: string | null,
        address: string | null,
        photoUrl: string | null,
        createdAt: string,
        updatedAt: string
    }
}

export type Review = {
    id: string,
    rating: number,
    comment: string,
    propertyId: string,
    tenantId: string,
    createdAt: string,
    updatedAt: string,

    tenant: {
        id: string,
        name: string,
        email: string,
        role: string,
        status: string,
        phone: string | null,
        address: string | null,
        photoUrl: string | null,
        createdAt: string,
        updatedAt: string
    }
}

export type ReviewState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        averageRating: number,
        total: number,
        reviews: Review[]
    }
}

export type Property = {
    id: string,
    title: string,
    description: string,
    address: string,
    city: string,
    area: number | null,
    price: number,
    bedrooms: number,
    bathrooms: number,
    images: string[],
    isAvailable: boolean,
    landlordId: string,
    categoryId: string,
    createdAt: string,
    updatedAt: string,

    category: {
        id: string,
        name: string,
        createdAt: string
    },

    landlord: {
        id: string,
        name: string,
        email: string,
        role: string,
        status: string,
        phone: string | null,
        address: string | null,
        photoUrl: string | null,
        createdAt: string,
        updatedAt: string
    },

    reviews: Review[],

    _count: {
        reviews: number,
        rentalRequests: number
    }
}

export type PropertyState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: Property[],
    meta: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    }
}

export type PropertyDetailState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: Property
}

export type Category = {
    id: string
    name: string
    createdAt: string
}

export type CategoryState = {
    success: boolean
    statusCode: number
    message: string
    data: Category[]
}

export type GetPropertiesParams = {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: string
    searchTerm?: string
    city?: string
    categoryId?: string
    bedrooms?: string
    minPrice?: string
    maxPrice?: string
}

export type SidebarItemsProps = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}


export type RentalRequestStatus =
    | "PENDING"
    | "ACTIVE"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED";

export type CreateRentalRequestPayload = {
    propertyId: string;
    message?: string;
    moveInDate?: string;
};

export type RentalRequestProperty = {
    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    area: number | null;
    price: number;
    bedrooms: number;
    bathrooms: number;
    images: string[];
    isAvailable: boolean;
    landlordId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;

    category: {
        id: string;
        name: string;
        createdAt: string;
    };

    landlord: {
        id: string;
        name: string;
        email: string;
        role: string;
        status: string;
        phone: string | null;
        address: string | null;
        photoUrl: string | null;
        createdAt: string;
        updatedAt: string;
    };
};

export type RentalRequestTenant = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    phone: string | null;
    address: string | null;
    photoUrl: string | null;
    createdAt: string;
    updatedAt: string;
};

export type RentalRequestPayment = {
    id: string;
    amount: number;
    status: PaymentStatus;
    transactionId: string | null;
    sessionId: string | null;
    paidAt: string | null;
    tenantId: string;
    rentalRequestId: string;
    createdAt: string;
    updatedAt: string;
};

export type RentalRequestReview = Record<string, unknown>;

export type RentalRequest = {
    id: string;
    message: string | null;
    status: RentalRequestStatus;
    moveInDate: string | null;
    tenantId: string;
    propertyId: string;
    createdAt: string;
    updatedAt: string;

    property: RentalRequestProperty;

    tenant?: RentalRequestTenant;

    payment?: RentalRequestPayment | null;

    reviews?: RentalRequestReview | null;
};

export type RentalRequestState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: RentalRequest[];
};

export type RentalRequestDetailState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: RentalRequest;
};

export type CreateRentalRequestState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: RentalRequest;
};

export type PaymentStatus =
    | "PENDING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED";

export type PaymentProperty = {
    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    area: number | null;
    price: number;
    bedrooms: number;
    bathrooms: number;
    images: string[];
    isAvailable: boolean;
    landlordId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
};

export type PaymentTenant = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    phone: string | null;
    address: string | null;
    photoUrl: string | null;
    createdAt: string;
    updatedAt: string;
};

export type PaymentRentalRequest = {
    id: string;
    message: string | null;
    status: string;
    moveInDate: string | null;
    tenantId: string;
    propertyId: string;
    createdAt: string;
    updatedAt: string;
    property: PaymentProperty;
};

export type Payment = {
    id: string;
    amount: number;
    status: PaymentStatus;
    transactionId: string | null;
    sessionId: string | null;
    paidAt: string | null;
    tenantId: string;
    rentalRequestId: string;
    createdAt: string;
    updatedAt: string;
    tenant: PaymentTenant;
    rentalRequest: PaymentRentalRequest;
};

export type PaymentState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: Payment[];
};

export type PaymentDetailState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: Payment;
};

export type CheckoutSessionState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        url: string;
    };
};

export type LandlordRentalRequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELLED";

export type LandlordRentalRequestTenant = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    phone: string | null;
    address: string | null;
    photoUrl: string | null;
    createdAt: string;
    updatedAt: string;
};

export type LandlordRentalRequestProperty = {
    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    area: number | null;
    price: number;
    bedrooms: number;
    bathrooms: number;
    images: string[];
    isAvailable: boolean;
    landlordId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;

    category: {
        id: string;
        name: string;
        createdAt: string;
    };
};

export type LandlordRentalRequest = {
    id: string;
    message: string | null;
    status: LandlordRentalRequestStatus;
    moveInDate: string | null;
    tenantId: string;
    propertyId: string;
    createdAt: string;
    updatedAt: string;

    tenant: LandlordRentalRequestTenant;

    property: LandlordRentalRequestProperty;
};

export type LandlordRentalRequestState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: LandlordRentalRequest[];
};

export type UpdateRentalStatusPayload = {
    status: LandlordRentalRequestStatus;
};

export type UpdateRentalStatusState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: LandlordRentalRequest;
};