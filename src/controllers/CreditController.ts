//importamos tipo req,res para que el tipo de dato sea reconocido caso contrario queda como any
import type { Request, Response } from 'express'
import Credit from '../models/Credit'
import { Op } from 'sequelize';
import Payment from '../models/Payment';



//el controlador será una clase 
export class CreditController {
  //el metodo estatico no requiere instanciar la clase 
  //obtener los creditos
  static getAll = async (req: Request, res: Response) => {
    try {
      //OBTENER LOS CREDITOS
      const credits = await Credit.findAll({
        //ORDENAR POR FECHA DE CREACION
        order: [
          ['createdAt', 'DESC']
        ]
        //TODO:FILTRAR POR EL USUARIO AUTENTICADO
      })
      res.json(credits)
    } catch (error) {
      //console.log(error)
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
//crear creditos
  static create = async (req: Request, res: Response) => {
    try {
      //console.log(req.body)
      //pasamos el modelo
      const credit = new Credit(req.body)
      await credit.save()
      res.status(201).json('Credito creado con exito')

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
  //obtener credito por id y sus payments asociados
  //busco el credito por el id , obtengo el id y incluyo sus pagos asociados
  //en el middleware anterior valida que el credito existe y tenga un id 
  static getCreditById = async (req: Request, res: Response) => {
    const credit = await Credit.findByPk(req.credit.id,{
      include: [Payment]
    })
    res.json(credit)
  }

  //actualizar credito por el ID
  static updateCreditById = async (req: Request, res: Response) => {
    await req.credit.update(req.body)
      res.json('Credito actualizado correctamente')

  }
  //eliminar credito por id
  static deleteCreditById = async (req: Request, res: Response) => {
    await req.credit.destroy()
    res.json('Credito eliminado correctamente')
  }
  //buscar credito por parametros
  static searchCredits = async (req: Request, res: Response) => {
    //consulta tipo query desde la ruta
    const { query } = req.query;

    try {
      if (!query) {
        //return
        res.status(400).json({ error: 'Falta el parámetro de búsqueda' });
        //con return abajo me aseguro que termine la ejecucion y no me envie una doble respuesta
        return
      }

      const credits = await Credit.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } }, // busca por nombre, insensible a mayúsculas
            //{ amount: isNaN(Number(query)) ? undefined : Number(query) } // busca por monto exacto si es número
          ]
        },
        order: [['createdAt', 'DESC']],
      });

      res.json(credits);
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al buscar créditos' });
      console.log(error)
    }
  };
}