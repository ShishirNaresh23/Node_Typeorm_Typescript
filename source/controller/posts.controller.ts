import { Request, Response } from 'express';
import { PostEntity } from '../model/post';
import { PostService } from '../service/post.service';


export class PostController{

    private postService : PostService;

    constructor(){
        this.postService = new PostService();
    }

    public index = async(req: Request, res:Response)=>{
        //"This request is for finding all the posts exist."
        const userId = req.query['userId'] as string;

        res.send(await this.postService.index(userId));
    }

    public create = async(req: Request, res:Response)=>{
        //"This request is for creating a posts."
        const post : PostEntity = req.body as PostEntity;

        res.send(await this.postService.create(post));
    }

    public update = async(req: Request, res:Response)=>{
        //"This request is for updating a posts that exist."
        const post : PostEntity = req.body as PostEntity;
        const body = req.params['body'];
        const title = req.params['title'];

        res.send(await this.postService.update(post, body, title));
    }

    public delete = async(req: Request, res:Response)=>{
        //"This request is for deleting a posts exist."
        const userId = req.query['userId'] as String;
        const body = req.query['body'] as String;
        const title = req.query['title'] as String;
  
        const post : PostEntity = new PostEntity(userId, title, body);

        res.send(await this.postService.delete(post));
    }

    public findone = async(req: Request, res:Response)=>{
        //"This request is for finding a particular posts."
        const body = req.query['body'] as String;
        const title = req.query['title'] as String;

        res.send(await this.postService.findone(body, title));
    }
}
