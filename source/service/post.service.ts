import { getConnection, getRepository } from "typeorm";
import { PostEntity } from "../model/post";
import { PostRepository } from "../repository/post.repository";
import { ServiceUtil } from "../util/service.util";

export class PostService{
    private postRepository : PostRepository;
    private util : ServiceUtil;

    constructor(){
        this.postRepository = getConnection('post_db').getCustomRepository(PostRepository);
        this.util = new ServiceUtil();
    }

    public index = async(userId: string) => {
        const posts = await this.postRepository.find({
            'where':{
                'userId': userId
            }
        });
        return this.util.response(
            `All posts avaliable for user with userId : ${userId}`,
            true,
            posts
        )
    }


    public create = async(postbody : PostEntity) => {
        try{
            const createPost = await this.postRepository.save(postbody);
            console.log("Create post done : ", createPost);
        }
        catch(error){
            console.error("Error occured while creating a post : ", error);
            return this.util.response(
                "Error occured while creating a post",
                false,
                error)
        }
        return this.util.response(
            'Response send from Service class.',
            true,
            postbody        
        )
    }


    public delete = async(postbody : PostEntity) => {
        try{
            const findPost = await this.findone( postbody.body, postbody.title);
            console.log(findPost);
            if(findPost.success){
                await this.postRepository.remove({...findPost.data});
                return this.util.response(
                    `Post got updated with title : ${postbody.title} and id : ${postbody.body}`,
                    true)
            }
            else return findPost;
        }
        catch(error){
            console.error(error);
            return this.util.response(
                `Error while updating the Post with title : ${postbody.title} and id : ${postbody.body}`,
                false
            )
        }
    }


    public update = async(postbody: PostEntity, body: String, title: String) => {
        try{
            const findPost = await this.findone( postbody.body, postbody.title);
            if(findPost.success){

                findPost.data.body = body;
                findPost.data.title = title;

                await this.postRepository.createQueryBuilder()
                                        .update(PostEntity)
                                        .set({ body: body, title: title })
                                        .where("id = :id", { id: postbody.id })
                                        .execute();

                return this.util.response(
                    `Post got deleted with title : ${postbody.title} and id : ${postbody.body}`,
                    true)
            }
            else return findPost;
        }
        catch(error){
            console.error(error);
            return this.util.response(
                `Error while deleting the Post with title : ${postbody.title} and id : ${postbody.body}`,
                false
            )
        }
    }

    public findone= async(body : String, title: String) => {        
    
        try{
            const findPost = await this.postRepository.findOne({
                'where':{
                    body: body,
                    title: title
                }
            });

            console.debug("Post found : ", findPost);

            if (findPost){
                return this.util.response(
                    `Post found with title : ${title} and body : ${body}.`,
                    true,
                    findPost       
                )
            }
            else{
                return this.util.response(
                    `Sorry no post found with title : ${title} and body :${body}.`,
                    false 
                )
            }
        }
        catch(error){
            console.error("Error occured while finding the post a post : ", error);
            return this.util.response(
                "Error occured while finding the post",
                false,
                error
            )
        }

    }
}