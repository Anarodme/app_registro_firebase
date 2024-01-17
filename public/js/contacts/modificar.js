var db = firebase.apps[0].firestore();
const editar = document.querySelector("#modificar");

const urlSearchParams = new URLSearchParams(window.location.search);
var id = urlSearchParams.get("id");


db.collection("datosContacto").doc(id).get().then(function (doc) {
    editar.innerHTML="";
    var sali = "";
    sali+= '<form class="formu">'
    sali += '<label for="nombre">Nombre del contacto:</label>';
    sali += '<input type="text" id="txtNombre" name="txtNombre" value="'+doc.data().nombre+'">';
    sali += '<br>';
    sali += '<label for="descripcion">Descripción:</label>';
    sali += '<input type="text" id="txtDescripcion" name="txtDescripcion" value="'+doc.data().descripcion+'">';
    sali += '<br>';
    sali += '<label for="email">Correo Electrónico:</label>';
    sali += '<input type="text" id="txtEmail" name="txtEmail" value="'+doc.data().email+'">';
    sali += '<br>';
    sali += '<label for="telefono">Teléfono Celular:</label>';
    sali += '<input type="text" id="txtTelefono" name="txtTelefono" value="'+doc.data().telefono+'">';
    sali += '<br>';
    sali += '<label for="foto">Foto de Perfil:</label>';
    sali += '<input type="file" id="txtFoto" name="txtFoto" value="'+doc.data().foto+'">';
    sali += '<br>';
    sali += '<input type="button" id="actualizar" onclick="actualizarContacto(event, \'' + id + '\')" name="actualizar" value="Actualizar">';
    sali += '</form>';
    editar.innerHTML= sali;
  
});

function actualizarContacto(event, id) {
  event.preventDefault();
  var nombre = document.getElementById('txtNombre').value;
  var descripcion = document.getElementById('txtDescripcion').value;
  var email = document.getElementById('txtEmail').value;
  var telefono = document.getElementById('txtTelefono').value;
 

  const container = firebase.apps[0].storage().ref();
  const archivo = document.getElementById('txtFoto').files[0];
  const nomarch = archivo.name;
  
  if (archivo == null) {
    alert('Debe seleccionar una imagen');
  } else {
    const metadata = {
      contentType: archivo.type
    }
    
    const subir = container.child('contactos/'+nomarch).put(archivo, metadata);
    subir
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then( foto =>{
db.collection("datosContacto").doc(id).update({
  nombre:nombre,
  descripcion: descripcion,
  email: email,
  telefono: telefono,
  foto: foto
})
.then(function() {
  alert("Documento actualizado correctamente");   
})
.catch(function(error) {
  alert("Error al actualizar")
});
});
}
}


