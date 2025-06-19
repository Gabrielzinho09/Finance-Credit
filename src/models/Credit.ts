import {
   Table,
   Model,
   Column,
   DataType,
   HasMany,
   BelongsTo,
   ForeignKey,
   AllowNull
} from 'sequelize-typescript';
import Payment from './Payment';
import User from './User';

//es un decorador : envuelve una funcion y añade caracteristicas 
// sin necesidad de modificar su funcion principal
//Credit O sistema de credito
@Table({
   tableName: 'credits'
})

class Credit extends Model {
   //esto es sequelize definimos el tipo de dato y deben coincidir con el tipo de dato
   //no permite nulos
   @AllowNull(false)
   @Column({
      type: DataType.STRING(100)
   })
   //esto es typescript
   declare name: string
   //-------------------------------------------------------/
   //no permite nulos
   @AllowNull(false)
   @Column({
      type: DataType.DECIMAL
   })
   //esto es typescript
   declare amount: number
   //-------------------------------------------------------------/
   //no permite nulos
   @AllowNull(false)
   @Column({
      type: DataType.STRING(250)
   })
   //esto es typescript
   declare comment: string
   //-------------------------------------------------------------/
   //no permite nulos
   @AllowNull(false)
   @Column({
      type: DataType.INTEGER
   })
   //esto es typescript
   declare item: number
   //--------------------------------------------------------------------/
   @Column({
      type: DataType.STRING(100)
   })
   //esto es typescript
   declare phone: string
   //referenciamos a la tabla de abonos o pagos -  payment
   //define una relacion uno a muchos un credito puede tener varios abonos
   @HasMany(() => Payment, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
   })
   declare payments: Payment[]

   //-------------------------------------------------------------------------------------
   //clave externa
   //asociamos una fk con el id de la tabla Padre=Users como referencia para relacionarlas 
   @ForeignKey(() => User)
   declare userId: number

   //pertenece a = usuarios
   //de forma inversa hacemos la relacion indicando que un credito pertenece a un solo usuario 
   //funciona a nivel de registros no a nivel de tablas 
   @BelongsTo(() => User)
   declare user: User
}

export default Credit