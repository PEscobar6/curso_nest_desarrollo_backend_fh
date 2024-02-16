import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false 
    })
    password: string;

    @Column('text', {
        name: 'full_name',
    })
    fullName: string;

    @Column('bool', { 
        default: true,
        name: 'is_active'
    })
    isActive: boolean;

    @Column('text', { 
        array: true,
        default: ['user']
    })
    roles: string[]

    @BeforeInsert()
    @BeforeUpdate()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

}
