import React, { Component} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import withRouter from './../pages/includes/withRouter';
import Loading from "./../assets/loading.gif";


const MySwal = withReactContent(Swal)
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

const baseUrl = "http://127.0.0.1:8000/api/";
export default withRouter( class componentName extends Component {
  componentDidMount() {
    console.log(this.props.router.params.id_rol);
    swalWithBootstrapButtons.fire({
        title: 'Esta seguro?',
        text: "Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si Borrar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(baseUrl + "acomodacionh/"+ this.props.router.params.id).then((res) => {
                //Storing users detail in state array object
                console.log(res.data);
                if (res.data.mensaje==='ok') {
                    MySwal.fire({
                        title: <strong>Registro Eliminado!</strong>,
                        html: <i>Registro Eliminado!</i>,
                        icon: 'success'
                      })
                } else {
                    MySwal.fire({
                        title: <strong>Registro no eliminado!</strong>,
                        html: <i>Verifica!</i>,
                        icon: 'error'
                      })
                }
                window.location.href = "/acomodacion_new/" + this.props.router.params.id_h;
                        
              });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El registro no se elimino :)',
            'error'
          )
          window.location.href = "/acomodacion_new/" + this.props.router.params.id_h;
        }
      })


    
  }
  render() {
    return (
      <div>
        <div className="row">
        <div className="col-12 d-flex justify-content-center">
                    <img
                      className="img-fluid"
                      src={Loading}
                      style={{ width: "50%" }}
                      alt=""
                    />
                  </div>
        </div>
      </div>
    );
  }
}
)