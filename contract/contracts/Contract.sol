// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Contract is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 listPrice = 0.01 ether;

    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    event TokenListedSuccess (uint256 indexed tokenId, address owner, address seller, uint256 price, bool currentlyListed);
    event TokenSold (uint256 indexed tokenId, address buyer, uint256 price, string message);
    mapping(uint256 => ListedToken) private idToListedToken;

    constructor() ERC721("NFTMarketPlace", "NMP") {
        owner = payable(msg.sender);
    }

    function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(uint256 _tokenId) public view returns (ListedToken memory) {
        return idToListedToken[_tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    function createNFT(string memory tokenURI, uint256 price) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        createListToken(newItemId, price);
        return newItemId;
    }

    function createListToken(uint256 tokenId, uint256 price) private {
        require(msg.value == listPrice, "Hopefully sending the correct price");
        require(price > 0, "You need at least 0.01 ether to list your NFT");
        idToListedToken[tokenId] = ListedToken(tokenId, payable(address(this)), payable(msg.sender), price, true);
        _transfer(msg.sender, address(this), tokenId);
        emit TokenListedSuccess(tokenId, address(this), msg.sender, price, true);
    }

    function getAllNFTs() public view returns(ListedToken[] memory) {
        uint count = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](count);
        uint currentIndex = 0;
        for(uint i=0; i<count; i++) {
            uint currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }

        return tokens;
    }

    function getNFTsByAddress() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        
        for(uint i=0; i < totalItemCount; i++){
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender) {
                uint currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function buyNFT(uint256 _tokenId) public payable {
        uint price = idToListedToken[_tokenId].price;
        address seller = idToListedToken[_tokenId].seller;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idToListedToken[_tokenId].currentlyListed = true;
        idToListedToken[_tokenId].seller = payable(msg.sender);
        _itemsSold.increment();

        _transfer(address(this), msg.sender, _tokenId);
        approve(address(this), _tokenId);
        payable(owner).transfer(listPrice);
        payable(seller).transfer(msg.value);
    }
}