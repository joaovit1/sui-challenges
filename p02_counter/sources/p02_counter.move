module p02_counter::Counter {
    use std::debug::print;
    
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

//Worked like a charm, here are the infos about the created counter.
//PackageID 0xce36be41efd6a436164489e0f51dd9638ca31924dbeea570f9fe4072b763c209
//ObjectID 0x9fba1fe438910dec24e284fec78111ecd678fd63ae9ecfc551827329ca185998