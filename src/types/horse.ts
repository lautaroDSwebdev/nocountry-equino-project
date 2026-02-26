export interface Horse {
    id: number;
    breed: string;
    age: number;
    gender: 'STALLION' | 'MARE' | 'GELDING';
    temperament: 'CALM' | 'MODERATE' | 'ENERGIC';
    discipline: 'RACING' | 'SHOW_JUMPING' | 'DRESSAGE' | 'POLO' | 'RECREATIONAL' | 'ENDURANCE';
    price: number;
    discountPrice?: number;
    sold: boolean;
    location: string;
    description?: string;
    imageIds: string[];
    videoId?: string;
    status: 'PENDING_DATA' | 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
    ownerId: number;
}

export interface SortObject {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface PageableObject {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    offset: number;
    sort: SortObject;
}

export interface PageHorseResponse {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    pageable: PageableObject;
    size: number;
    content: Horse[];
    number: number;
    sort: SortObject;
    empty: boolean;
}
