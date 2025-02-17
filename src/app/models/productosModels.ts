export class Productos1{
    intProduct?: number = 0;
    //strCodigoProducto?: string = ''; 
    strNameProduct?:string = '';  
    strDescriptionProduct?:string = '';  
    dblPrice?:number = 0;  
    intQuantity?:number = 0;  
    intCategorie?:number = 0;  
    intColor?:number = 0;
    intSize?:number = 0;
    // strStatus?:string = '';  
    // Status?:string = '';  
}
export interface Productos{
    intProduct?: number;
    //strCodigoProducto?: string; 
    strNameProduct?:string;  
    strDescriptionProduct?:string;  
    dblPrice?:number;  
    intQuantity?:number; 
    strCategorie?:string; 
    intCategorie?:number; 
    strNameCategorie?:string;   
    // strStatus?:string;  
     Status?:string;
     intColor?: number;
     strColor?: string;  
     intSize?:number;
     strSize?:string;
}