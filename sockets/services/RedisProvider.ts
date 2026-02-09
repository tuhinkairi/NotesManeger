import { createClient, type RedisClientOptions } from 'redis';
import { RedisConfig } from '../config.js';


export class RedisProvider{
    private _client
    
    constructor() {
        this._client = createClient(RedisConfig as RedisClientOptions);        
        this.ErrorHandler()
    }

    get client(){
        return this._client
    }

    async publishContent({channel, value}:{channel:string, value:string}){
        console.log(channel, value)
        return await this._client.publish(channel, value);
    }        

    async subscribeContent({channel, func}:{channel:string, func: (message:string)=>void}){
        return await this._client.subscribe(channel,(message)=>{
            console.log(message)
            func(message)
        });
    }

    private async ErrorHandler(){
        this._client.on('error', err => console.log('Redis Client Error', err));
    }
}