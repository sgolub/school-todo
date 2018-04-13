pragma solidity 0.4.21;

contract ToDo {

    mapping(address => bytes32[]) public items;

    event ItemCreated(address indexed _address, bytes32 _item);
    event ItemUpdated(address indexed _address, bytes32 _item);
    event ItemDeleted(address indexed _address, uint _id);

    function create (bytes32 _item) public {
        items[msg.sender].push(_item);
        emit ItemCreated(msg.sender, _item);
    }

    function getAll () public constant returns (bytes32[]) {
        return items[msg.sender];
    }

    function get (uint id) public constant returns(bytes32) {
        return items[msg.sender][id];
    }

    function update (uint id, bytes32 _item) public {
        items[msg.sender][id] = _item;
        emit ItemUpdated(msg.sender, _item);
    }

    function destroy (uint id) public {
        require(items[msg.sender].length > id);
        items[msg.sender][id] = items[msg.sender][items[msg.sender].length - 1];
        items[msg.sender].length--;
        emit ItemDeleted(msg.sender, id);
    }

}
