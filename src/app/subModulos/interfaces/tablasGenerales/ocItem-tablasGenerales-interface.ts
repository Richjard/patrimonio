export interface OcItemInterface {
    CODIGO : string;
    GRUPO_BIEN :string;    
    CLASE_BIEN :string;
    FAMILIA_BIEN : string;
    ITEM_BIEN : string;
    NOMBRE_ITEM:string;
    CANT_ITEM : number;
    PREC_UNIT_MONEDA : number;
    PREC_TOT_SOLES : number;
    b : number;//para ver si es compatible SIGEUN Y SIGA EN CATALOGO
    clasificador:string;
    cuentas:[],
    anio:string

}

