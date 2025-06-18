export const  isValidEmail =(email:string)=>{
    const validSyntax =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validSyntax.test(email)

}