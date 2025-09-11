export interface User{
    idUsuario : Number,
    nomePessoa : String,
    dataNascimento : Date
    email : String 
    ativo : Boolean
    idEmpresa? : Number
    nomeEmpresa? : String
}