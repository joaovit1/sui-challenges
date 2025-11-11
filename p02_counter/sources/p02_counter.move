module p02_counter::Counter {
    public struct Counter has key {
        id: UID,
        value: u64,
    }

    public fun increment(counter: &mut Counter){
        counter.value = counter.value + 1;
    }

    public fun decrement(counter: &mut Counter){
        counter.value = counter.value - 1;
    }

    public fun reset(counter: &mut Counter){
        counter.value = 0;
    }

    public fun create_counter(ctx: &mut TxContext) {
        let counter = Counter { 
            id: object::new(ctx), 
            value: 0 
        };
        transfer::transfer(counter, tx_context::sender(ctx));
    }
}

//Worked like a charm, here are the testnet infos about the created counter.
//PackageID 0x6f149db1be0baf5348cb753dba1c431b30a422bcbb59b6860ad43ea1e534b5aa
//ObjectID 0xbf2c9aa59ccbe1b123ea5d0b80dc4f5ee75ed9c445108e42b6e95e5b8638c6de