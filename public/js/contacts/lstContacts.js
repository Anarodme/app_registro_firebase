
			var db = firebase.apps[0].firestore();

			const tabla = document.querySelector('#tabla');			

			db.collection("datosContacto").orderBy('nombre', 'asc').get().then(function(query){
				tabla.innerHTML="";
				var salida = "";
				query.forEach(function(doc){
					salida += '<div class="tabla">'
                    salida += '<table border="2" cellpadding=10 cellspacing=0><tr>'
                    salida += '<td rowspan=5><img class="imagen" src="'+doc.data().foto+'" alt=""></td></tr><tr>'
                    salida += '<td>'+doc.data().nombre+'</td></tr>'
                    salida += '<tr><td>'+doc.data().descripcion +'</td></tr>'
                    salida += '<tr><td>'+doc.data().email+'</td></tr>'
                    salida += '<tr><td>'+doc.data().telefono+'</td></tr></table>'
                    salida += '<br>'
                    salida += '<a class="btn btn-primary" href="modificar.html?id='+doc.id+'">Modificar</a>'
                    salida += ' '
                    salida += '<a class="btn btn-warning" type="button" href="borrar.html?id='+doc.id+'" ">Borrar</a>'
                    salida += '</div>';
				})
				tabla.innerHTML = salida;

			})


			