import { Component, ElementRef, ViewChild, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { saveAs } from "file-saver/FileSaver";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/Rx";
@Component({
  selector: 'app-gestion-archivos',
  templateUrl: './gestion-archivos.component.html',
  styleUrls: ['./gestion-archivos.component.css']
})
export class GestionArchivosComponent {

  form: FormGroup;
  loading: boolean = false;

  lstArchivos: any;
  lstArchivosValue = "";
  archivo: any;
  fileUrl: any;

  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(private fb: FormBuilder, public http: HttpClient) {
    this.DatosFormulario();
    this.BuscarArchivos();
  }

  DatosFormulario() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      archivo_: null
    });
  }

  CodificarArchivo(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get("archivo_").setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(",")[1]
        });
      };
    }
  }

  GuardarArchivo() {
    const formModel = this.form.value;
    this.loading = true;
    console.log(formModel);
    const req = this.http
      .post("http://localhost:3000/ArchivoGuardar", formModel.archivo_)
      .subscribe(
        res => {
          console.log(res);
          this.loading = false;
          this.BuscarArchivos();
        },
        err => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  LimpiarArchivo() {
    this.form.get("archivo_").setValue(null);
    this.fileInput.nativeElement.value = "";
  }

  BuscarArchivos() {
    this.http.get("http://localhost:3000/ArchivoListar").subscribe(
      data => {
        this.lstArchivos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  BuscarArchivoPorCodigo(id) {
    this.http
      .get("http://localhost:3000/ArchivoListarCodigo?id=" + id + "")
      .subscribe(
        data => {
          this.archivo = data[0].nombre;
          this.downloadFile(
            data[0].nombre,
            data[0].tipoArchivo,
            data[0].archivo
          );
        },
        err => {
          console.log(err);
        }
      );
  }

  descargarArchivo() {
    console.log(this.lstArchivosValue);
    this.BuscarArchivoPorCodigo(this.lstArchivosValue);
  }

  downloadFile(nombre, tipo, archivo) {


    var archivoDecodificado = atob(archivo);

    var blob = new Blob([archivoDecodificado], { type: "" + tipo + "" });
    var url = window.URL.createObjectURL(blob);
    saveAs(blob, ''+nombre+'');

  }
}
