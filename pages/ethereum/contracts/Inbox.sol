pragma solidity ^0.4.17;

contract Inbox {
    string public message;
    string public image;

    function Inbox(string initialMessage, initialImage) public {
        message = initialMessage;
        image = initialImage;
    }

    function setBillboard(string newMessage, string newImage) public {
        message = newMessage;
        image = newImage;
    }
}