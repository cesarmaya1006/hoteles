import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../assets/general.css";
import "admin-lte/dist/css/adminlte.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import withRouter from "./includes/withRouter";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const baseUrl = "http://127.0.0.1:8000/api/";
const MySwal = withReactContent(Swal);

export default withRouter(
  class componentName extends Component {
    state = {
      data: [],
      acomodaciones: [],
      tipos_habitaciones: [],
      tipos_acomodaciones: [],
      hotel: {
        id: "",
        nombre: "",
        direccion: "",
        ciudad: "",
        nit: "",
        habitaciones: "",
      },
      form: {
        hotels_id: this.props.router.params.id,
        cantidad: "",
        tipo: "",
        acomodacion: "",
      },
      tipos: "",
      cantidad_h: "",
    };
    handleChange = async (e) => {
      e.persist();
      await this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      });
      console.log(this.state.form);
    };
    componentDidMount() {
      console.log(this.props.router.params.id);
      this.get_hotel();
      this.get_tipos_habitacion();
      this.get_cantidad();
    }
    get_hotel() {
      axios
        .get(baseUrl + "hotel/" + this.props.router.params.id + "/editar")
        .then((res) => {
          //Storing users detail in state array object
          console.log(res.data.hotel);
          this.setState({
            hotel: {
              id: res.data.hotel.id,
              nombre: res.data.hotel.nombre,
              direccion: res.data.hotel.direccion,
              ciudad: res.data.hotel.ciudad,
              nit: res.data.hotel.nit,
              habitaciones: res.data.hotel.habitaciones,
            },
            acomodaciones: res.data.hotel.acomodacion,
          });
          console.log(this.state.acomodaciones.length);
        });
    }
    get_tipos_habitacion() {
      axios
        .get(baseUrl + "tipos/" + this.props.router.params.id)
        .then((res_tipos) => {
          //Storing users detail in state array object
          console.log("++++++++++++++++++++++++++++++++++++++++");
          console.log(res_tipos.data[0]);
          console.log("++++++++++++++++++++++++++++++++++++++++");
          this.setState({
            tipos_habitaciones: res_tipos.data[0],
          });
        });
    }
    get_tipos_acomodacion() {

      axios
        .get(
          baseUrl +
            "acomodacionh/" +
            this.props.router.params.id +
            "/" +
            this.state.tipos.tipo
        )
        .then((res_tipos) => {
          //Storing users detail in state array object
          console.log("++++++++++++++++++++++++++++++++++++++++");
          console.log(res_tipos.data[0]);
          console.log("++++++++++++++++++++++++++++++++++++++++");
          this.setState({
            tipos_acomodaciones: res_tipos.data[0],
          });
        });
    }
    get_acomodaciones = async (e) => {
      e.persist();
      await this.setState({
        tipos: {
          ...this.state.tipos,
          [e.target.name]: e.target.value,
        },form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      });
      this.get_tipos_acomodacion();
      console.log(this.state.tipos.tipo);
    };
    get_cantidad = async (e) => {
      await axios
        .get(baseUrl + "get_cantidad_f/" + this.props.router.params.id)
        .then((res_tipos) => {
          //Storing users detail in state array object
          console.log("++++++++++++++++++++++++++++++++++++++++");
          console.log(res_tipos.data);
          console.log("++++++++++++++++++++++++++++++++++++++++");
          this.setState({
            cantidad_h: res_tipos.data,
          });
        });
    };
    peticionPost = () => {
      axios
        .post(baseUrl + "acomodacionh/"+this.props.router.params.id, this.state.form)
        .then((response) => {
          console.log(response.data);
          MySwal.fire({
            title: <strong>Acomodación de Hotel inscrita!</strong>,
            html: <i>Registro de acomodación realizada!</i>,
            icon: "success",
          }).then((result) => {
            window.location.reload();
            //window.location.href = "./acomodacion_new/" + this.props.router.params.id;
          });
        })
        .catch((error) => {
          console.log(error.message);
          MySwal.fire({
            title: <strong>No se realizo el registro!</strong>,
            html: (
              <i>
                El registro no se pudo hacer, verfique e
                intentelo nuevamente.!
              </i>
            ),
            icon: "error",
          });
        });
    };
    render() {
      return (
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-10 pt-md-5">
              <div
                className="card"
                style={{
                  boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
                  border: "1px solid black",
                }}
              >
                <div className="card-header">
                  <div className="row">
                    <div className="col-12 col-md-6 pb-4 pb-md-0">
                      <h3 className="card-title">
                        Editor de acomodacion Hotel {this.state.hotel.nombre}
                      </h3>
                    </div>
                    <div className="col-12 col-md-6 pb-4 pb-md-0 text-md-end">
                      <Link
                        to={`/editar/${this.state.hotel.id}`}
                        className="btn btn-success btn-sm btn-sombra pl-5 pr-5 text-white"
                        style={{
                          boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
                        }}
                      >
                        Volver
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row d-flex justify-content-between">
                    <div className="col-12">
                      <h4>Nuevo Registro de Acomodación</h4>
                    </div>
                    <hr />
                    <div className="col-12 col-md-5">
                      <div className="form-group">
                        <label className="control-label requerido">
                          Tipos de Habitación
                        </label>
                        <select
                          className="form-control form-control-sm"
                          name="tipo"
                          id="tipo"
                          onChange={this.get_acomodaciones}
                          required
                        >
                          <option value="">--Seleccione--</option>
                          {this.state.tipos_habitaciones?.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-5">
                      <div className="form-group">
                        <label className="control-label requerido">
                          Tipos de Acomodación
                        </label>
                        <select
                          className="form-control form-control-sm"
                          name="acomodacion"
                          id="acomodacion"
                          onChange={this.handleChange}
                          required
                        >
                          <option value="">--Seleccione--</option>
                          {this.state.tipos_acomodaciones?.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <div className="form-group">
                        <label className="control-label requerido">
                          Cant de Habitaciones
                        </label>
                        <input
                          type="number"
                          name="cantidad"
                          id="cantidad"
                          className="form-control form-control-sm"
                          min="0"
                          max={this.state.cantidad_h}
                          required
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4 mb-5">
                    <div className="col-6 col-md-2">
                      <button
                        className="btn btn-primary btn-sombra btn-xs pl-5 pr-5"
                        onClick={() => this.peticionPost()}
                        style={{
                          boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
                        }}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="row d-flex justify-content-between">
                    <div className="col-12">
                      <h4>Listado derRegistros de Acomodación</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-center table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tipo de Habitación</th>
                            <th scope="col">Acomodación</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.acomodaciones?.map((result) => {
                            return (
                              <tr>
                                <td>{result.id}</td>
                                <td>{result.tipo}</td>
                                <td>{result.acomodacion}</td>
                                <td>{result.cantidad}</td>
                                <td>
                                <Link to={`/acomodacion_delete/${result.id + '/'+this.props.router.params.id}`} class="btn-accion-tabla tooltipsC" title="Editar este registro">  <FontAwesomeIcon className="ml-4" icon={faTrash} /> </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
