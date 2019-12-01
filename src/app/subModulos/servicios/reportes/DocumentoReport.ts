import { Injectable } from '@angular/core';
import { UbicaionEmpeadoReportInterface } from 'src/app/subModulos/interfaces/reportes/ubicacion-empleado';
import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';


@Injectable({
  providedIn: 'root'
})
export class DocumentoReportService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor() {
   }

   contenidoDocumento(ubicacionEmpelado:UbicaionEmpeadoReportInterface,tipo,dataBienes){
    //armar e item
    var  items_: Object[] = [];
    items_=[
      [
       {text: 'N°', style: 'tableHeader'},
       {text: 'CODIGO', style: 'tableHeader'}, 
       {text: 'DESCRIPCION', style: 'tableHeader'}, 
       {text: 'DIMENSION', style: 'tableHeader'},
       {text: 'SERIE', style: 'tableHeader'},
       {text: 'MARCA', style: 'tableHeader'},
       {text: 'MODELO', style: 'tableHeader'},
       {text: 'TIPO', style: 'tableHeader'},
       {text: 'E', style: 'tableHeader'},
       {text: 'OBSERVACION', style: 'tableHeader'},
       {text: 'DOC ADQ', style: 'tableHeader'},
       {text: 'F ADQ', style: 'tableHeader'}
     ] ];
    
    let total=dataBienes.length; 
    //console.log("tttt:",dataBienes.length);
    //console.log("bienes:::",dataBienes);
    let o=1;
    if(total>0) { 
      for (var item of dataBienes) { 
       items_.push(
          [ {text: o++, style: 'tableItem'},
            {text: item['cBienCodigo'], style: 'tableItem'},
            {text: item['cBienDescripcion'], style: 'tableItem'},
            {text: item['cBienDimension'], style: 'tableItem'},
            {text: item['cBienSerie'], style: 'tableItem'},
            {text: item['cMarcaDescripcion'], style: 'tableItem'},
            {text: item['cModeloDescripcion'], style: 'tableItem'},
            {text: item['cTipoDescripcion'], style: 'tableItem'},
            {text: item['cEstadoBienAbre'], style: 'tableItem'},              
            {text: item['cBienObs'], style: 'tableItem'},
            {text: item['iDespBienId'], style: 'tableItem'},            
            {text: item['dDespBienFecha'], style: 'tableItem'}
            
         ] );
       }
    }   
    items_.push(
        [ {text: 'Total de bienes:',colSpan: 10, alignment: 'right',style: 'tableItem'},
          {},{},{},{},{},{},{},{},{},{},
          {text: total, style: 'tableItem'}
        ] );
    //fin item


    var contenido: Object[] = [];
    switch(tipo){
      case 1://solo depdnencia
      console.log("case 1 ");
      contenido= [[
          {
            stack: [
              'REPORTE TOTAL DE BIENES POR DEPENDENCIA'
              
            ],
            style: 'headerDocumento'          
          },
    
    
          {
          
            columns: [
              {
                width: 90,
                text: 'ENTIDAD:', style: 'cabexeraText' 
              },
              {
                text: 'UNIVERSIDAD NACIONAL DE MOQUEGUA',style: 'cabexeraTextConten' 
              },           
              {
                width: 90,  
                text: 'FECHA:', style: 'cabexeraText' 
              },
              {
                width: 90,
                text:'2019',style: 'cabexeraTextConten' 
              }
            ]
          },
    
          {
            
            columns: [           
              {
                width: 90,
                text: 'DEPENDENCIA:', style: 'cabexeraText' 
              },
              {
                text:  ubicacionEmpelado.cDepenNombre,style: 'cabexeraTextConten' 
              }
             
            ]
          },
        
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: ['2.5%' , '10%', '12%','10%','10%','10%','10%','10%','2.5%','10%','5%','8%'],
              body:items_
            },
            layout: 'lightHorizontalLines'
          },
    
    
        ]];
        
      break;
      case 2://depdnencia con sub Dependencia
      console.log("case 2 ");     
      contenido= [[
          {
            stack: [
              'REPORTE TOTAL DE BIENES POR DEPENDENCIA'
            ],
            style: 'headerDocumento'          
          },
          
    
          {
          
            columns: [
              {
                width: 90,
                text: 'ENTIDAD:', style: 'cabexeraText' 
              },
              {
                text: 'UNIVERSIDAD NACIONAL DE MOQUEGUA',style: 'cabexeraTextConten' 
              },           
              {
                width: 90,  
                text: 'FECHA:', style: 'cabexeraText' 
              },
              {
                width: 90,
                text:'2019',style: 'cabexeraTextConten' 
              }
            ]
          },
    
          {
            
            columns: [           
              {
                width: 90,
                text: 'DEPENDENCIA:', style: 'cabexeraText' 
              },
              {
                text:  ubicacionEmpelado.cDepenNombre,style: 'cabexeraTextConten' 
              }
             
            ]
          },
          { 
            columns: [           
              {
                width: 90,
                text: 'SUB DEPENDENCIA:', style: 'cabexeraText' 
              },
              {
                text:  ubicacionEmpelado.cCentroCostoNombre,style: 'cabexeraTextConten' 
              }
           
            ]
          },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
              body:items_
            },
            layout: 'lightHorizontalLines'
          },
    
    
        ]];
      break;
      case 3://depdnencia con sub Dependencia y empleado
      console.log("case 3 ");     
      contenido= [[
          {
            stack: [
              'REPORTE TOTAL DE BIENES POR DEPENDENCIA'
            ],
            style: 'headerDocumento'          
          },
          
    
          {
          
            columns: [
              {
                width: 90,
                text: 'ENTIDAD:', style: 'cabexeraText' 
              },
              {
                text: 'UNIVERSIDAD NACIONAL DE MOQUEGUA',style: 'cabexeraTextConten' 
              },           
              {
                width: 90,  
                text: 'FECHA:', style: 'cabexeraText' 
              },
              {
                width: 90,
                text:'2019',style: 'cabexeraTextConten' 
              }
            ]
          },
    
          {
            
            columns: [           
              {
                width: 90,
                text: 'DEPENDENCIA:', style: 'cabexeraText' 
              },
              {
                text:  ubicacionEmpelado.cDepenNombre,style: 'cabexeraTextConten' 
              }
             
            ]
          },
          { 
            columns: [           
              {
                width: 90,
                text: 'SUB DEPENDENCIA:', style: 'cabexeraText' 
              },
              {
                text:  ubicacionEmpelado.cCentroCostoNombre,style: 'cabexeraTextConten' 
              }
           
            ]
          },
          { 
            columns: [           
              {
                width: 90,
                text: 'EMPLEADO:', style: 'cabexeraText' 
              },
              {
                text:  ubicacionEmpelado.empleadoNombre,style: 'cabexeraTextConten' 
              }
           
            ]
          },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
              body:items_
            },
            layout: 'lightHorizontalLines'
          },
    
    
        ]];
      break;
      case 4://depdnencia con empleado
      console.log("case 4 ");     
      contenido= [[
          {
            stack: [
              'REPORTE TOTAL DE BIENES POR DEPENDENCIA'
            ],
            style: 'headerDocumento'          
          },
          
    
          {
          
            columns: [
              {
                width: 90,
                text: 'ENTIDAD:', style: 'cabexeraText' 
              },
              {
                text: 'UNIVERSIDAD NACIONAL DE MOQUEGUA',style: 'cabexeraTextConten' 
              },           
              {
                width: 90,  
                text: 'FECHA:', style: 'cabexeraText' 
              },
              {
                width: 90,
                text:'2019',style: 'cabexeraTextConten' 
              }
            ]
          },
    
          {
            
            columns: [           
              {
                width: 90,
                text: 'DEPENDENCIA:', style: 'cabexeraText' 
              },
              {
                text:  ubicacionEmpelado.cDepenNombre,style: 'cabexeraTextConten' 
              }
             
            ]
          },
          { 
            columns: [           
              {
                width: 90,
                text: 'EMPLEADO:', style: 'cabexeraText' 
              },
              {
                text:  ubicacionEmpelado.empleadoNombre,style: 'cabexeraTextConten' 
              }
           
            ]
          },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
              body:items_
            },
            layout: 'lightHorizontalLines'
          },
    
    
        ]];
      break;
    }
    return contenido;

   }



   documento2(respon){
    let  items__: Object[] = [];
     let total=0;
    items__=[
      [
        {text: 'RESUMEN:',colSpan: 2, alignment: 'center',style: 'subheader'},
        {},{}
      ],
      [
      
       {text: 'Dependencia', style: 'tableHeader'}, 
       {text: 'Sub Dependencia', style: 'tableHeader'}, 
       {text: 'Sub Total', style: 'tableHeader'},
       
     ] ];
    var contenido: Object[] = [];
      let  ubicacionEmpelado:UbicaionEmpeadoReportInterface;
     let tipo;
     let bienes:Object[];
     
    for (var item_ of respon) { 
      //console.log("totalllllll::::",item_['bienes'].length);
       //item['results']
        tipo=item_['tipo'];
        bienes=item_['bienes'];
       ubicacionEmpelado={
        iDepenId : item_['iDepenId'],
        cDepenNombre  : item_['cDepenNombre'],
        iCentroCostoId : item_['iCentroCostoId'],
        cCentroCostoNombre :item_['cCentroCostoNombre'],
        idCentroCostoEmpleado :item_['idCentroCostoEmpleado'],
        empleadoNombre:item_['empleadoNombre']

        
       }
       //console.log("cCentroCostoNombre::::::::::::",item_['cCentroCostoNombre']+" tipo::"+item_['tipo']);
       contenido.push(this.contenidoDocumento(ubicacionEmpelado,tipo,bienes));
       items__.push(
        [ 
          {text: item_['cDepenNombre'], style: 'tableItem'},
          {text: item_['cCentroCostoNombre'], style: 'tableItem'},
          {text: item_['bienes'].length, style: 'tableItem'},
          
      ] );
     total+=item_['bienes'].length;
     }
     items__.push(
      [ {text: 'Total de bienes:',colSpan: 1, alignment: 'right',style: 'tableItem'},
        {},
        {text: total, style: 'tableItem'}
      ] );
   
    let resumen= [[
      
    
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto'],
          body:items__
        },
        layout: 'lightHorizontalLines'
      },


]
];
    // contenido.push(this.contenidoDocumento(ubicacionEmpelado,tipo,bienes));
     contenido.push(resumen);
    
  return {
    footer: function(currentPage, pageCount) { return currentPage.toString() + ' de ' + pageCount; }, 

    header: {
      columns: [
        { 
          
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAEBhSURBVHja7L11mFzHme//qQONM3NGI2a2BQYZZcsyxZA4dpwNOeBwvAEHftlkN7/N0s3d7N3dsO8GHLTDjh0njp3EjLJkMTOzNNJgzzQeqLp/dM944HRPz6gHZJ/v8/QjTcOpOnXqWy/UW+8rlFIECBDAH1owBAECBAQJECAgSIAAAUECBAgIEiBAQJAAAQKCBAgQECRAgIAgAQIEBAkQIEBAkAABAoIECBAQJECAgCABAgQECRAgIEiAAAFBAgQICBIgQECQAAECggQIECAgSIAAAUECBAgIEiBAQJAAAQKCBBgkLADGBsMQECTAq5gI/AloBLYDp4GdwE+AUDA8A4MIUo++JvAe4F6gtsjnu4BPAS8GQxUQ5PWGjwD3lfG9XcCFgB0MWaBivR4QBX5eJjkA5gHfDoZtiCVIIpEIRnGIYVnWwoK9McfvcyklQgiEED0/2gysKUiTBNAOZIC2gs3SBCQTiUT6LBqLgCABuk2IK4HlxaS/Y9s0pFKENMHoGsuPJOVgfaGNeuAgkARyQKpArEagNZFI2K91ghjBlDtriKEXDPG/LfYd17Y52d7Og8ePck1dHbXxKgxjQI/4ksKrrz6tLhBpRYFASaCl8P9sQTplEolEMlCxAgwmOWqAleT3N3pBKYVyHDY1NfHXUyept7NcY43mrdOnE4lERsItbCwQ6Q+AWyBPsuAw6HjlEolEW6BiBejvBBhXsBum+33ueR44Dq80NvBcYwNH0ylCukad0PmXhecTjcfPptvdDCxPJBKfCVSsAOU8/G8C7wfG+5LDdUkkkzx3+hQbUm00ZHOENQ2FoEWD+mQ706NRNE0jnU7jeZJoLIKh6ygUdFsb87bKAG2WSuFC4ELLsm4pSJxPDbfDICDIyCXHSuCKoiqVlJxoa+PZU/WsbG1GCTCF6JzzZiTK5vqTTB5VRygUwnEcnvzTyyTbUoybOJrqmjjhaIhwJEQ8GqW6topoLIIZMjEMHcPQ0Q29G4kUIIaGSLMKr6ssy7pgOEkSEGRkkmMtcKnfZ1JKlOuyq6WFlxobWNOeIG7oeK7XIQRAKdyczV4lcR2HUChEJBKh/thpHrjvr4waXUNVdZxwzCQSDhOPx6gdU4NVW0UkGsmTJh6hdnQNNTVxwrEI4XCISCRENBYhXhUjHAlhmiaaJkDkaaNelUPd9fiBk2l2wTHxoYAgATrIsaoUObK5HAfb2/jt0cPUOzZRIZCe7DUJ3Uya05ZFznOJAaZpcsvfXM0Tj76MnXNoyDSjCx1PSlzpojyF9DykVCilEJpGVVWUUaNriMZjRGNh4lVRamqrGDehjtpRNYwaY1FdHcMMm4QjIWLRCLHqGCHTwDAMjJCJaeiYoTyRhNC6kKZsIn3QsqzvJBKJTQFBAnJ8C1jsq1ZJSWt7O9uTSf54/AgpTxIqsTJrhkF7KsWJVIqaeBW6rjN19hQmT5vAsYMn0NEB0NEIFZkGUkpampM0NyZQUuGpPHk8VyI9D00TRGJ5iROLRxlVV82YCaOpikeJxcNU11ZRVRVj3KQxxKtixKsiGKZByDSIx2PoplFQ5QwMXcMMmei6jqb12uL5OHB3QJCzb0KPAeYmEomVZ3gdA1gGXOlnb3ieRzKb5bnDh3jKtTGkRC9DawlFIuxsaGBO3Wh0XUfXdG649XJ++f3HUEr2+fvOiarnp4lZxB5ybIeE7dHa1MbBPUfwZF7dkp6HUnmiRaJhYrEIkWiIeE2MqVMnEK+JEa+JUVUVp9qKM23GBM6/eB6xWKxnM28MVKyzhxQdG3ZLgfmF99yC1+WriUTi+X5ebxz5KNv5fp87jkM6m+XBI4fZkGojpOmU65j3PI96VXAFF9Ssq2+4nF/+4M+Ink6sAaJbSIumAVpBNvWmVC5nY9suba1pjh0+le9AQSopBLoGv3z8m0Sj0Z7q1qyCsb5lqJ93EKzYv8l8C7Cf/G72/B4LzXXAc5ZlPWRZ1ugyrzcL2FKMHLlsloa2Nn58YB/bchl0w0RJWXZ/ledxwLFJZrN5u0IIRtVZTJo+bljGLz/pFQiFrmnouoZu6BimgWnmVa2Na3biuq7fz983HH0OCNI/cjxOkQ27LngX+UDCcsnhu8dh53LsaGnm3sMHOGJncR0H5Xkd1m15kJIMitO5HLJALMMwuHjx/F4G8kiAAtYu34zjOH4fLw0IMjKJEbUs6+cFcpSLpZZl/XeJa04ivzse99PpXdtmbUMDvzt5nCbXxZNqwBNOuh6nHbtTzTIMg4sun4/oogiNJIpsWrMT1/GVIFeVK5kDggwdOWYUVnlfP7xSqnNlLnfFsywrDrwMjPbzGknH4eUjh3mi+TStdg7OMBQoHI+zv7GhG0HOXTALPSLQhDbS+EE6mWH3joOd/e2B9wYEGXnkmFPMAG5uamXLhp0kk8liK57f+N5Lfpe41/VwHF44cZwnmho4ncmiVUANUkrRYNvdbJdYPMbsuZPR9BEoRYRg5UubiqlZNwUEGRnk+B6wFqj2Ve2V5PChY9zz1ftZ/vwGyg34tCzrHPKxVb0kh7Jtnj55gqcaG2hRCr1CR6HdbJYmTZDtYvjqus7Fly1AKjkix3/1sk3F3NC3F7x+AUGGiRiaZVkbgU8DY/xWY6UkO7bs5SffeZDn//oKc+bNIBqN+l1uRSKR6PmUH+xpHUspUY7DiqZG/nLqJAnPxaxgnJNSipRStNp2N0P9gksXFFulhx2nTjRyYM+RYurr2wKCDBM5CirVIn+HkCRn51j18kZ+9J3fsezptdSOsVh89fnFDiUt95FKva7tOS7bW5p59PQpbCnRC/sCldNYBEIpWpxXCaLrOtPnTKaqKjoin4Wm6zz3+Eps2/fA4rUBQYYHa4CFxcjR0tzKE4+8xD3/8Qs2r9lJVXWM8ZPHEgr5kmNHIpH4xx7vvdXP7jidTvHgsSMkHRt9ECNkm7pIEIBoNMKsc6YPd3i7P6mBNcu3FJNwbw8IMrSS42LLsrbgc8RUKYUnPU6fauSPv3mab33lPhpONROJhhFCMPOcKWiar6G7rkcb/w1M6XntdCbDX+qP0+jJitkcxaTIqWymm2dI0zTmnDs9fy5khEGhOHH0NKdONvipWeFSLvSAIJUlxzvJJyg4348ctm1Tf/w0P//+w/zih48QjYcxDL0wwUxGjYkVW4GP9Pi7l8vXdV32JxKsS7SgDcEkbfPcbqqbruvMOGc8mtBH5LMxTYPVy7YM+6ah9jomx7uA3xczbNOpNDu37uWr//B9nv7LSmKxSOdhIQBPukyZMtkv8hTy4ShdbZuren4hZ9s823CKkG6e8V5HOYZ6rodtY5omly+5CNMwRqSapYBVLxfdVS/mQg8IUkFyPFRsMmWzWZa/uIZ/+dw9HNx3HEPXej0+IRQz5kxH999L2Ni1Ob82krkc+zPpfsVWDVynF6Rdt5fxH4mGqR0bH7FSZPe2AyTbU8WcFgsCgpwZCc63LOtTlmV937Ks91iWNaXw/luKkcN1XRzX5s8PP8e9X3sIx/F8/fGaZhCOmEydMa4YQXZ1+f90X6PfdUEIhiL1q0KRdL1eu9O6rjNj9jSkdEfsc9yyYXex4MXbA4L0nxRTLcv6i2VZreRdtj8gf9DmAeCoZVnfBR7z+63jOKTSKb77X7/mwfseJ50qsborxehxowiFzGIerFxfEiTlOEOq2iRdl7Tn9bJD5pw7BcQInQYCVr+0Gcf1VbOuH4ouGK8BUtQC9xQMt9l9fP0zxSRHW1sbX/3H73Nw1wlS7Sk0vfik8ZSHVWsVsz8ay+m305bACIdxe4SBDBY8FLkCQTqIqWkadeNGIYRgROYwV7B+5Tak6xuXdaNlWXVAcyBBepPCtCzrBwX3bAv5YMLZA5o4nsfxIyf4+pd/wrZ1e0klS5MDwNBMzJAoJgF6Jj/rlZFDCEE8XoXnOAxldn2nR1uapjFt+kQ81+lfGP0QIplMs2fnoWLBi/8USJBXSaED/12QFFdU4ppSeuzbc5gff/sB1q3YRiQaLis+SSkYPbamGEFO9Pi7xY8gVbEYruuid0nVM+hSRNFLxZoybQJV1VFS6ZFZFUHTNV55YSMLLzzHz94bdHevdhYQ42uWZa0gn7Ly78slR0foeHt7u+8q7UmPIwdP8ONvP8CqZZsJRU0Uqiy7QAiPunHjiqlYh3v8fdqXILpO2NCRQyhBJL3JH4lFsEbXIhihdWIUrHhhPZlMxu/TxfgcG3jNE6QQNPhty7LWAF8ClpQ1liqfusbJ5ahva2PF6VMcam7utRsrpUfj6SZ+8f0/sXrZZuJV0W57HH0SRFPEq6qLkambDVLIN3uqJ0Giuk6NZhQj2ZCips4qKwnEcOHkiUb27z5STM360uuGIJZl/bdlWcsBD/g74LKySCHzCdJak0n2t7by/MkT/P7YUV5qbKAqHu82kaWUNDe38Nuf/ZkXnlhNbAABe54HsWhR7dRPV+mV9UQ3DCxNxxzmMxmapjFp6gSENnIZEotEefn5NcOyq26MIHK83J+bVVKilCJj2zRns5xKpdjR0sxBJPva2qgLh3n3uElMq63tXKWVUqTSKf7y+xf5wy+fIV4VGVAskpRgmloxCeJHkJN+atboSIjD7bkhG2O/YEhd15k6dSxSjuBSfEJj9fLNfPTTd/hlq18C6IVF9bVFEMuyLga+TD7S1SxHWiilcD2PdC5HIptlS1sr29oSHMrlcArh4qNCIa4fXcflE8ajdwlFt22bret38cAPn6GqOoonvQHtRQhBKdXI70ElfT1ZZgjXk0PmQDJ8qk4JIaiuCiPRgJF5gMr1bJpOuhw9cpz5C6r8xv4G4OnXBEEsyzKBr5E/XzyhXNvC8zxyjkPGttmfSLAzl2V7awsJz0Eg0DSNsJY/pDoxHOGNYyehdSGH67okWtv46bceQxlZpFRntFFX4rd+S3HGf/DFkJCjI2+u7mNnCSGIV8cZ0cVclSIWibPixdXMmTuLcDjc8xtvPesJYlnWRcA3CmynXGI4jkPOtjmeTLKlrYUD6TQH0ikM3QDV5aEX6vIZmsZNtaPQzO4GsG3b3PON+6k/cbyvCV6mmqVKzcc+1S4hBPm8z4MfbqKAkKYR8wlMFEJg1VXDCK92rJRkw+pd3PkR148gg3aIyhhkUkwAvlewLcaXbQS7Lq7rksnl2JFKsr6lmQOpNJ6SeCJ/ZFR5stfmliEEU8JRzq0b3W0Qc7kcO7ceYNvKgzjSrUiIR4lsJqEy1a4hy0wlAMs0iRYhyOixo4aEqGcC281yZE+OlpYWYrFexwwWAucCu88KgliW9R3gRuC8/kw46bpIx+FgJsXm+nq2plJkdY2s53XuAgvVxRDoMQlyUnLL+PFEupBDSonnuXz3//yCbC5TEXIIBK5PdGyH3Vvme8gKpf/sW4IIqjXN124SQlBVHSMSi5BJZUYsQTzpEDMMNqw7yPjx4zHNXibrxxgEl69RQVLM7CItasq+ccdBSMnJTJqdiTZ2tCeoz2WxdZ0k+dp7QpSxS6FpzDRDzKyq7nZG3HVd/vjrJzl5sqliaoQQkEpli33sd+9mUWNlCFZtAUR0/3MfQgiMkEE4bI5ogoBACcmal7Zy05su9SPIoAQvnilBai3L6kjkPKVsaeF5ICXJXJadzS3sSKc4mcuScGwSnovrSQzTRPTDVrBR3DRuPOFQqPM3SilSqTSPPvQCSlbOCyiVorkhUUzN8ktNGvOzr2wlOw3oQZ1aQmGZoaKeN13TOk9KjmRkXdi5cRu5dJZopNf+1aXkcxzvHAkE+W6BFIvKFvNSojwPz3U5kcmws62VXcl2mh2Xhlw2n9FDCDQhMDUNCuclyl3SJxkm59RY3aSH4zi8+ORqmhoSGLqoYECeRmN9UzGCTPN5r8qPIBnXGxLdXyqYEokUJYgQos8AzZEA6SmS6Qxb1+3kyjdc7pdN5iOVVrMGQpANwEVl35TrojyPhlSKw5k0+9MpjmUy1OcyNDkOIcNAU4pQz4fXj8msgKtq6wiHwt0kTi6X45HfPIVpVPbUt6ZptLYmik3sMeW8p5Si3bHRhBj0eCxPKSaEI8UOd3XR90Y2hAIhNF58Zg2XXXORH0EqvqveX4KsKIccUkqQkqzjcKi9jUOpFIdSSY5ks5yycyiliOg6VbqB51M+rL8wESwaVYdhvno7nuexc/M+jh45lU/NU8EJoJRHa3MyX5+vNyb7vNerpJrneTQ5Dt4Q2CAxXWdMOFxUgvSRY3gkmSHgemzesJdsNkekt5p1JflsmO3DQZCvUyJosCP0w3EcmnM5jqdSHEwl2Z5q42g6g9I1dKU6N/M6dPlKeJWmRCLUhLrr2I5j8+xjywlFwyi3slEISkmaG9poaW4jMqlXsZe5lmWNTSQSDQXnRRyY2XNCZl2XFs8tbFgO7rwaH45Q1cU281vQXNcdEnvozMde0drczoH9x7hwUbWfVPxn4B+HgyBL/Tqbr1nn0pbL0ZTNcKi9nb3ZDHva22l2bCKGkVefVMcSUGkDVHBeTQ16D69GJpNl0/qdFSdHx1KWy2bZun43Y8eN9vOoLAUeKfx/lt+EbLRtXCnRxOBOSiFEvlZ6EfUqn97IIZO2EWLE7xeiBIR0gxXPr2PheXMG/YyI1g8i9aqfl7NtTiYSrD99ikePHeVnhw/ym/oTrG9tISs9qgxj8LfqlWJOvKqbPup5Hvt3HaG5JTlozWqGwd5tB4qFYHcdqzv91KvD6dTgH5YqXH9eD9d3T4K0NLWTzebOBjMkP34oNizfim37pwSiglHq5c7fiX6r4On2dn557DD70ilCmo4GxHV9SHdkI5rOpEi0V1jJC0+uQte0QeuLUpID+48j/d3H15Va0TzP40gmPegTUtM0wgpmRKJFCSKlpOFUC7rIe7vOBiglOXqkgdP1TcTjcT/b6jrg+YqMYZnfm+678jg2x3I5onq+qLCAIQ9XmBaL9VIfPM/j4P5j/ToE1W9Ixe6dh8hmfcPVL7Msa3qxpHGO63Ikmxl075WSikVWbbHs869601rbUOIsSk+gwDQ01ryybdBTApU7KiG/gfWkQig1bJadEILxoXAvPTSbzXHy2OnBf06uYuO6XcUe0p3AHX4rdn06RYvrDn7aH01wqWURCoVKEiSdTI/saN4i5F+zcmuxQ1TXDDVB4n5v5neCh+8kmlKKarN7CIXneZw81kAmlUMqb/DaLkz2dSuKVkP6GPlTkd2lh+Ows62ts/+DaX+Mkoop8aqS+x9SSg4fbsAU8qwiiESwe+M+0mlfcl9EPnhxyAjiW08v5bnDa9gJGGOGuk0ApRQtDa0FfVoMMkEl617eViyv1Szg8t5Sx2Vzqn1Q9x2k5xKbMIFrrFrCJaRHx4JyYPexQo3zs0qG4LouOzbuLeYo+cxQEmSGvw3idAmvHR6GjDLNbhIkX1YgNyT+SgUkEilWr9hWVrUm13XZ19ZGwyBXdjKjMbxDh7h4/ISS6lXHXTScrMfxOOsgBCx/YTOu56viLh1KgkzwkyBJzxvenSWlCOl6L4LYOXtISfrIb54oa6FwbZtlTQ14g7lrrUDFotw8qo6aaLSknSOl5PjR07S3pc46G6Tw+Fn/ylba25J+/V8EzB0qglT7SZCs5w176ny/SrBFRO6gzcgDOw+yYW1RY72zT63ZLLvTycGdjLrOLAVXzZiJWYZ6tW/XIWxHIjg70ZZoY8fm/cWe+SeGiiBVfm/m5MgcWMMwh3RF9JTgVz/8Ezk7U9S2cB2HFS1N5AapW0oplMirnLfW1hGPxfvMueV5HpvX70bXzlZ65NMnvfLC+mKL09KhIoivBMkV4q+G11TrqZcKdFNDG0K/vidh69qdLHt6ne9KJqWkOZFgdSo5KInIlFIIXSes67xxzFjmjB5TdGOw2wJn59i4eieGdvYm+VfAxtXbyWZ8D7Atpkgp7yEiiDfsSY/tHjvZQgjMEIXagWLIHlM0HuWBHz/BiRMnekkRx7ZZUX+SzCCRVgqImSZX1tSydOy4btlcSqpXu4/Q2tCKJxVnL0MUTQ0JDu4/WkzN+pfBJoiBT7i2lJKUO7xGulCQcNxuE1LTNMZPGFfghhrC5yRpbGjlNz/7I+3tr9oZtm1T397OSs9F2XZlJa4QSKA2HGFRNMbbJk9BGeWlM3Uch2f/vJJQyMCTHmczDMNg1bItuG7lMy+WQ5BaP+mRchySnjOsVVIligbH7lW9der0ScSrwgylgaSUwpVZlv1lKy88vSFfgKejku3x42Q8B9exKzZaUimEpjEqEuaautG8Z8Ys9HC4LNUKIJPJsGHlFlyPEVmjsF9jL2D9im3Fghc7Mi8OGkHq/CZDWnp4wyyZzUiExra2XqtyKBxi/NQ6TD00tA8KkELy06/dz/YNuzozkk+aOoEaKQkLHVM787PfuhBEQyEsKbljzHhuHj8RPRQqRo5eaU9d12X75t20tqRGZBnogahZhw4c5/Sp5mJOkiWDSRDfhAOOlMNuf5ixGIcaTvfSPQ3D4PIlF+F5Q1t7TxSOHNkK/utff8bOTXsIh0K8KWbxhXPm8/bpkzm/qooaw0QVvi+EQPdTiQoSQgiBruvooVCegQVP1c1jx/GFc+azcOw4QiXOm+MTiW3bNs89tgZ0fGswno3QNI1Na3YU82Z9YDAJ4u/i9eSwn67JtbbSUBUn53TfGAyFQtx465Jite2GBJl0hq/+049Yt3wDhqkzusbiirrxvGfaDL4wey4fmzaDG8aM4byqKqqEhqkJvIJn0JYSWylyrourFMJxGe9Jloyu44NTpvG5WXO5btwERvcRiOirmklJW1s7a5Zvyiffe81AsfblLcUIcsuA7ZsyvhP3lSBK5uN3hvEss5QSZRocymapcd1OFUMIQe2oGi5bfAEbN+xAyqEPqvSkR6otzfe/+RDHDp/mPR+7HQONcFUV1UoxqqqK+a6D7XqkHZuc55H2JDnp5TdgdR3TcYmETGoMk7BhEAuFiJhmZ23zgdgOjuPwlz+8iON5vNawbfNeWppaifaOIJhC/tjBisEgiG+V1qzjFNSEYYQQCKXY1NLMgtpR3XTwUCjEG9++lI1rdwFD744WhcTUDaea+eMDz3P48Ene+f43MvvcmYAgZJqEzPyGZq2UKF49wtxxTkQDhKahiXzKov6QQkrZS+3yPA/HdXjqj8sRiNeG/dFVdcw6rF+9nXETxvodg373QAhSjoo1zW/wm6VEGwnxO1Kxtb2NdDbbzVg3DIMLL5tPpFYRDVcPS9cUoOsazU2tvPjkWu756i/53f1/4fDBY4Dq1P81XUfXdQzDwDRNwqEQ4VAIs2B4a7qOpmklyZEnlgQUruewY9NeThw72c1olVLym588TOK1Ypz3XpVY8cLGYrbngNy95UiQKX4Po9VzEWr4h1kqRQbF1mSCJfF458ohhCBeFeM9H76NX97zxLCKOl3XcF2PLRv2cOzoKdau2MrCC2dz0eLzmDJ9AuPGj+5CbtEnEV6lX/4+HcehqbGVxtPN7N52gD07DnNg7zG++L8/xIRCznDXdTl67BhPP7oGTR9WzXhQsWvLPtoSScLhSM9xvIh8JeT9Q6Ji2a6LGgFpMFTB7flCQwOXWKMxumQwNw2TN99+I088uJpTpxqQ0kUM09FSTRNEoiHaWtpZs3wzWzfsYvXyrUycMpZ5581k+qzJ1NZZ1I2xiMejGIXyDR33IqUslJrzSKXStDQnSLVlaGpoYe+OQ5w+3UJzQwvHD9dzdP8xPvj/3cG48WO7qFmKh37+OO1tOfL1UMVrkiCp9jS7th2g7tpRfm7vTwL/MCRGui29ESGkBflaHceyOba3tXBxONQZxappGtFYlHd+5E3c85WfoYeHP/+sYRoYpoFUip1b97Ntw26WP7uWSVPHU1tXw9gJdVi11YQj+YNgmp7PC+R6Hp7rkcvYtLUlaWpoJdmWoqWpjeNHT2MYOrom0LQQb37nDXz8c3cQCoU7pce2jXtY9uQGEB6vRe2qcyEydF55cSOXXXVBRTIvlkOQGj+CdETyjpSxjpgGzzQ3Mi9eTU2XQ1SGYXDTbVfwzGMvsn/nKRwvMyJ2jjUhiEbDEA2jlODo4XoO7T+O53p4UqIK8VEdAjrfZYHQBLquYegGQs/XGKytqwGVL6I2cdpU7vri+zEME13X8yFBqRT3f/+R/MGiIThpOdwqxabVO8hlbb8E11cAESBbSSPddx/ElmpEHbKRUnIkY7OjtQXHtruoNhqGbvLpL9/J6LraYd/c9HfGKUIhk2gsQlVNHKu2mtq6Gmrrahg1uvCqq6G2rhqrtqpQzyNEOBzKZ2VXCqRg9JjRfODuNzN5ch1mwUOWT+C9ik0bdr2mJUdXnD7VzJGDx4sFL36lkl4s37Q1npSkXHdELUTS8wgpyfPSJtnDo2WaJrPnzOSqWxdQFas5Kx+66uPDSCzCTX9zDddcfzmGkXdUOI7DoQNH+Pn/fZRoyOD1AsPQWb1sc0XKRvdFkKiveuW6tElveI+j91qFBRLF8cYmlp861RkH9aonyeAjn3wPc+ZPQWj6a2pChCNhFl+3iPfd9eZOJ4TneSTbU/zXl+/BUbLgAn79YM2KoimB+pV5sa8vjvYjSNJ1yXreiFNXlFIIBMuzSdqy2W4DpGkaAsEXv/JhJkycjGmYr4lJI4Rg0WUL+Lt//hCa0DszvNi2zX3/8xitp22yueRr2+7wwcF9R2lqaC0WvHhNpQhSxP7w8nllR+BBfyklyVyOx+rr8Ryn2wCFQiGsUTV8/t/uwJM5wkb4rExW8Oq9KuafP4sv/u+PYJpmp9fGtnM89ecVrH5xGamcjSZ0Xm8w9RAb124vZoe8f9AIkg91zx+1HannCJQnOaIcHjl+DK9H8FokEuGc+bP4+//4BJ4XOmvPY7uOw/mXzOMf/+uTxOOxzg1Sx3HYsHoLD/3kEVrbndeZ3OhCECPMs0+8VCx48YZKEcR3D0Q6DsIwRvTq25RKsSceZcuu3d28WkIIYrEYV1y1iH/4Px9E13SkKzkbXDyq4PHKprNcf+sSvvhvH2HMmLpOyeG6Ltu27uZ7X3uAhsa2EemxGyo4bpaje5s4deq03zydgU+1goEQxPcseiqdzhu6I/gBKE/SUF/P8yGN5lyumyTpIMmV11zA5/71Q9SOqcLOyoKBO3KJIl2P9rYcb3//G/no3e9g0pTxnZEDnvTYv+cw3/vPX3Hi8Kn8WRJev/Ckh3QEG9dsLyZF3lMJgizxNdI1DZQc0dVWhBA46TTHpMvDiRaOHD3ajSSaphGJRLj25sV84X99jAsvO5dkIomSIy/KVQHpdJbRY6v5xBfew3s+dhsTJ4/vDCNRSrJzyx5++O0H2bvjCMbryKVbehLAiufXF7NDynL39jWSvlWlmrMZNMPAc5wRPT6aYWC3tbNNKnJtKe60LMbU1KAXVBJN0wiHwlx59cVYtdWMnVDD8ue2kE6niURCI+IeHNvDcWyuvuEybr79Cq645lLChXqDSikUig0rt/HLH/+RTWv3EomGed3sCPYpRRz2bDtKW1sb4XC4p818cUHVOlTqGvpXvvKVUtLlpz3fzOVybGxqpF56qLPg0I1SYLguJ00TW3pMNUNETRNRWH07zliMGVfHvAtmE41FSLelOXG8AU0ItEJBoKF0SAgBjuOSTWeZMmMC17/xcu7827dy0eLz8+Hvmpb3zgnYuHY7P/nW79i6aR/RiMHrWq/yWcyFlMw+by7Tpk/wO5bsAs8MVIKE/d7M2DaeaSKT2bNikIQQOK5L1AyxvL0V3fW4UUxmfFVV55lvAE1ojB07hg994m3MWzCDxx5+gYN7jnLyWANKKQxTLyudzhk9UKnwPInrOkycMo5pMydxw61XcN3NVxAKhfKnIkXelZ3JZNiyfic/+s6DHNp7glgs/Jo5X15Rb5YJy57dxFVXDyx40eivgZ7zPNKZs0PF6hSFuo6Ty2IKeDbTSNYwuDGXY7JlYXap/tpBgMuWXsh5F5/Di0+u5IVn1nLqeDONp5rIZW20QrLsSgkUpVSeGFISDocYM34UdWNqufH2q7j2xssYNcri1TMiCikVp0818tIza3jgR4+SaM8QinR4FAPx0UtFlbB9/VaymSyRSKTnx1eQr978pYEQJOL3MG3Pw9N1lOucVQPVQYKYYbC6pYmjjae5c/ZcplTXEIt0P1yjCZ1YLM6b3vYGrr9lCetWbOfFZ1exe+sBshmHZHsK1/U6J23+375Jk/dpFII8VX48dVMnHo8SjUc5Z8F0Fi+9gCuuu4Ta2mqEeFXCdQQeNjY089uf/Zk//Oop4lVRTFMPTI4SyDngJNo5uu8YNZfU+GkBJaWIKLGXsQjY2M3o8Tx2HjvKg8eO0hqP4WazZ+WgKSnRY3Ei0uOdk6ZwbixOVSSC2aPWSKei6rmAYvO6nWxev42Nq3dTf6wZ1/VwXRvPk3iu7DSaUa8eBOhQizpIqmmicIxWwzB1JkwcywWXzeOiy+dx8eLzAIGu6b2qZiXbkxw9dJKffff3bFyzk3DIDHhRJvRImL+5fQkf/Oy7icZ86zWaBXukXwS5A3iwm7hyHNY1NvDr40fwbKfT0D1rvYBCoIXDzMhkuXXqdGaNHUs4HC76fdd18TwPT3ocOXiCPdv30XCqnb07D9F4qolke5pUexrPk90mryYEsaoo1TUxRo+xmH3uDCZOGcvc+TOYMXdKISTf8E385jgOp+ob+MOvnuDR3z2PYQYu3H4TRNepqo3zb1//NAsvOMdPilwAbO2viuUbwOM4DqOEgYpo+ZVS+KkRPd4r8pcqqoaUdw1V9HO/6/m3a2cyHIhEeLClkTdIjwtrR2HV+IfEG8ark3juuTOZOWsqnvRwHBfPdcnmbDLJDJl0jmzWBgWhiEEkGiZWFSUWjaDpOqZpYOgGuqGXTBUqpWTf7oP89qd/ZdWyTYRjEaprYt2GfKikyBlFTaihbbPnrzSlcGyXbdsOcO6CWX65xJYWI0gpCTIFONqzw5lsloSfaqVUxR/YmVyrWIll1XUbMJ9rBykEGekhlGJiJEqtZQ3oIXak7el4dUgpUSRlT1+uY6UUhw8dpbUpSbUVy0saQ6/gKA3Nsxgwtyp4a67jEAqHmDJtkt+4XzAQggAcpEd9wq4Pf2QbGqrfhJJKoWtayaqwQw3XdfPGvP76i8gdDCnoM44JfBK0l6NiATwGfK7nqideg0FwI9WaKjdbe4AB4+GBerE6sA645HU+iGsKXo4lg9zOSsqMMg1QEbQCFwJHzmThvLSYfvY6wuXA6oLE3ToIpPgGYCYSiSXAK8G8HRI4wKdKkaNcCdKBe8lnyZ7+Oh3QTcAq8snHKoUdiURiYc83Lcv6Ov1McBagfLMOWF4gx64+Vdx+XPiBnpOjc2OM4kEOXT1GPv7n9XSv3TAb+HOl2ugI6Cv1W79rCfDLwLjIb7yUenXPo6/+id5pRRdYlnVpIpFY1+Mnvic5BxKGL/xTmX4TuL/He9OBx3u1qVTJwROdY1bUNr0X+F4/uvxJ4LPF7l/0fObl3/NK4IuFf8u3Afvx3aV+HpYjh07Q3NhaPMyicCfnLpxFVXVVz45fAhxOJBLpwsr5oV5y0HE4tP8oidZkn23MXTCTmppqROG8fLI9xZ4dB/rFEKVgwqSxTJw8zs9APq/nQ2ttbWffrkOIEm0oBWPH1zF56gS/rONLC3ZeV7yj55ds22bvzoNksjaiHKkvBFZtFTNmT/VtM5FI/EMPqXWn7/M9eJxUMl2YoK+mmpVKdobLgMaM2ZMYVVfrtwh+GPhcIpEoq5qRZVm393yvI/nd3p2HUUp2ziGhiUJZC4EQeSKHI2Gmz5xCNNorUupKYG2/nST9+O7Vfg/tB1//Nbu3HUToouTk/doP/4F5C+f4MXsqsLtUG9/+9/s5drgeoZVu4yvf/hyLLl3QmVHwwIGj/Pvf5xcvVSZBhIL5F8zhX75+N1VVVSU9dp7nsXntDr75lZ/lv1esex5ccOm5/MvX7vabrFcD93SZINcA43oSsbmphf/6p3tJtGXKIogQOhMm1fLNn/6TX5tXWJYVSiQSdl/P9zv/cT8NJ5vxlEQUQmiUBEk++6OUCsMIce0tF/GxT7+bWCzWc8yiBSnyt2WQ41s9VXilVL4i1hPL+fUPHsfxbIQm0AreVE3LE0QJiSY0qqqr+M/vf4FIJOz37GJA22ARZKYfs5saW8lmc33+2PO8YvsnXbc15/q20dBKNtN3G47jdGvD8Twy6WyfIrmb10ITrFq+lW2b9nDJFecTMkMlpI0im7XL6JugpTlRLAXNlL6kh+M4rFi2nsaGJJ6TK++os4B9u5Ic3n+cBRfE/fz/H6T7eR9fDWHvzkN4bn5cup7ME13+o1SKxx9YxXU3XcG8hXP8dqrvsixrZSKRuK8EOa4HvuDXhxPHTvOb7/+FlkQiP+lVbzVL1/LndhpPtxY7Qdjf+V62F6sD9b0nk8aounyEZF8vXS9a36Kr6D3u10bdmPLa6JrZHcAo1NXoz0shiIQNHvnVE9hZu49VWhAKm2Vdt3ZUUWnU0OPvW/wIsvzp1d1qhfT5EhpmyGT1iq3lnsne7zf2EyaNI681KXRd63xpHa/CxqoIOfzg6w+SyWSLLYT3WpY1qQ8nUC9kszn+73/+mlQmnU/mrb3adtf+IBRCg+qaeEGq+EIOJkFEMf16sDGUG/ei0N6OLUfYtWsftm0P9j2ILqvoRT2lqFKKVDLNvu0nsO1Mf1tl2ZOrimUYvMGyrKq++13e4Huu5MSRBh7+9SPkcrlimsK9JVSrc3u+n8lkePLPqzi4cx/eMNVTPLvDcQePkthOjod++gxSDumx4g/4qRhrVmxAaXq/6ywqpThV38yuHQeLqR0fr2TnHTvHXx9aw44du4uR5HbLst7QgxxL/VQrx3FobWnnwZ/9AceVDNdZyYAgJbBvxxG2bdlVMSlSBq71I8jqFzbhyYEdUFMC1ry4qZgUubaSnXc9Bzvrce/XHkQ3RDGb60+WZc0okKMK+GUxb8n93/o17akMrqeG7axkQJASSGfaue+7jzAUWboty1pAPtNG9z6kM2zbchg5wAQZAlj5wno8f0l4u2VZFYuCzJ//z3J0fz2/v/+ZYm1WA7/tYnfM7L0oOCx7chUr1+5CucObfi0gSCm9WkkO7TrJ5vXbi63AlcQn/KTHxtVbyGTsgZ+pkIrTDa0c3nes2Ir+wUrehFQSpSSPPPQsh/YdKVar/krLsr4BvNfvnk8eP8Uv7/8rmVQO5PBGjgcE6WP9FQJ+8aM/DkUyuZv9JssrL27Ob6Sc0VMWvPLCxmIkf1NFR0zkE+81NTbxk+88hFc4hemDd9PjUJ6UEk0X3Pc/D3P4wEm0EZCHIiBIH+qJI212bjjMrm37irlLK6FeXQ3M62lgp9Nptmzcj+qrJG0fOoiQihUvFS2PfIdlWRWfhroQrFm5nUcffK5YOqKpvaSP9Hjh8VdY9vwGQpo2IpK0BAQpwxMUDcf4+b0P40l3sJp5p5/02LRmJ80NLSUJoJQi18dGpZSK40frOXywvpia9a5BGDjCYZNf3/cX9uw4UEh8UUKd9TzqTzRw3/f+kN/XGCEpKQKC9K1k4SiH1cu2sH/XkcGSIjf6EeTpR1dglsyirwiHw8ycM7nYxO8UhTqCl59dX0zNenPlB06gPI9MJsf93/sD6WS6aB+llGSyGR647y+cqm8ZUTmfA4KUY3h6LpZVxy9+8AjZbHYwjhwv6CkV2tuSbN+6t2QsmBCCMeNH8dHP30E4ZJZswFWw4ZWidfs+NDiri0BzPdas28HLz6wt6uhwXIe1r2zlz39Yxkgr1xIQpEzD0/McVi3fmFcXXHdQ23Ndl02rt5PN5EqmEzX1EBNnjGLxVRcwc+6MkqaIQHFg31EaTjcPbU4BIYhqOvd+53c0NjT1GjvP82hpauUH//krYiF9xCWHDAhCPhCvr+cipUc0EuP3P3+u2C7xQFHXa0V1HF5ZsRlTN0uqV670WHrtYlCCS65cUNpYV6DpGi8+tW4oNz7zY6fAc12+9/UHekngbDbLz3/wJ1LtGUZiZuGAIMD4SWOJV0f7lCIKxZZ12zh04EinuiDOfMm7wk+CrH9lC6X2j4XQcV2biy9fgGmaXHHthQhVuraJlIrlz6wqRpCZg6umSrat2cUzj68iW0gblc1m2bxpGyuf2YQ3QvNEvu4JomuCRZcv4NZ339RnvUKlJJ7n8eB9zwyamuW6Lts27sXLCVzXLqW5cP5l86mxqtE0jUlTxzNqXDWmXjw8Xyg4fqyBE8ca/AzmQc0rpBS4nuS39/6e1pYWHMfBkx4/+sYjOJ49YlNJnXE0b7kehxLG5rBKVikV6WSGW992NVLr+16kgK0b93D44OHCKbvKwnEcXnpqeWcW+WJPQqG4aumFmAXjPBwJcc0bLitoU8WS5oHnKta9vKmikQHlTm7Xc8mm4fvf/B2aLvjV935P48lW3DLd58NBIu1MvyvLDAUoUVvD6/EMfX9bzlQcyAAqoLmphZqaKq65+hLQ+07Rnk2neOinTxV2iFW+HF3FJptk/cqdOCWkhyZ0Mhmbxdcu6jwtaBomV16/iHQ6hSaKP1ZDV7z03IaKRimHTJN0Otv3hqWAnJtj85q9/OTbv+eJP6/AdctLgJ5OZzGHIS9xfwjiO6KGqfcpRJQC1yn6QELlTJpSD/1Vsg5soiqZP8P+7o/dRjad6bOuuJSKTev3kmhNMHn6OHS9MuXaPM9j57Z9pFJuyd1zpRRLr13EmPGjO6WMruvMmjudqbMnluy/Ag4fPMnpk5XzZsWqI9x86xJSyXRZC0AuneHxR16ivT3b98InFRnb4aZbrmTq9PFD7uXqD0Ea/dSmWHUVWh+qiaZBU2PRI6cfBrAsq5p8Eq/uv9U1Eq3tfRrDSkEkOrCJ2nHlqbMncdNbrkEIrc9qTelMlj/++glChkGlnPeu6/LcX19G00s/FiUUb3vfTYTDIaTyOl/VNXFufPNVJaWDlKA8l9UVVLMyts2df3s7N77xCjytDFVb5JMwGH2lU1UKwiaLLpzLnZ94K65UQ77B3h+ZddLvZmtrq9GEwCvRcUPXOHzoFFdc7Tvp7rAsS5IP1tN6SoTWpjYSLamiyajz/dAwzHydwYGUSZMFMuiawZ0fu51lT6xEM83Sq7jn8tRjrxCJx9GEohIKSyaTZe3ynXh9FCcSwNpV29m8YU+XPgp0TaP+ZFOe3CXUHV0TPP/kat5yxw0VmUTZjM2YCXV84BN/w+pXNqM0gZKlE/PouqCv2S40DSeb5cOffBtTZ02ipbV9yFWs/hDkhJ9tYI2KIIRJPlFdsYVAsHH1Vu74wE1+H08H/v9iK+pLT6/CdSWC0mdWJ00fh1Vbc0Z5gw3DYPK0cVxx7fmsX7UPR9rFc10pSXt7liceWVYRqe+6Lls37qS1JYPAK63PS3j4V09hZ7t7fzQhiMYjfdoCUsGhvcdpbmph0uTIGeda1pTgxPHTzJ47nVvfcjW//8MLRCqQU9jxFNffcAkXXLmQZFsS5Q69P6c/y+2GXiuRrjNj7mRQoqQ+63qSPVv2s3fngVIZJ3rZE9lslmceXd7HA1SA4twFswtBbmcGXdP54KfeiakbpSe+EOiaoOFkM47rVYQgzz/+CrpBnxNcodAERGNhYvFI5ysSC5flNFFKoWkaK5etx61EKb1CdheB4P2ffgcLF84Eoc4spEopJk8dy11fvBMk2DlnWDbZ+zOjVvgR5MKLF6IZyi8TYbfVViqN3/74rySTyT6NaaUUruuy7LnVnDja2ocrWeAJmHfujIpkQjcMg2kzpzDv4pllmRZmyKiIsZtOp9mx8TDSK8/lqRUq9PZ8aWXbQ4Jn/rycXK4yu+qGoecrOdVU8Zm/ey9xKz5A00whEJhmmPd+9M2MGVeXL403TEFa/SFIO/n8tN1skKrqGNPmjkHXzZKGme1k2bLqIC8+8wrpVLropFJK4bgOp+ob+dG3f4tultZVNXRC4RDnLz6nYqUCNE3j3R+5mUgkPiQPwfM89uw4QGsiyVC5aRw3y4EdJ2k41Txg71/PFV8phWmazL1wLkuuu4xomP4b1SofnXDhJQu58dalGLoxrJuI/dVJlvdaQc0Qt779xj63DzSh4ZDmnv/4NWtWbKa9rb2zOEzHS0pJOp2h/vhpvvO/fomX0cg52ZKqBrrg/IVzGTd+bMXqlpimyfwF5zLvvNmdISaDCdu2WfbkWhBDp2MLoRGKRFn27KqKHyfWNI27v3AHo8bWYRii7NFTKAwjTJVVxWf+9d15sgxzLZr+EuSvfpNp6fWXUVUT69M1KpGEzTBf++ef8osf/pG9uw6QTKbIZDKkU2lO1Z/mqUdf5Mt3f4ttW3biKrfk/ocQAl3Xuf291/il1zwzW0TXecdH3wBCoYvBre7kui7r1+0a8vPXnnRZ+eKGihPEMAx03eCuL34Y09D6XDy7LqKaYfDhz91G3ahRfhkaR7QXC+BJ8vUUpnV9MxQKccu7l/K7Hz2FlE7RFUMgOn30T/xxGU8/toILL5nH6PG1ZNJZtm7cR3tre6lNxW4iPRSKMW5KNeddPL/iBAmFQsybP4eFF8xh15ZDna7gwVCvDuw5TGtzos+VVklZduRCh5u0lE0ipcvhA40kWtuIx+MVXa0jkQiLLpnLlTcuYflTK7DL8EDpeoi580dz7Q1LiEQijAQMRGn/DfDlnoNx29tuYOXTGzh26CQ5V/WZqsVxXGzbYcOa7RiGgZQqbzAqVVZxS0M3UBnBp79056ANZiQS4aOfexef/9BXEZoxKOlnHMdh1ctb8pG4xUioFGgas86bzYzpE/A8r6/IdnShsXPrPuqPN/ZJutXLN/CWd7yx4otMJBLmo59+K1vWbqe5saUPcitMPcTn/vmuEUOOgRLk3p4EEUJQXV3Fp7/8Ab5w1zfQNdWnttDhdXFsFyfnFlY8UVYSJCEE6ZzDxz97G+fOn1PxB9tVVZg5ZyqzFp7Lyf0HyTmVlyJKSZY9sxohdIrFbQpdx83ZfOGfP0jdaKs8VUwT7N62n3//+++i0Iqa/lJ6rHxhK7e89YZBUVNrR9Xw6S+/n6989uugR/NlCnr2QXmYxHn/p97ExEnjR1RdxoFsHBwFfuBni5yzYBZ3f+l9eLlsHzupPYiiibLceHn/v4Z0NG5486Xc8o7r/NLtV9CQFYRCIT78qdsr5g7tPjkl9ccaaKxvLZkQQtcNZs+fyoyZkxgzpo4x40b3/RpTxwUXzyMUiZUM49eEYM+2QyQSbYPiLTLNEIsumcf1t12LqXn0TLHrKY+IUcWiK+dy421XEQqFR1SR2IHurH2a7lnZEUJgmiFuuvVKPvSZd2I7bnm2RD9dgG2JNq6+6RI+/Mm3U1tbO6DQkv5KkUUXz2X2vJmICrflOA7PP70KXTNLOjhcx+H6N16BEP57H8VeZsjk/EvmYWil1dVMOsPm9bsG5YyLEIJIJML77rqdMeNHETZlpwBUCiJGmEgMPnj37dTU1Az68xwqggD83M+9F41Geev73sRHP/sORo2pJpuxKzSZXKSjuOG2K/nAp25nyrTJQzKYHcR/311vIZfJltwQ7S9sO8fTj72MEsVPJuaD+xRXXX9pv1Ug0zR589uWks16Je0Voem88NdVxfJmVUTVmjJ1PO//1DtQysTQOnbzIZf2eMeHb2buuTNHZC34M3nanwJ2+g1GLBbjvR99Cx/77DuZd94sUu1pbNspW+3qvnp6pFNZRo+p5W133szH/+69zJhVWXL0JdINw+Cyqy5g/vlzy4r0LacNz/M4dOAEDSda8LxSblbB7HOmMW7i6H6rHoZhcMHF52CNqaXkcAnYvnEvqXSml5pVKXVH03TecMsSlt58BUJJBAINj3MvmsNb3vWmshYeUaZ9OlII4pLPDl7vRxJDN3jz297A337+XVz3psVMnja+M8mZY7tIL++y7LpRqKRCehLPldg5l0wmx6gxNVxy5UI+8PHbuevz72LSlAloWnkrTbdrl3jZudJHPvP7LQYfvPvtOE6uQBLVr5dtOz2kh82Tf3qRSDSKktL3NwCe9Fh6/SUDllzhcJjFV5+PkqX6J8lkcqxa1js9aa4QEFnOqzRBNFCCD999G2Mnj0EgqKqp5q7Pv51IOFSW9Mjl7H6P83B4sbqiAbge2AKYvQYEuOSK81lw4VxWvLiBNS9v5vC+Y6TTOZLJdCdRlMyHZ2u6hmFoRKMxYlURRo2uYfE1F3LVdRczZfpElKRfkkNJ1fl9VZxFuGUEUJqmyaVXzmfOvMkcO9KKa/cjs4kCt8c+QDqV5qUnV6PQ0IpMDiEE4ZDBJUsXFlOv3kW+UnAHPgl8qacUue6mS3nxydUo1y2qyoVCIf7022e5+g2XdW7QKaXwXBdN9O1dLEc7MAyD8ePH8p67buO3P/wrS264lPMvnFue10qB53p9Pn8pZVnFioaKICQSiV2Fykhb/CSSpunE43FuvGUJN996Fbu2H2D7pr1s2bCH5oYWku0ZbNvG0HUisTCjRtcyY84E5l0wm0sXn9/ppRJolFhElwCv9J5cJuMm5LPqFCviKaVi8tTxZRFPScGH7n4nP/72w/kzG2UOt5QwacrYzjaklDQ3JYhV1RAK6UXvS0nBhEl1zJg11a9/diKReLjrG5Zl/cCPIOeeN5epMyeRSSaLZkrRhEF7W4pMJkt1dXVnlMK0WZOoP9FYfMOxMBlD4VBZ6o2uG7zx1us4sq+e9911e9mqldAEM+ZMIdmWKllvOxqPlorq9oacIAWSbLcs6wLyoSjTi+mgAOfMn0ksHmH0+DpaG1tJp3M4OQdNF0RiEWqtGiZOG82U6ZOoqqoup/klwAG/Qa2trebGtywpLB2iKEHGTRpTlgFsmibTZ07mhlsWdytHXI47d+K0CZ0rZd6zE+amt1xJJGQUXZ2lVIwZX1cs3OYRn+dw2LKs5fQoyBmNhrnhzVeSS2dKLNAC13W61Xk0TZMl119CMpEqasN0qFZWbVW/bIQl111EVVWsbI3ANA2uuekynJxdtB2lFGYolI/+9f9Ov/Uvcaa+70Qi0XUFqyG/kfi+viaM53kFcZjXHTtu6NWin3pfA34EuCORSKwutL0bOKdnO+UkedN1vVjcTytQO5Br9tWG53llJXDTNI1QyHd1viGRSDzf803Lsr4IfLPnxMnlcmXtc4RCr9oDHSWYy4n2DYfDfpN9F/A8cHcvA9Z1i6lWzwNxYHHPcbftvtMDdexd+fRlHXBZ/7cW+mlslvn6G6XUSTU4kEqp3yqlrB5t/qzC7RxTSv1YjUzUlxj7mFIqOUL6+ZNCnzaV+f2sUuocpdQ3B6Ev3xnIXB4sgnS8vqOUaq3gTf5BKTWuSFsRpdTuCrb1jUG4ZqVwTx/jfv8I6OPuwvihlJqtlEr18f1mpdTiwvfDSqldFezLrsI1RxxBOl5vOEOJskMpdW2Z7TRUYEBfGYRrVgpryxiHiFJqzzD2saEwbl37dFMfv7mpx/evV0odqkBfjhSuxUgmCEqpsUqphwvqQbnYoJT6H6WU2Y92Jiql/jTAwUwWJEclr9kTTQP8Xa4MydGTJMMhSf5UGC+/Pi1SSq3s8f2Vhff9vl+jlPrNGfTlAaVU7ZnM2zM20geIcwpG2DTAAmKFjcf2wsbjZvLHe5Nn0Makgjfn6u4Oyd72M7AbeBnYWKFr+rWxmfyJzB2F+++4Tnsfv9tf+N2aAY5DtNDWUmA0xVO9ioJX8+VCeye79HFcH7+jy+9OlOk9vbrwm3LiW6wu91BVYtwFkOnSl5YzjrIYqUmDAwQYCQjKHwQIEBAkQICAIAECBAQJECAgSIAAAUECBAgIEiBAQJAAAQKCBAgQECRAgAABQQIECAgSIEBAkAABAoIECBAQJECAgCABAgQECRAgIEiAAAFBAgQICBIgQICAIAECBAQJECAgSIAAAUECBAgIEiBAQJAAAQKCBAgQECRAgIAgAQIE6MT/GwCHQdBaHs2ArAAAAABJRU5ErkJggg==',
          width: 40,
          height: 40 },

        { text: 'OFICINA DE LOGISTICA - UNIDAD DE PATRIMONIO', alignment: 'right' }
      ],
      style: 'header'
    },
  
    content:contenido, 
    
   pageSize: 'A4',
   pageOrientation: 'landscape', 

   styles: {
    header: {
      fontSize: 10,
      bold: true,
      //alignment: 'right',
      margin: [20, 5, 20, 0]
    },
    cabexeraText:{
      bold: true,fontSize: 8
    },
    cabexeraTextConten:{
      fontSize: 8
      //color: 'gray'
    },
    headerDocumento: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
     margin: [0, 10, 0, 10]
    },
    subheader: {
      fontSize: 14
    },
    superMargin: {
      margin: [20, 0, 40, 0],
      fontSize: 15
    },
      tableExample: {
        fontSize: 10,
      margin: [0, 5, 0, 15]
    },
    tableItem: {
      fontSize: 8
      
    },
    tableHeader:{
      fontSize: 9, 
      bold: true,
    },
  }
   //content:columna_
  };
    
     }
      
     

   
  documento(ubicacionEmpelado:UbicaionEmpeadoReportInterface,tipo,dataBienes){
   
    
  return {
    footer: function(currentPage, pageCount) { return currentPage.toString() + ' de ' + pageCount; }, 

    header: {
      columns: [
        { 
          
          image: 'data:image/png;base64,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',
          width: 40,
          height: 40 },

        { text: 'OFICINA DE LOGISTICA - UNIDAD DE PATRIMONIO', alignment: 'right' }
      ],
      style: 'header'
    },
  
    content: this.contenidoDocumento(ubicacionEmpelado,tipo,dataBienes),
    
   pageSize: 'A4',
   pageOrientation: 'landscape', 

   styles: {
    header: {
      fontSize: 10,
      bold: true,
      //alignment: 'right',
      margin: [20, 5, 20, 0]
    },
    cabexeraText:{
      bold: true,fontSize: 8
    },
    cabexeraTextConten:{
      fontSize: 8
      //color: 'gray'
    },
    headerDocumento: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
     margin: [0, 10, 0, 10]
    },
    subheader: {
      fontSize: 14
    },
    superMargin: {
      margin: [20, 0, 40, 0],
      fontSize: 15
    },
      tableExample: {
        fontSize: 10,
      margin: [0, 5, 0, 15]
    },
    tableItem: {
      fontSize: 8
      
    },
    tableHeader:{
      fontSize: 9, 
      bold: true,
    },
  }
   //content:columna_
  };

   }
      
  
  documento3(dataBienes){
   
    let ubicacionEmpelado;
    let tipo =5;
    return {
      footer: function(currentPage, pageCount) { return currentPage.toString() + ' de ' + pageCount; }, 
  
      header: {
        columns: [
          { 
            
            image: 'data:image/png;base64,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',
            width: 40,
            height: 40 },
  
          { text: 'OFICINA DE LOGISTICA - UNIDAD DE PATRIMONIO', alignment: 'right' }
        ],
        style: 'header'
      },
    
      content: this.contenidoDoc(dataBienes),
      
     pageSize: 'A4',
     pageOrientation: 'landscape', 
  
     styles: {
      header: {
        fontSize: 10,
        bold: true,
        //alignment: 'right',
        margin: [20, 5, 20, 0]
      },
      cabexeraText:{
        bold: true,fontSize: 8
      },
      cabexeraTextConten:{
        fontSize: 8
        //color: 'gray'
      },
      headerDocumento: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
       margin: [0, 10, 0, 10]
      },
      subheader: {
        fontSize: 14
      },
      superMargin: {
        margin: [20, 0, 40, 0],
        fontSize: 15
      },
        tableExample: {
          fontSize: 10,
        margin: [0, 5, 0, 15]
      },
      tableItem: {
        fontSize: 8
        
      },
      tableHeader:{
        fontSize: 9, 
        bold: true,
      },
    }
     //content:columna_
    };
  
     }
  
  contenidoDoc(dataBienes){
      //armar e item
      var  items_: Object[] = [];
      items_=[
        [
         {text: 'N°', style: 'tableHeader'},
         {text: 'CODIGO', style: 'tableHeader'}, 
         {text: 'DESCRIPCION', style: 'tableHeader'},  
         {text: 'DIMENSION', style: 'tableHeader'},
         {text: 'SERIE', style: 'tableHeader'},
         {text: 'MARCA', style: 'tableHeader'},
         {text: 'MODELO', style: 'tableHeader'},
         {text: 'TIPO', style: 'tableHeader'},
         {text: 'E', style: 'tableHeader'},
         {text: 'OBSERVACION', style: 'tableHeader'},
         {text: 'PRECIO', style: 'tableHeader'}
       ] ];
      
      let total=dataBienes.length; 
      console.log("tttt:",dataBienes.length);
      //console.log("bienes:::",dataBienes);
      let o=1;
      if(total>0) { 
        for (var item of dataBienes) { 
         items_.push(
            [ {text: o++, style: 'tableItem'},
              {text: item['cBienCodigo'], style: 'tableItem'},
              {text: item['cBienDescripcion'], style: 'tableItem'},
              {text: item['cBienDimension'], style: 'tableItem'},
              {text: item['cBienSerie'], style: 'tableItem'},
              {text: item['cMarcaDescripcion'], style: 'tableItem'},
              {text: item['cModeloDescripcion'], style: 'tableItem'},
              {text: item['cTipoDescripcion'], style: 'tableItem'},
              {text: item['cEstadoBienAbre'], style: 'tableItem'},              
              {text: item['cBienObs'], style: 'tableItem'},
              {text: item['nBienValor'], style: 'tableItem'}
              
           ] );
         }
      }   
      items_.push(
          [ {text: 'Total de bienes:',colSpan: 9, alignment: 'right',style: 'tableItem'},
            {},{},{},{},{},{},{},{},{},
            {text: total, style: 'tableItem'}
          ] );
      //fin item
  
  
      var contenido: Object[] = [];
     
      console.log("case 5 ");     
      contenido= [[
          {
            stack: [
              'REPORTE DE BIENES SIN DEPRECIABLES'
            ],
            style: 'headerDocumento'          
          },
          
    
          {
          
            columns: [
              {
                width: 90,
                text: 'ENTIDAD:', style: 'cabexeraText' 
              },
              {
                text: 'UNIVERSIDAD NACIONAL DE MOQUEGUA',style: 'cabexeraTextConten' 
              },           
              {
                width: 90,  
                text: 'FECHA:', style: 'cabexeraText' 
              },
              {
                width: 90,
                text:'2019',style: 'cabexeraTextConten' 
              }
            ]
          },
    
        
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: ['2.5%' , '12%', '12%','11%','11%','10%','10%','10%','2.5%','11%','8%'],
                       // 10%','10%','10%','10%','10%','2.5%','8%'
              body:items_
            },
            layout: 'lightHorizontalLines'
          },
    
    
        ]];
      
      return contenido;
  
     }     
}
