import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    constructor() {
    }

    defaultMenu: IMenuItem[] = [
        {   
            name: 'Bienes',
            description: '.',
            type: 'dropDown',
            icon: 'i-University',
            sub: [
               // { icon: 'i-Clock-3', name: 'Locales', state: '/control/estudiantes', type: 'link' },
                { icon: 'i-Clock-3', name: 'Bienes', state: '/subModulos/bienes/bienes', type: 'link' },
                { icon: 'i-Clock-3', name: 'Desplazamiento de bienes', state: '/subModulos/bienes/desplazamiento', type: 'link' },
                { icon: 'i-Clock-3', name: 'Verificación de bienes', state: '/subModulos/bienes/verificacion', type: 'link' },
                { icon: 'i-Clock-3', name: 'Verificación de bienes items', state: '/subModulos/bienes/verificar', type: 'link' }
            ]
        },
        {   
            name: 'Ubicacion',
            description: '.',
            type: 'dropDown',
            icon: 'i-Map-Marker',
            sub: [
               // { icon: 'i-Clock-3', name: 'Locales', state: '/control/estudiantes', type: 'link' },
                { icon: 'i-Clock-3', name: 'Dependencia Filtro', state: '/subModulos/ubicacion/dependecia', type: 'link' }
            ]
        },

        {   
            name: 'Catalogo SBN',
            description: '.',
            type: 'dropDown',
            icon: 'i-Library',
            sub: [
               // { icon: 'i-Clock-3', name: 'Locales', state: '/control/estudiantes', type: 'link' },
                { icon: 'i-Clock-3', name: 'Grupos genéricos', state: '/subModulos/catalogoSBN/grupos', type: 'link' },
                { icon: 'i-Clock-4', name: 'Clase genérico', state: '/subModulos/catalogoSBN/clases', type: 'link' },
                { icon: 'i-Clock-4', name: 'Grupo-Clase', state: '/subModulos/catalogoSBN/grupos_clases', type: 'link' },
                { icon: 'i-Clock-4', name: 'Catalogo', state: '/subModulos/catalogoSBN/catalogo', type: 'link' },
            ]
        },
      

        {   
            name: 'Tablas generales',
            description: '.',
            type: 'dropDown',
            icon: 'i-Windows-2',
            sub: [
               // { icon: 'i-Clock-3', name: 'Locales', state: '/control/estudiantes', type: 'link' },
                { icon: 'i-Clock-3', name: 'Marca', state: '/subModulos/tablasGenerales/marcas', type: 'link' },
                { icon: 'i-Clock-4', name: 'Modelo', state: '/subModulos/tablasGenerales/modelos', type: 'link' },
                { icon: 'i-Clock-4', name: 'Tipo', state: '/subModulos/tablasGenerales/tipos', type: 'link' },
                { icon: 'i-Clock-4', name: 'Catalogo No Patromonial', state: '/subModulos/tablasGenerales/catalogos_no_patrimonial', type: 'link' },
                { icon: 'i-Clock-4', name: 'Documentos de Adquisicion', state: '/subModulos/tablasGenerales/documentos', type: 'link' },
                { icon: 'i-Clock-4', name: 'Plan Contable', state: '/subModulos/tablasGenerales/planes', type: 'link' },
                { icon: 'i-Clock-4', name: 'Documentos de Tramite', state: '/subModulos/tablasGenerales/documentos_tramite', type: 'link' },
                { icon: 'i-Clock-4', name: 'Ordenes de Compra', state: '/subModulos/tablasGenerales/oc', type: 'link' },
                { icon: 'i-Clock-4', name: 'Items O/C', state: '/subModulos/tablasGenerales/items_oc', type: 'link' },
                { icon: 'i-Clock-4', name: 'Empleados', state: '/subModulos/tablasGenerales/empleados', type: 'link' },
                { icon: 'i-Clock-4', name: 'Centros de cosotos', state: '/subModulos/tablasGenerales/centro_costo', type: 'link' },
                { icon: 'i-Clock-4', name: 'Asignar Empleados a Centro de costos/Dependencias', state: '/subModulos/tablasGenerales/centro_costo_empleado', type: 'link' },
            
            ]
        },

       /* {   
            name: 'Documentos tramite Ref.',
            description: '.',
            type: 'link',
            icon: 'i-File-Hide',
            state: '/subModulos/tablasGenerales/documentos_tramite',
             
             
        },*/
        {   
            name: 'Reportes',
            description: '.',
            type: 'dropDown',
            icon: 'i-File-Pictures',
            sub: [
               // { icon: 'i-Clock-3', name: 'Locales', state: '/control/estudiantes', type: 'link' },
                { icon: 'i-Receipt-4', name: 'Por Ubicacion - Dependencia', state: '/subModulos/reportes/por_dependecia', type: 'link' },
                { icon: 'i-Receipt-4', name: 'Por Ubicacion - Sub Dependencia', state: '/subModulos/reportes/por_dependecia_subdependencia', type: 'link' },
                { icon: 'i-Receipt-4', name: 'Por Ubicacion - Empleado', state: '/subModulos/reportes/por_dependecia_sub_empleado', type: 'link' },
                { icon: 'i-Receipt-4', name: 'Por Empleado', state: '/subModulos/reportes/por_empleado', type: 'link' },
                { icon: 'i-Receipt-4', name: 'Bien Sin Depreciacion', state: '/subModulos/reportes/por_bien_noDepreciable', type: 'link' },
               
            ]
        },
    ];


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}
