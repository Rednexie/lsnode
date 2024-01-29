export module "MemoryStore"{

    interface MemoryStoreConfig{
        ttl?: Number | null;
        filename: FilePath;
        syncOnExit: Boolean;
    }

    interface MemoryStoreInstance{
        set(key: String, value: String): Void;
        get(key: String): String;

    }

    class MemoryStore{
        private store: Object;
        constructor(config: MemoryStoreConfig): MemoryStoreInstance{
            
        }
        config: MemoryStoreConfig
    }
}

