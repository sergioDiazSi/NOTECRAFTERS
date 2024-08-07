import { Component, OnInit } from '@angular/core';
import { DiariosService } from 'src/app/servicios/diarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  notas: any[] = [];
  nuevoTitulo = '';
  nuevaDescripcion = '';
  editId: number | null = null;
  editTitulo = '';
  editDescripcion = '';
  notaAEliminarId: number | null = null;

  constructor(private diariosservice: DiariosService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.listarNotas();
  }

  listarNotas() {
    this.diariosservice.listar('http://localhost/API-GRAFICA/listar.php').subscribe((respuesta) => {
      this.notas = respuesta;
    });
  }

  agregarNota() {
    if (!this.nuevoTitulo || !this.nuevaDescripcion) {
      this.toastr.error('La nota no puede estar vacía');
      return;
    }
    this.diariosservice
      .agregar('http://localhost/API-GRAFICA/agregar.php', {
        titulo: this.nuevoTitulo,
        descripcion: this.nuevaDescripcion,
      }).subscribe((respuesta) => {
         this.toastr.success('Nota agregada con éxito');
          this.nuevoTitulo = '';
          this.nuevaDescripcion = '';
          this.listarNotas();
          
        });
        
  }

  editarNota(id: number) {
    this.editId = id;
    const nota = this.notas.find((n) => n.id === id);
    if (nota) {
      this.editTitulo = nota.titulo;
      this.editDescripcion = nota.descripcion;
    }
  }

  cancelarEdicion() {
    this.editId = null;
    this.editTitulo = '';
    this.editDescripcion = '';
  }

  guardarEdicion(id: number) {
    if (!this.editTitulo || !this.editDescripcion) {
      this.toastr.error('La nota no puede estar vacía');
      return;
    }
  
    const nota = {
      id: id,
      titulo: this.editTitulo,
      descripcion: this.editDescripcion
    };
  
    this.diariosservice.editar('http://localhost/API-GRAFICA/editar.php', id, nota).subscribe(
      (respuesta) => {
        this.toastr.success('Nota actualizada con éxito');
        this.editId = null;
        this.editTitulo = '';
        this.editDescripcion = '';
        this.listarNotas();
      }
    );
  }

  confirmarEliminarNota(id: number) {
    this.notaAEliminarId = id;
  }

  cancelarEliminar() {
    this.notaAEliminarId = null;
  }

  eliminarConfirmado() {
    if (this.notaAEliminarId !== null) {
      this.diariosservice.eliminar('http://localhost/API-GRAFICA/eliminar.php', this.notaAEliminarId).subscribe(
        (respuesta) => {
          this.toastr.success('Nota eliminada con éxito');
          this.listarNotas();
          this.notaAEliminarId = null; // Reinicia la variable después de eliminar
        }
      );
    }
  }
}



  
  


