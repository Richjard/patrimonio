import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { QueryService } from './../../../servicios/query.services'
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

import { ActivatedRoute } from "@angular/router";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-silabus-cursos',
  templateUrl: './silabus-cursos.component.html',
  styleUrls: ['./silabus-cursos.component.scss'],
  animations: [SharedAnimations]
})
export class SilabusCursosComponent implements OnInit {

  @Input() dataSave;
  @Output() reload = new EventEmitter();

  cursossilabo:any = []
  dataSilabo:any=[]
  

  //tmaterial:string = ""
  //materiales:any = []

  //tequipo:string = ""
  //equipos:any = []
  

  //Llama los campos del componente (silabus-cursos.component.html)
  fSumilla:string = ''
  pMetodo:string = ''
  pMedios:string = ''


  aSilabo:string = '';
  // ciclo:string = ''
  // curso:string = ''
  data:any = []

  //PROGRAMACION CONTENIDOS//
  silabounidad:any = []
  silabo:any = []

  sl:any = {}
  sll:any = {}

  clases:any = []
  semanas:any = []


  combounidades:any = []
  unidades:any = []

  conceptuales:any = []
  actitudinales:any = []
  procedimentales:any = []


  //COMPETENCIAS//
  //capacidad:string = ""
  capacidades:any = []
  aCompetencias:string = ""

  //PROCEDIMIENTOS//
  masterSelectedPro: boolean = false;
  procedimientos: any = []
  checkedListPro:any= [];
  aProcedimientos: any = []
  aMetodos:string = ''
  aMediosDidacticos:string = ''
  //tecnicas:any = []

  //APRENDIZAJE//
  aMemorizacion :string = ''
  aAdiestramiento :string = ''
  aSignificacion :string = ''

  //EQUIPOS MATERIALES//
  masterSelected: boolean = false;
  masterSelectedMat: boolean = false;
  //checklist:any;
  equipos: any = []
  checkedList:any= [];
  aEquipos:any= [];
  materiales:any = []
  checkedListMat:any= [];
  aMateriales:any= [];
  
  //EVALUACION//
   masterSelectedEva: boolean = false;
   evaluaciones: any = []
   checkedListEva:any= [];
   aEvaluaciones: any = []
   aEvaluacion :string = ''
  
  //FUENTES//
  textob:string = ""
  textobase:any = []

  bibliografia:string = ""
  bibliografiac:any = []

  fuente:string = ""
  fuentee:any = []

  @Input() ciclo
  @Input() curso

  constructor(private query:QueryService,private route: ActivatedRoute) {
    // this.route.params.subscribe(params => {
    //   this.ciclo = params['ciclo'];
    //   this.curso = params['curso'];
    // });
    
    this.sll['combounidades'] = []
    this.sll['unidades'] = []
    this.sl['conceptuales'] = []
    this.sl['procedimentales'] = []
    this.sl['actitudinales'] = []
    this.sl['avanceparcial'] = []
    this.sl['avanceacumulado'] = []
    

    //this.masterSelected = '';
    /*
    this.checklist = [
      {id:1,value:'Elenor Anderson',isSelected:false},
      {id:2,value:'Caden Kunze',isSelected:true},
      {id:3,value:'Ms. Hortense Zulauf',isSelected:true},
      {id:4,value:'Grady Reichert',isSelected:false},
      {id:5,value:'Dejon Olson',isSelected:false},
      {id:6,value:'Jamir Pfannerstill',isSelected:false},
      {id:7,value:'Aracely Renner DVM',isSelected:false},
      {id:8,value:'Genoveva Luettgen',isSelected:false}
    ];
    */
    this.getCheckedItemList();
    this.getCheckedItemListMat();
   }

   ngOnInit() {
    this.getCursosSilabo();
    this.getProcedimientosTecnicas();
    this.getEquipos();
    this.getMateriales();
    this.getEvaluacionPermanente();
    this.getSemanaSilabo();
    this.getClaseSilabo();
    //this.getconfig()
  }
  getCursosSilabo(){
    //this.query.getCursosDocenteSilabo('20182','ISRDC06')
    //this.query.getCursosDocenteSilabo('20182',this.curso)
    this.query.getCursosDocenteSilabo(this.ciclo,this.curso)
    .subscribe(
      data => {
        this.cursossilabo = data
      },
      error => {
        console.log(error)
      }
    )
  }
 
