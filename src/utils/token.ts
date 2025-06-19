export const generateToken = () => {
    //generamos un codigo random de numeros para que el usuario pueda iniciar sesion posterior a esto se lo enviamos por email
    //esto lo registramos en la base de datos
    return Math.floor(100000 + Math.random() * 900000).toString()
}   