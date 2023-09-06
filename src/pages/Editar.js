import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../assets/general.css";
import "admin-lte/dist/css/adminlte.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import withRouter from "./includes/withRouter";
import { Link } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from "primereact/button";

const baseUrl = "http://127.0.0.1:8000/api/";
const MySwal = withReactContent(Swal);
export default withRouter(
  class componentName extends Component {
    state = {
      data: [],
      form: {
        id: "",
        nombre: "",
        direccion: "",
        ciudad: "",
        nit: "",
        habitaciones: "",
      },
      acomodaciones: [],
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
    peticionPost = () => {
      axios
        .put(baseUrl + "hotel/" + this.state.form.id, this.state.form)
        .then((response) => {
          console.log(response.data);
          MySwal.fire({
            title: <strong>Hotel actualizado!</strong>,
            html: <i>Registro actualizado!</i>,
            icon: "success",
          }).then((result) => {
            window.location.href = "/";
          });
        })
        .catch((error) => {
          console.log(error.message);
          MySwal.fire({
            title: <strong>Registro no actualizado!</strong>,
            html: (
              <i>
                El nombre del hotel ya esxiste en la base de datos, verfique e
                intentelo nuevamente.!
              </i>
            ),
            icon: "error",
          });
        });
    };
    componentDidMount() {
      console.log(this.props.router.params.id);
      axios
        .get(baseUrl + "hotel/" + this.props.router.params.id + "/editar")
        .then((res) => {
          //Storing users detail in state array object
          console.log(res.data.hotel);
          this.setState({
            form: {
              id: res.data.hotel.id,
              nombre: res.data.hotel.nombre,
              direccion: res.data.hotel.direccion,
              ciudad: res.data.hotel.ciudad,
              nit: res.data.hotel.nit,
              habitaciones: res.data.hotel.habitaciones,
            },
            acomodaciones: res.data.hotel.acomodacion,
          });
          console.log("acomodacion= " + res.data.hotel.acomodacion);
        });
        this.get_hotel();
      
    }
    get_hotel() {
      axios
        .get(baseUrl + "hotel/" + this.props.router.params.id + "/editar")
        .then((res) => {
          //Storing users detail in state array object
          console.log(res.data.hotel);
          this.setState({
            acomodaciones: res.data.hotel.acomodacion,
          });
          console.log(this.state.acomodaciones);
        });
    }
    render() {
      return (
        <div className="container-fluid">
          <PrimeReactProvider>
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
                      Editor de registro de Hoteles {this.state.form.nombre}
                      </h3>
                    </div>
                    <div className="col-12 col-md-6 pb-4 pb-md-0 text-md-end">
                      <Link
                        to={'/'}
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
                      <div className="col-12 col-md-5">
                        <div className="form-group">
                          <label className="control-label requerido">
                            Nombre del Hotel
                          </label>
                          <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="form-control form-control-sm"
                            required
                            onChange={this.handleChange}
                            value={this.state.form.nombre}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-7">
                        <div className="form-group">
                          <label className="control-label requerido">
                            Dirección
                          </label>
                          <input
                            type="text"
                            name="direccion"
                            id="direccion"
                            className="form-control form-control-sm"
                            required
                            onChange={this.handleChange}
                            value={this.state.form.direccion}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-5">
                        <div className="form-group">
                          <label className="control-label requerido">
                            Ciudad
                          </label>
                          <input
                            type="text"
                            name="ciudad"
                            id="ciudad"
                            className="form-control form-control-sm"
                            required
                            onChange={this.handleChange}
                            value={this.state.form.ciudad}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-3">
                        <div className="form-group">
                          <label className="control-label requerido">
                            NIT del Hotel
                          </label>
                          <input
                            type="text"
                            name="nit"
                            id="nit"
                            className="form-control form-control-sm"
                            required
                            onChange={this.handleChange}
                            value={this.state.form.nit}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-3">
                        <div className="form-group">
                          <label className="control-label requerido">
                            Cant de Habitaciones
                          </label>
                          <input
                            type="number"
                            name="habitaciones"
                            id="habitaciones"
                            className="form-control form-control-sm"
                            min={0}
                            required
                            onChange={this.handleChange}
                            value={this.state.form.habitaciones}
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
                    <div className="row">
                      <div className="col-12 text-center mb-4 d-flex justify-content-between">
                        <h4>Acomodacion del Hotel</h4>
                        <Link to={`/acomodacion_new/${this.state.form.id}`}>
                          <Button
                            label="Agregar acomodación"
                            icon="pi pi-plus-circle"
                            size="small"
                            severity="success"
                            style={{
                              boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
                            }}
                          />
                        </Link>
                      </div>
                      <div className="col-12 d-flex justify-content-center table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tipo de Habitación</th>
                            <th scope="col">Acomodación</th>
                            <th scope="col">Cantidad</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.acomodaciones?.map((item) => (
                            <tr>
                                <td key={item}>{item.id}</td>
                                <td key={item}>{item.tipo}</td>
                                <td key={item}>{item.acomodacion}</td>
                                <td key={item}>{item.cantidad}</td>
                              </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PrimeReactProvider>
        </div>
      );
    }
  }
);
