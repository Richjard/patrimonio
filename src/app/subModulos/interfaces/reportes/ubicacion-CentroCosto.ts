import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';


export interface UbicaionCentroCOsto {
    idCentroCostoEmpleado : string,
    iDepenId  : string,
    cDepenNombre : string,
    iCentroCostoId : string,
    cCentroCostoNombre : string,
    bienes:BienReportInterface[],
    tipo:number

}
