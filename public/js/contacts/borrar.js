var db = firebase.apps[0].firestore();
const editar = document.querySelector("#borrar");

const urlSearchParams = new URLSearchParams(window.location.search);
var id = urlSearchParams.get("id");
      
    db.collection("datosContacto").doc(id).delete({
      })
      .then(function() {
        alert("Documento eliminado correctamente");   
      })
      .catch(function(error) {
        alert("Error al actualizar")
      });

			

