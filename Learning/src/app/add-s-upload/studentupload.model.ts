export class StudentUploadModel{
    constructor(
        public user_id: string,
        public t_upload_id: string,
        public s_u_class:string,
        public s_u_div:string,
        public description: string,
        public upload: string,
        public t_comment: string,
        public s_u_date: Date
        ){}
}