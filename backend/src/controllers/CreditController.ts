//importamos tipo req,res para que el tipo de dato sea reconocido caso contrario queda como any
import type {Request,Response} from 'express'
import Credit from '../models/Credit'


//el controlador será una clase 
export class CreditController{
    //el metodo estatico no requiere instanciar la clase 
    static getAll = async(req: Request,res:Response)=>{
        try {
            //OBTENER LOS CREDITOS
            const credits = await Credit.findAll({
                //ORDENAR POR FECHA DE CREACION
                order:[
                    ['createdAt','DESC']
                ]
                //FILTRAR POR EL USUARIO AUTENTICADO
            })
            res.json(credits)
        } catch (error) {
            //console.log(error)
            res.status(500).json({error:'Hubo un error'})
        }
    }
    static create = async(req: Request,res:Response)=>{
        try {
            //console.log(req.body)
            //pasamos el modelo
            const credit = new Credit(req.body)
            await credit.save()
            res.status(201).json('Credito creado con exito')
            
        } catch (error) {
            //console.log(error)
            res.status(500).json({error:'Hubo un error'})
        }
    }
    static getCreditById = async(req: Request,res:Response)=>{
        console.log('desde GET ID')
    }
    static updateCreditById = async(req: Request,res:Response)=>{
        console.log('update desde GET ID')
    }
    static deleteCreditById = async(req: Request,res:Response)=>{
        console.log('delete desde GET ID')
    }
}