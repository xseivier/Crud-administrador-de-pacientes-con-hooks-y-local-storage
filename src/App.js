import React, {useState, useEffect, Fragment} from 'react';

const stateInitial = {
  mascota : '',
  propietario: '',
  fecha: '',
  hora: '',
  sintomas: ''
}

const Cita = ({cita, index, handleDelete}) => {

 

  console.log('cita', cita)
  return(
    <div className="cita">
      <p>Mascota :<span>{cita.mascota}</span></p>
      <p>Propietario :<span>{cita.propietario}</span></p>
      <p>Fecha :<span>{cita.fecha}</span></p>
      <p>Hora :<span>{cita.hora}</span></p>
      <p>Sintomas :<span>{cita.sintomas}</span></p>

      <button 
      onClick={() => handleDelete(index)}
      type='button' className='button eliminar u-full-width' > Eliminar X</button>
    </div>
  )
}

const Formulario = ({crearCita}) => {

  const [cita, setcita] = useState(stateInitial)

  const updateCita = e => {
    setcita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
     e.preventDefault()

     //pasar la cita hacia el componente principal

     crearCita(cita)
      
     //reiniciar el state(form)
     setcita(
      stateInitial
     )
  }



  return(

    <Fragment>
      <h2>Crear Cita</h2>
      <form onSubmit={handleSubmit}>
      <label>Nombre Mascota</label>
      <input
      type="text"
      name="mascota"
      className="u-full-width"
      placeholder="Nombre Mascota"
      onChange={updateCita}
      value={cita.mascota}
      />

      <label>Nombre Dueño</label>
      <input
      type="text"
      name="propietario"
      className="u-full-width"
      placeholder="Nombre Dueño de la Mascota"
      onChange={updateCita}
      value={cita.propietario}
      />

      <label>Fecha</label>
      <input
      type="date"
      className="u-full-width"
      name="fecha"
      onChange={updateCita}
      value={cita.fecha}
      />

      <label>Hora</label>
      <input
      type="time"
      className="u-full-width"
      name="hora"
      onChange={updateCita}
      value={cita.hora}
      />

      <label>Sintomas</label>
      <textarea
      className="u-full-width"
      name="sintomas"
      onChange={updateCita}
      value={cita.sintomas}
      ></textarea>

      <button type="submit" className="button-primary u-full-width">Agregar</button>

      </form>
    </Fragment>
  )

}

const App = () => {
   
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))

  if(!citasIniciales){
    citasIniciales = []
  }
  
 
  const [citas, setcitas] = useState(citasIniciales)

  console.log('citas', citas)

  const crearCita = cita => {
    const nuevasCitas = [...citas, cita ]

    setcitas(nuevasCitas)
  }

  const handleDelete = (index) => {
    const nuevasCitas = [...citas]
    nuevasCitas.splice(index, 1)
    setcitas(nuevasCitas)
  }

  useEffect(() => {
   let citasIniciales = JSON.parse(localStorage.getItem('citas'))

   if(citasIniciales){
     localStorage.setItem('citas', JSON.stringify(citas))
   } else {
    localStorage.setItem('citas', JSON.stringify([]))
   }

  }, [citas])

  const titulo = Object.keys(citas).length === 0 ? 'No hay Citas' : 'Administra Las Citas'

  return (
   <React.Fragment >
    <h1>
      Administrador de Paciente
    </h1>
    <div className="container">
      <div className="row">
        <div className="one-half column">
            <Formulario crearCita={crearCita } />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map((cita, i) => {
           return <Cita 
             key={i}
             i={i}
             cita={cita} 
             handleDelete={handleDelete}
             />
          })}
        </div>
      </div>
    </div>
    </React.Fragment> 
  );
};

export default App;