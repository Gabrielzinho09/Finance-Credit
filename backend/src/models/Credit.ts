import {
   Table,
   Model,
   Column,
   DataType,
   HasMany,
   BelongsTo,
   ForeignKey,
} from 'sequelize-typescript';

//es un decorador : envuelve una funcion y añade caracteristicas 
// sin necesidad de modificar su funcion principal
//Credit O sistema de credito
@Table({
   tableName: 'credits'
})

class Credit extends Model {
   //esto es sequelize definimos el tipo de dato y deben coincidir con el tipo de dato
   @Column({
      type: DataType.STRING(100)
   })
   //esto es typescript
   declare name: string
   @Column({
      type: DataType.DECIMAL
   })
   //esto es typescript
   declare amount: number
}

export default Credit