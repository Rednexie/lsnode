export module "LocalStorage"{
    class LocalStorage{
        constructor(config = {}){
            config.filename = String | Buffer | URL;
            config.seperator = String;
            config.memory = Boolean;
        }
        set(key: String, value: String): Void;
        get(key: String): String
    }
}