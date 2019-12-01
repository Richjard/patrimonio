import {Observable,of,throwError}from 'rxjs';
import {delay,mergeMap,retryWhen, retry} from 'rxjs/operators'
import { ErrorStateMatcher } from '@angular/material/core';

const getErrorMessage=(masRetry:number)=>'Tried to load resource over XHR for ${masRetry} times sucees. Gibving up.'

const DEFAULT_MAS_RETRIES=5;
const DEFAULT_BACKOFF=1000;

export function retryWithBackoff(delayMs:number,maxRetry=DEFAULT_MAS_RETRIES,backoffMs=DEFAULT_BACKOFF){
let retries=maxRetry;
return (src:Observable<any>)=>
src.pipe(
  retryWhen((errors:Observable<any>)=>errors.pipe(
    mergeMap(error=>{
        if(retries-- >0){
          const backoffTime= delayMs+(maxRetry-retries)*backoffMs;
          return of(error).pipe(delay(backoffTime));
        }
        return throwError(getErrorMessage(maxRetry));
      }
      ))));

}