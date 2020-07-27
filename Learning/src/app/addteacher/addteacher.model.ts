export class TeacherModel{
    constructor(
        public user_id: string,
        public email: string,
        public t_id: number,
        public t_desig: string,
        public t_name: string,
        public t_address: string,
        public t_phone: string,
        public t_classteacherof: string,
        public t_div: string,
        public t_subjects: string[],
        public t_classes: string[]
        ){}
}