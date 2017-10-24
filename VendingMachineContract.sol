/**
 * Prompt: Write a Solidity contract for a token vending machine.
 * The token cost (in Ether) should increase as supply diminishes.
 *
 * Author: Luke Weber.
 * Date: 10/23/2017.
 */

pragma solidity ^0.4.0;

/**
 * Contract representing a literal vending machine by which any person
 * may pay for an item to be vended, but under the intersting condition
 * that as more items are payed for and dispersed, the price for those
 * items more scarse increases linearly.
 *
 * Right now, we do not give the customer anything in return (though
 * this is a quick fix).
 */
contract VendingMachineContract {

    // Vending machine events
    event GoodCreated(uint goodID, uint price, uint quantity);
    event GoodStocked(uint goodID, uint quantityAdded);
    event GoodRemoved(uint goodID);
    event CustomerPayed(address customer, uint amount);

    // Vending machine properties
    address owner;
    uint balance;
    address machineID;
    uint priceScarcityIncrease = 1;

    // Represents a type of good in the machine (e.g. candy bar)
    struct Good {
        bool exists;
        uint quantity;
        uint price;
    }

    // All the goods in the machine
    mapping(uint => Good) public goods;

    function VendingMachineContract() {
        // The one who created the machine owns it
        owner = msg.sender;
    }

    // Only owner can do certain things
    modifier onlyOwner() {
        if (msg.sender == owner) { _; }
    }

    // Empty fallback function: we should not be payed without knowing the
    // good requested.
    function () payable { throw; }

    // Insert Ether as "tokens" and pretend to return something back
    function insertTokens(uint _goodID) payable returns (bool) {

        // Don't vend an item that doesn't exist
        if (!goods[_goodID].exists) { return false; }

        // Check amount paid
        if (msg.value < goods[_goodID].price) {
            // Invalid payment; give them their money back
            msg.sender.transfer(msg.value);
            return false;
        } else if (msg.value > goods[_goodID].price) {
            // They paid a little too much; give them back the remaining amount
            msg.sender.transfer(msg.value - goods[_goodID].price);
        }

        // Update machine Ether balance
        balance += goods[_goodID].price;

        // Raise event of successful dispense
        CustomerPayed(msg.sender, goods[_goodID].price);

        // Increase good price and remove one from stock
        goods[_goodID].price += priceScarcityIncrease;
        goods[_goodID].quantity -= 1;

        // TODO: Vend item here

        return true;
    }

    // Admin removes all goods of certain type from vending machine
    function createGood(uint _goodID, uint _price, uint _quantity) onlyOwner {
        goods[_goodID].exists = true;
        goods[_goodID].price = _price;
        goods[_goodID].quantity = _quantity;
        GoodCreated(_goodID, _price, _quantity);
    }

    // Admin adds goods to the vending machine
    function stockGood(uint _goodID, uint _quantityAdded) onlyOwner {
        goods[_goodID].quantity += _quantityAdded;
        GoodStocked(_goodID, _quantityAdded);
    }

    // Admin removes all goods of certain type from vending machine
    function removeGood(uint _goodID) onlyOwner {
        goods[_goodID].exists = false;
        GoodRemoved(_goodID);
    }

    // Allow only the owner to view the machine's balance
    function getBalance() constant onlyOwner returns (uint) {
        return balance;
    }
}
