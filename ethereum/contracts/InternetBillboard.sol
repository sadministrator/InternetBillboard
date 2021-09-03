pragma solidity ^0.4.17;

contract InternetBillboard {
    struct Billboard {
        string message;
        string image;
        address creator;
    }

    string public message;
    string public image;
    address public creator;
    Billboard[] public history;

    function InternetBillboard(string initialMessage, string initialImage) public {
        message = initialMessage;
        image = initialImage;
        creator = msg.sender;

        Billboard memory billboard = Billboard({
            message: initialMessage,
            image: initialImage,
            creator: msg.sender
        });
        history.push(billboard);
    }

    function setBillboard(string newMessage, string newImage) public {
        message = newMessage;
        image = newImage;
        creator = msg.sender;

        Billboard memory billboard = Billboard({
            message: newMessage,
            image: newImage,
            creator: msg.sender
        });
        history.push(billboard);
    }

    function getBillboard() public view returns(string, string, address) {
        return (message, image, creator);
    }

    function getHistoryLength() public view returns(uint) {
        return history.length;
    }
}