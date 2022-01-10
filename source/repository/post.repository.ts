import { EntityRepository, Repository } from "typeorm"
import { PostEntity } from "../model/post"

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity>{

}