export class ServiceUtil{
    constructor(){}

    response(message: string, flg: boolean, obj?: any){
        if(obj){
            return {
                message,
                success: flg,
                data: obj
            }
        }
        else{
            return {
                message,
                success:flg
            }
        }
    }
}