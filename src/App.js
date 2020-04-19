import React, {useState, useEffect, Fragment} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //State de la App
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;

      const imagenesPorPagina = 32;
      const key = '16101280-5cae1a440d7e5d41589fe9482';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //Calcular el total de páginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //Mover Pantalla hacía el inicio de la página
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultarAPI();
  }, [busqueda, paginaactual])

  //Definir la página anterior
  const paginaAnterior = () => {

    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);

  }
  //Definir la página siguiente
  const paginaSiguiente = () => {

    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);

  }

    return ( 
    <Fragment>
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <ListadoImagenes 
            imagenes={imagenes}
          />
          {(paginaactual === 1) ? null : (
            <button
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
          >&laquo; Anterior</button>
          )}
          {(paginaactual === totalpaginas) ? null : (
            <button
              type="button"
              className="bbtn btn-info"
              onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
          )}
        </div>
      </div>
      <div className="container">
      <div className="row">
        {(busqueda === "") ? null : (
              <footer className="footer">
                <div className="footer-copyright text-center py-3"> © 2020 Para ver más imagenes visita
                  <a href="https://pixabay.com/es/"> Pixabay</a>
                </div>
            </footer>
          )}
        </div>
      </div>
  </Fragment>
    );
}

export default App;