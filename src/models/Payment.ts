import { Table, Column, Model, DataType, ForeignKey, BelongsTo,AllowNull } from 'sequelize-typescript'
import Credit from './Credit'

@Table({
    tableName: 'payments'
})
//autoincrement se hereda de extends model
class Payment extends Model {
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
    //-------------------------------------------------------------
    //clave externa
    @ForeignKey(() => Credit)
    declare creditId: number

    //´tabla abonos o payment  pertenece a tabla creditos
    //Esto indica que cada Payment pertenece a un único Credit.

    @BelongsTo(() => Credit)
    declare credit: Credit
}

export default Payment;