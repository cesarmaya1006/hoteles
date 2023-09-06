import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../assets/general.css";
import "admin-lte/dist/css/adminlte.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const baseUrl = "http://127.0.0.1:8000/api/";
const MySwal = withReactContent(Swal);
export default class componentName extends Component {
  state = {
    data: [],
    form: {
      nombre: "",
      direccion: "",
      ciudad: "",
      nit: "",
      habitaciones: "",
    },
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
      .post(baseUrl + "hotel", this.state.form)
      .then((response) => {
        console.log(response.data);
        MySwal.fire({
          title: <strong>Hotel inscrito!</strong>,
          html: <i>Registro de hotel realizado!</i>,
          icon: "success",
        }).then((result) => {
          window.location.href = "./";
        });
      })
      .catch((error) => {
        console.log(error.message);
        MySwal.fire({
          title: <strong>Hotel Duplicado!</strong>,
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
                <h3 className="card-title">Registro de Hoteles</h3>
                <div className="card-tools"></div>
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
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-5">
                    <div className="form-group">
                      <label className="control-label requerido">Ciudad</label>
                      <input
                        type="text"
                        name="ciudad"
                        id="ciudad"
                        className="form-control form-control-sm"
                        required
                        onChange={this.handleChange}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
