import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./../assets/general.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
//Constantes
const baseUrl = "http://127.0.0.1:8000/api/";
//---------------------------------------------
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    //Get all users details in bootstrap table
    axios.get(baseUrl + "hoteles").then((res) => {
      //Storing users detail in state array object
      this.setState({ data: res.data.hoteles });
      console.log(res.data.hoteles);
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="card m-5 btn-sombra pb-5" style={{
                boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
                border: "1px solid black",
              }}>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <h3>Listado de hoteles</h3>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center table-responsive">
              <table className="table table-striped table-hover table-sm">
                <thead>
                  <tr>
                    <th scope="col">Codigo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Ciudad</th>
                    <th scope="col">NIT</th>
                    <th scope="col">Cant. habitaciones</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((result) => {
                    return (
                      <tr>
                        <td>{result.id}</td>
                        <td>{result.nombre}</td>
                        <td>{result.direccion}</td>
                        <td>{result.ciudad}</td>
                        <td>{result.nit}</td>
                        <td>{result.habitaciones}</td>
                        <td>
                        <Link to={`/editar/${result.id}`} class="btn-accion-tabla tooltipsC" title="Editar este registro">  <FontAwesomeIcon className="ml-4" icon={faPenSquare} /> </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div className="row mt-4">
            <div className="col-12 text-center">
              <Link to={"/nuevo"} className="btn btn-info btn-sm btn-sombra pl-5 pr-5 text-white" style={{ boxShadow:'10px 10px 5px 0px rgba(0,0,0,0.75)' }}>
                Nuevo Hotel{" "}
                <FontAwesomeIcon className="ml-4" icon={faCloudArrowUp} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
