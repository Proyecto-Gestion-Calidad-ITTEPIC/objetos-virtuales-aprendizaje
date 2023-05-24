export class EncuestaEmpleador {
    id?:string; //ID de db
    email:string; //correo de empleador
    sexo:string; //sexo del empleador
    zona:string; //zona de operaciones del empleador
    areaLaboral:string; //area laboral mexicana de operaciones
    satisfaccionCompetencias:string[]; //lista de competencias
    debilidadesComentarios: string; //comentarios de debilidades
    gradoPertenenciaModelo: string; //grado de pertenencia
    gradoSatisfaccion:string; //grado de satisfacción
    comentarioFortalezas:string; //comentario de fortalezas
}
