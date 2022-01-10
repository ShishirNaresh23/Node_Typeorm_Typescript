import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity('post')
export class PostEntity{

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    userId: String;

    @Column()
    title: String;

    @Column()
    body: String;

    constructor(userId: String, title: String, body: String, id?: Number){
        if (id) { this.id = id;}
        this.userId = userId;
        this.title = title;
        this.body = body;
    }
    
}