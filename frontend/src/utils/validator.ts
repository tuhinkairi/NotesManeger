export default function Validator():string|null{
    const token = localStorage.getItem("token")
    if(token){
        return token;
    }
    return null
}