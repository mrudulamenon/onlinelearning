export class TeacherUploadModel{
    constructor(
        public user_id: string,
        public classs: string,
        public subjects: string[],
        public category: string,
        public topic: string,
        public title: string,
        public description: string,
        public upload: string,
        public t_u_date: Date   
        ){}
}