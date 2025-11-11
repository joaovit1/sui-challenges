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

// Worked as well, for checking purposes:
// 	PackageID: 0xc070b6c4eb1998e819dda6998ed67702b289d845d3dc85bcdc5e609b74d82c35
//	ObjectID: 0xe19447a8acd872dc4da5ef79ba74ea340cab48aa99bd15119b309d318189a674
