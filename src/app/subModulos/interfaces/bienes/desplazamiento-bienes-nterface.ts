
export interface DesplazamientoBienInterface {
    iDespBienId:string;
    dDespBienFecha:string;
    cDespBienDocRef:string;
    iTipoDespId:string;
    idCentroCostoEmpleado:string;
    iYearId:string;
    iOrigenUbicacion:string;
  
    iDestinoUbicacion:string;

    iOrigenEmpleado:string;
    iDestinoEmpleado:string;
    bienes:Object[],

    cOrigenEpleadoDNI:String;
    iOrigenUbicacionSubDependencia:string;
    idCentroCostoEmpleadoOrigen:string;



    cDestinoEpleadoDNI:String;
    iDestinoUbicacionSubDependencia:string;

    cDepenNombre:string;
    cCentroCostoNombre:string;

    cDepenNombreO:string;
    cEmpleadoO:string;
    iDocAdqId : string;
    asignacion:number;
    

}


