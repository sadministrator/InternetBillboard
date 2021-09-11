// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

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
    
    event NewBillboard(string message, string image, address creator);

    constructor(string memory initialMessage, string memory initialImage) {
        message = initialMessage;
        image = initialImage;
        creator = msg.sender;

        Billboard memory billboard = Billboard({
            message: initialMessage,
            image: initialImage,
            creator: msg.sender
        });
        history.push(billboard);
        emit NewBillboard(initialMessage, initialImage, msg.sender);
    }

    function setBillboard(string calldata newMessage, string calldata newImage) external {
        message = newMessage;
        image = newImage;
        creator = msg.sender;

        Billboard memory billboard = Billboard({
            message: newMessage,
            image: newImage,
            creator: msg.sender
        });
        history.push(billboard);
        emit NewBillboard(newMessage, newImage, msg.sender);
    }

    function getBillboard() external view returns(string memory, string memory, address) {
        return (message, image, creator);
    }

    function getHistoryLength() external view returns(uint) {
        return history.length;
    }
}