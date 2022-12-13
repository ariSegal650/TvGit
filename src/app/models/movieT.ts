export class MovieTypes {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number
    profile_path:string=null;
    media_type:string=null;
    original_name:string=null;
}

export class movieDeatails{
    adult:boolean
img:string;
belongs_to_collection:any;
budget:number;
genres:any[];
homepage:string;
id:number;
imdb_id:string;
original_language:string;
original_title:string;
overview:string;
popularity:number
poster_path:string;
production_companies:object[]
production_countries:object[]
release_date:string;
revenue:number;
runtime:number;
spoken_languages:object[]
status:string;
tagline:string;
title:string
video:boolean
vote_average:number;
vote_count:number
} 
export class allPage{
    page!:number;
    results!:MovieTypes[];
    total_pages!:number;
    total_results!:number;

    
}