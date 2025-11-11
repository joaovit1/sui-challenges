module p03_to_do_list::to_do_list {

    public struct ToDoList has key, store {
        id: UID,
        items: vector<vector<u8>>,
    }

    public fun add(list: &mut ToDoList, new_item: vector<u8>){
        vector::push_back(&mut list.items, new_item);
    }

    public fun edit(list: &mut ToDoList, index: u64, new_item: vector<u8>){
        assert!(index < vector::length(&list.items), 1);
        *vector::borrow_mut(&mut list.items, index) = new_item;
    }

    public fun remove(list: &mut ToDoList, index: u64){
        assert!(index < vector::length(&list.items), 2);
        vector::remove(&mut list.items, index);
    }

    #[allow(lint(self_transfer))]
    public fun create_todolist(ctx: &mut TxContext) {
        let todo = ToDoList {
            id: object::new(ctx),
            items: vector::empty<vector<u8>>()
        };
        transfer::transfer(todo, tx_context::sender(ctx));
    }

}

// Worked as well, testnet IDs for checking purposes:
// 	PackageID: 0x728b6acca6bb8585562c59f718ef800be59ed7bf2fb408a45bf3e980e3d76621
//	ObjectID: 0xc9e1235275a30e394d8e06a662a60ec3f56557fb0d816c78aecd399aa2f50d2b
