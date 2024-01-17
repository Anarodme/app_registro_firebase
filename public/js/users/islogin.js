// JavaScript Document
			// validate that user is log-in
			var auth = firebase.apps[0].auth();

			function validar() {
				var uid = -1
				//const user = auth.currentUser;
				auth.onAuthStateChanged((user) => {
					if (user) {
						uid = user.uid;
						startTimeout()
					} else {
						document.location.href = 'login.html';
					}
				});
				return uid;
			}

			// close current session
			function salir(){
				auth.signOut().then(() => {
					document.location.href ='login.html';
				}).catch((error)=>{
				   alert('Error al cerrar la sesión: ' + error.message);
				});
			}

			var timeout;

			function startTimeout() {
			clearTimeout(timeout);

			timeout = setTimeout(function() {
				salir();
			}, 3 * 60 * 1000); 
			}

			document.addEventListener('mousemove', startTimeout);
			document.addEventListener('keydown', startTimeout);

			