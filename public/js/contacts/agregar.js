
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const nombre = document.querySelector('#txtNombre');
const descripcion = document.querySelector('#txtDescripcion');
const email = document.querySelector('#txtEmail');
const telefono = document.querySelector('#txtTelefono');
const txtArchi = document.querySelector('#txtFoto');
const btnLoad  = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function(){
    const archivo = txtArchi.files[0];
    const nomarch = archivo.name;
    if(archivo == null){
        alert('Debe seleccionar una imagen de perfil');
    }else{
        const metadata = {
            contentType : archivo.type
        }
        const subir = container.child('contactos/'+nomarch).put(archivo, metadata);
        subir
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then( foto =>{
                db.collection("datosContacto").add({
                    "nombre" : nombre.value,
                    "descripcion" : descripcion.value,
                    "email" : email.value,
                    "telefono" : telefono.value,
                    "foto"   : foto
                }).then(function(docRef) {
                    alert("ID del registro: " + docRef.id);
                    limpiar();
                }).catch(function(FirebaseError) {
                    alert("Error al subir la imagen: " + FirebaseError);
                });
            });
    }
});

function limpiar(){
    nombre.value = ''
    descripcion.value = '';
    email.value = '';
    telefono.value = '';
    txtArchi.value = '';
    nombre.focus();
}

