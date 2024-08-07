import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiariosService {
  private baseUrl = 'http://localhost/API-GRAFICA';
  constructor(private http:HttpClient) { }


  public listar(url:string):Observable<any[]>{
    return this.http.get<any[]>(url);
  }


  public agregar(url:string,notas:any)
  {
  return this.http.post(url,notas);
  }



  public editar(url: string, id: number, notas: any): Observable<any> {
    return this.http.post<any>(`${url}?id=${id}`, notas);
  }

  public eliminar(url: string, id: number): Observable<any> {
    return this.http.delete<any>(`${url}?id=${id}`);
  }
}
