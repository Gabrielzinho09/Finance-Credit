import bcrypt from 'bcrypt'

//hasheamos la password al campo password le decimos que nos encripte la contraseña por seguridad
export const hashPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt) 
}