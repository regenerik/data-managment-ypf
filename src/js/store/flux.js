const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			personas: ["Pedro","Maria"],
            userName: "",
            token:"",
            wrongPass: false
		},
		actions: {

			exampleFunction: () => {
                    console.log("hola")
                    return
			},
            login: async(info) => {
                try{
                    let response = await fetch("https://dm-ypf.onrender.com/token", {
                        method:'POST',
                        body: JSON.stringify(info),
                        headers:{
                            'Content-Type': 'application/json'
                            }
                    })

                    const data = await response.json()

                    if(!data.ok){
                        throw new Error("La pifiaste con las credenciales")
                    }
                    const store = getStore()
                    setStore({...store, userName: data.name, token: data.access_token})

                }catch(e){
                    console.error(e)
                }
                
            },
            wrongPass: (booleano) => {
                const store = getStore()
                setStore({...store, wrongPass: booleano})
            },
            button1: async () => {
                try{
                    let response = await fetch('https://dm-ypf.onrender.com/')
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data)
                    // DEPENDE DE LO QUE TRAIGA EL BOTON NAVEGAR A OTRO LADO, HACER UNA DESCARGA O ENVIAR POR EMAIL

                }catch(e){
                    console.error(e)
                }
            },
            logout: () => {
                const store = getStore()
                setStore({...store,token:""})
            }
		}
	};
};

export default getState;