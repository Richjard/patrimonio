
export interface BienInterface {
    iTipoCId:string;
    iBienId : string;
    cBienCodigo:string;
    cBienDescripcion :string;
    nBienValor:string;
    cBienSerie:string;
    cBienDimension:string;
    cBienOtrasCaracteristicas:string;
    bBienBaja:string;
    dBienFechaBaja:string;
    cBienCausalBaja:string;
    cBienResolucionBaja:string;
    dBienAnioFabricacion:string;
    cBienObs:string;
    iEstadoBienId:string;    
    iFormaAdqId:string;    
    iTipoId:string;  
    
    

    iYearId:string;
    iCatalogoNoPatId:string;
    iCatSbnId:string;
    iDocAdqId:string;

    cPlanContCodigo:String;
    cPlanContDescripcion:String;

    cClasGastoCodigo:String;
    cClasGastoDescripcion:String;

    cDocAdqNro:string;
    dDocAdqFecha:String;
    nDocAdqValor:String;
    cFormaAdqDescripcion:String;

    cTipoDescripcion:String;
    cModeloDescripcion:String;
    cMarcaDescripcion:String;

    iCatalogoId:String;   

    colores:[];
    cantidad:number; 
    iPlanConMayorId:String,
    iPlanConSubCueId:String


}


