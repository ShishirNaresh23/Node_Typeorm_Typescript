import express, { Router } from 'express';
import { PostController } from '../controller/posts.controller';

export class PostRouter{
    public postRout: express.Router;
    private postController : PostController;
    
    constructor(){
        this.postRout = Router();
        this.postController = new PostController();
        this.routes();
    }

    public routes(){
        this.postRout.get('/', this.postController.index);
        this.postRout.post('/', this.postController.create);
        this.postRout.delete('/', this.postController.delete);
        this.postRout.put('/', this.postController.update);
        this.postRout.get('/findone', this.postController.findone);
    
    }
    
}