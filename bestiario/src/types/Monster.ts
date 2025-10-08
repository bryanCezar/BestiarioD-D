export interface MonsterListItem {
    index: string;
    name: string;
    url: string;
}

export interface MonsterListResponse {
    count: number;
    results: MonsterListItem[];
}

export interface Monster{
    index: string;
    name: string;
    size?: string;
    type?: string;
    alignment?: string;
    hit_points?: number;
    challenge_rating?: number;
    actions?:{
        name: string;
        desc: string;
    }[];
}