  /* 
    guardarSumilla(){
      let dataSave = {
        sumilla : this.fSumilla,
        metodo : this.pMetodo,
        medios: this.pMedios,
        memorizacion: this.aMemorizacion,
        adiestramiento : this.aAdiestramiento,
        significacion  : this.aSignificacion,
        otros:'otro'
      }
      console.log(dataSave)
    }
  */
//Guardar 4. tabla detalle_unidad//
guardarDetalleUnidades(){
  
  let dataSaveDU = {
    
    //aSilabo: silabo,
    
    aSilabounidad  : this.silabounidad,
    //aCombounidades  : this.combounidades,
    //aUnidades  : this.unidades
    
  }; 
    console.log(dataSaveDU)

  this.query.saveDetallesUnidades(dataSaveDU).subscribe(
    data => {
      console.log(data);
      Swal.fire('Genial', data['mensaje'], 'success');
      this.reload.emit(true);
    },
    error => {
      console.log(error);
      if (error.error.hasOwnProperty('validated')) {
        Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
      }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
  console.log(dataSaveDU)
}
//Guardar 4. tabla detalle_conceptuales//
guardarDetalleConceptuales(){
  let dataSaveDC = {
    
    //aConceptuales  : this.conceptuales,
    aSilabo  : this.silabo,
  };  
  this.query.saveDetallesConceptuales(dataSaveDC).subscribe(
    data => {
      console.log(data);
      Swal.fire('Genial', data['mensaje'], 'success');
      this.reload.emit(true);
    },
    error => {
      console.log(error);
      if (error.error.hasOwnProperty('validated')) {
        Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
      }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
  console.log(dataSaveDC)
}
//Guardar 4. tabla detalle_actitudinales//
guardarDetalleActitudinales(){
  let dataSaveDA = {
    //aSilabo: silabo,
    //aActitudinales  : this.actitudinales,
    aSilabo  : this.silabo,

  };  
  this.query.saveDetallesActitudinales(dataSaveDA).subscribe(
    data => {
      console.log(data);
      Swal.fire('Genial', data['mensaje'], 'success');
      this.reload.emit(true);
    },
    error => {
      console.log(error);
      if (error.error.hasOwnProperty('validated')) {
        Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
      }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
  console.log(dataSaveDA)
}
//Guardar 4. tabla detalle_actitudinales//
guardarDetalleProcedimentales(){
  let dataSaveDP = {
    //aSilabo: silabo,
    //aProcedimentales  : this.procedimentales,
    aSilabo  : this.silabo,
  };  
  this.query.saveDetallesProcedimentales(dataSaveDP).subscribe(
    data => {
      console.log(data);
      Swal.fire('Genial', data['mensaje'], 'success');
      this.reload.emit(true);
    },
    error => {
      console.log(error);
      if (error.error.hasOwnProperty('validated')) {
        Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
      }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
  console.log(dataSaveDP)
} 


//Guardar 3. tabla competencia_capacidad//
guardarDetalleCompetencias(){
  let dataSaveC = {
    //aSilabo: silabo,
    competencias : this.aCompetencias,
    aCapacidades  : this.capacidades,
    //mediosdidacticos  : this.aMediosDidacticos
  };  
  this.query.saveDetallesCompetencias(dataSaveC).subscribe(
    data => {
      console.log(data);
      Swal.fire('Genial', data['mensaje'], 'success');
      this.reload.emit(true);
    },
    error => {
      console.log(error);
      if (error.error.hasOwnProperty('validated')) {
        Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
      }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
  console.log(dataSaveC)
}

//Guardar 5. tabla procedimientos_didacticos//
  guardarDetalleProcedimientos(){
    let dataSaveP = {
      //aSilabo: silabo,
      metodos : this.aMetodos,
      aProcedimientos  : this.procedimientos,
      mediosdidacticos  : this.aMediosDidacticos
    };  
    this.query.saveDetallesProcedimientos(dataSaveP).subscribe(
      data => {
        console.log(data);
        Swal.fire('Genial', data['mensaje'], 'success');
        this.reload.emit(true);
      },
      error => {
        console.log(error);
        if (error.error.hasOwnProperty('validated')) {
          Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
        }
          else {
            let mensaje = '';
            for (const i in  error.error.errors) {
              for (const j in error.error.errors[i]) {
                let errorMensaje = error.error.errors[i][j]
                mensaje += `${errorMensaje}<br>`
              }
            }
            Swal.fire('Validación incompleta', mensaje, 'warning');
          }
        },
      );
    console.log(dataSaveP)
  }

//Guardar 6. tabla aprendizajes//
  guardarAprendizaje(){
    //console.log(dataSave)
    let dataSaveA = {
      memorizacion: this.aMemorizacion,
      adiestramiento : this.aAdiestramiento,
      significacion  : this.aSignificacion
    };  
    this.query.saveAprendizaje(dataSaveA).subscribe(
      data => {
        console.log(data);
        Swal.fire('Genial', data['mensaje'], 'success');
        this.reload.emit(true);
      },
      error => {
        console.log(error);
        if (error.error.hasOwnProperty('validated')) {
          Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
        }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
  }

 //Guardar 7.1 tabla detalle_equipos//
 guardarDetalleEquipos(){
  let dataSaveE = {
    //aSilabo: silabo,
    aEquipos : this.checkedList,
  };  
  this.query.saveDetalleEquipos(dataSaveE).subscribe(
      data => {
        console.log(data);
        Swal.fire('Genial', data['mensaje'], 'success');
        this.reload.emit(true);
      },
      error => {
        console.log(error);
        if (error.error.hasOwnProperty('validated')) {
          Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
        }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
    console.log(dataSaveE)
 }

//Guardar 7.2 tabla detalle_materiales//
  guardarDetalleMateriales(){
  let dataSaveM = {
    //aSilabo: silabo,
    aMateriales  : this.checkedListMat
  };  
  this.query.saveDetalleMateriales(dataSaveM).subscribe(
    data => {
      console.log(data);
      Swal.fire('Genial', data['mensaje'], 'success');
      this.reload.emit(true);
    },
    error => {
      console.log(error);
      if (error.error.hasOwnProperty('validated')) {
        Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
      }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
  console.log(dataSaveM)
  }

//Guardar 8. tabla FuenteTextoBase//
  guardarDetalleEvaluaciones(){
    let dataSaveDE = {
      //aSilabo: silabo,
      evaluacion : this.aEvaluacion,
      aEvaluaciones  : this.evaluaciones
    };  
    this.query.saveDetalleEvaluaciones(dataSaveDE).subscribe(
      data => {
        console.log(data);
        Swal.fire('Genial', data['mensaje'], 'success');
        this.reload.emit(true);
      },
      error => {
        console.log(error);
        if (error.error.hasOwnProperty('validated')) {
          Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
        }
          else {
            let mensaje = '';
            for (const i in  error.error.errors) {
              for (const j in error.error.errors[i]) {
                let errorMensaje = error.error.errors[i][j]
                mensaje += `${errorMensaje}<br>`
              }
            }
            Swal.fire('Validación incompleta', mensaje, 'warning');
          }
        },
      );
    console.log(dataSaveDE)
  }

//Guardar 9.1 tabla FuenteTextoBase//
  guardarFuenteTextoBase(){
    let dataSaveFTB = {
      //aSilabo: silabo,
      aFuenteTB  : this.textobase
    };  
    this.query.saveFuenteTextoBase(dataSaveFTB).subscribe(
      data => {
        console.log(data);
        Swal.fire('Genial', data['mensaje'], 'success');
        this.reload.emit(true);
      },
      error => {
        console.log(error);
        if (error.error.hasOwnProperty('validated')) {
          Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
        }
          else {
            let mensaje = '';
            for (const i in  error.error.errors) {
              for (const j in error.error.errors[i]) {
                let errorMensaje = error.error.errors[i][j]
                mensaje += `${errorMensaje}<br>`
              }
            }
            Swal.fire('Validación incompleta', mensaje, 'warning');
          }
        },
      );
    console.log(dataSaveFTB)
  }

//Guardar 9.2 tabla FuenteBibliografiaComplementaria//
  guardarFuenteBibliografiaComplementaria(){
  let dataSaveFBC = {
    //aSilabo: silabo,
    aFuenteBC  : this.bibliografiac
  };  
  this.query.saveFuenteBibliografiaComplementaria(dataSaveFBC).subscribe(
    data => {
      console.log(data);
      Swal.fire('Genial', data['mensaje'], 'success');
      this.reload.emit(true);
    },
    error => {
      console.log(error);
      if (error.error.hasOwnProperty('validated')) {
        Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
      }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
  console.log(dataSaveFBC)
  }

//Guardar 9.3 tabla FuenteElectronicas//
  guardarFuenteElectronicas(){
  let dataSaveFE = {
    //aSilabo: silabo,
    aFuenteE  : this.fuentee
  };  
  this.query.saveFuenteElectronicas(dataSaveFE).subscribe(
    data => {
      console.log(data);
      Swal.fire('Genial', data['mensaje'], 'success');
      this.reload.emit(true);
    },
    error => {
      console.log(error);
      if (error.error.hasOwnProperty('validated')) {
        Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
      }
        else {
          let mensaje = '';
          for (const i in  error.error.errors) {
            for (const j in error.error.errors[i]) {
              let errorMensaje = error.error.errors[i][j]
              mensaje += `${errorMensaje}<br>`
            }
          }
          Swal.fire('Validación incompleta', mensaje, 'warning');
        }
      },
    );
  console.log(dataSaveFE)
  }


/////////////////////////procedimientostecnicas
  checkUncheckAllPro() {
    for (var i = 0; i < this.procedimientos.length; i++) {
      this.procedimientos[i].isSelected = this.masterSelectedPro;
    }
    this.getCheckedItemListPro();
  }

  isAllSelectedPro() {
    this.masterSelectedPro = this.procedimientos.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemListPro();
  }

  getCheckedItemListPro(){
    this.checkedListPro = [];
      for (var i = 0; i < this.procedimientos.length; i++) {
        if(this.procedimientos[i].isSelected)
        this.checkedListPro.push(this.procedimientos[i]);
      }
      //this.checkedList = JSON.stringify(this.checkedList);
      //this.checkedList = this.checkedList;
      this.checkedListPro.forEach(function(element) {
        console.log(element);
      });

  }

/////////////////////////equipos
  checkUncheckAll() {
    for (var i = 0; i < this.equipos.length; i++) {
      this.equipos[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.equipos.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
      for (var i = 0; i < this.equipos.length; i++) {
        if(this.equipos[i].isSelected)
        this.checkedList.push(this.equipos[i]);
      }
      //this.checkedList = JSON.stringify(this.checkedList);
      //this.checkedList = this.checkedList;
      this.checkedList.forEach(function(element) {
        console.log(element);
      });

  }
  
/////////////////////////materiales

  checkUncheckAllMat() {
    for (var i = 0; i < this.materiales.length; i++) {
      this.materiales[i].isSelected = this.masterSelectedMat;
    }
    this.getCheckedItemListMat();
  }

  isAllSelectedMat() {
    this.masterSelectedMat = this.materiales.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemListMat();
  }

  getCheckedItemListMat(){
    this.checkedListMat = [];
      for (var i = 0; i < this.materiales.length; i++) {
        if(this.materiales[i].isSelected)
        this.checkedListMat.push(this.materiales[i]);
      }
      //this.checkedListMat = JSON.stringify(this.checkedListMat);
      //this.checkedListMat = this.checkedListMat;

      this.checkedListMat.forEach(function(element) {
        console.log(element);
      });
  }
/////////////////////////evaluaciones
  checkUncheckAllEva() {
    for (var i = 0; i < this.evaluaciones.length; i++) {
      this.evaluaciones[i].isSelected = this.masterSelectedEva;
    }
    this.getCheckedItemListEva();
  }

  isAllSelectedEva() {
    this.masterSelectedEva = this.evaluaciones.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemListEva();
  }

  getCheckedItemListEva(){
    this.checkedListEva = [];
      for (var i = 0; i < this.evaluaciones.length; i++) {
        if(this.evaluaciones[i].isSelected)
        this.checkedListEva.push(this.evaluaciones[i]);
      }
      //this.checkedListMat = JSON.stringify(this.checkedListEva);
      //this.checkedListMat = this.checkedListMat;

      this.checkedListEva.forEach(function(element) {
        console.log(element);
      });
  }
  


  //Trae las tablas para los checks//
  
  getEquipos(){
    this.query.getEquipos()
    .subscribe(
      data => {
        this.equipos = data
        console.log(data) 
      },
      error => {
        console.log(error)
      }
    )
  }

  getMateriales(){
    
    this.query.getMateriales()
    .subscribe(
      data => {
        this.materiales = data
        console.log(data) 
      },
      error => {
        console.log(error)
      }
    )
  }

  getEvaluacionPermanente(){
    this.query.getEvaluacionPermanente()
    .subscribe(
      data => {
        this.evaluaciones = data
        console.log(data)
      },
      error => {
        console.log(error)

      }
    )
  }

  getProcedimientosTecnicas(){
    this.query.getProcedimientosTecnicas()
    .subscribe(
      data => {
        this.procedimientos = data
      },
      error => {
        console.log(error)
      }
    )
  }

  getClaseSilabo(){
    this.query.getClaseSilabo()
    .subscribe(
      data => {
        this.clases = data
      },
      error => {
        console.log(error)
      }
    )
  }

  getSemanaSilabo(){
    this.query.getSemanaSilabo()
    .subscribe(
      data => {
        this.semanas = data
      },
      error => {
        console.log(error)
      }
    )
  }
  
}




