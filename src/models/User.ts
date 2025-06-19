import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull } from 'sequelize-typescript'
import Credit from './Credit'


@Table({
    tableName: 'users'
})

class User extends Model {
    //no permite nulos
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare name: string
    //-------------------------------------------------------/
    //no permite nulos
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string
    //-------------------------------------------------------/
    //no permite nulos
    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(50)
    })
    declare email: string
    //-------------------------------------------------------/
    @Column({
        type: DataType.STRING(6)
    })
    declare token: string
    @Default(false)
    //-------------------------------------------------------/
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: string
    //-------------------------------------------------------/
    //referenciamos a la tabla de creditos -  credit
    //define una relacion uno a muchos un usuario puede tener varios creditos
    //definimos una relacion de uno a muchos la cual apunta a la tabla hija padre=user , hija= creditos
    @HasMany(() => Credit, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare credits: Credit[]
}

export default User