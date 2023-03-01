export class Encuesta {
    id?:string; //ID de db
    tipo:string; //Atributos u Objetivos
    calificaciones:number[]; //Resultados por atributo en orden
    email:string; //Email de quién llenó la encuesta
    fecha:Date; //Fecha de subida de encuesta
    com?: string[]; //Comentario sobre 
}
