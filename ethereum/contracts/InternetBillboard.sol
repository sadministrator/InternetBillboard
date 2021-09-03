pragma solidity ^0.4.17;

contract InternetBillboard {
    string public message;
    string public image;

    function InternetBillboard(string initialMessage, string initialImage) public {
        message = initialMessage;
        image = initialImage;
    }

    function setBillboard(string newMessage, string newImage) public {
        message = newMessage;
        image = newImage;
    }
}