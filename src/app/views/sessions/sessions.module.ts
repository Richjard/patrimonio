import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
@NgModule({
  imports: [
    
    DropDownListModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SessionsRoutingModule
  ],
  declarations: [SignupComponent, SigninComponent, ForgotComponent]
})
export class SessionsModule { }
