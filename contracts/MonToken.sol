pragma solidity ^0.5.16;

contract MonToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping(address => uint) public balance;
    mapping(address => mapping(address => uint256)) public allowed;
    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value);
        
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value);
    
    constructor (
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _quantity)
        public {
            name = _name;
            symbol = _symbol;
            decimals = _decimals;
            totalSupply = _quantity * (10 ** uint256(decimals));
            balance[msg.sender] = totalSupply;
        }
    
    function balanceOf(address _owner) public view returns(uint256) {
        return balance[_owner];
    }
    
    function transfer(address _to, uint256 _value) public returns(bool success) {
        require(balance[msg.sender] >= _value, "not enough Token");
        balance[msg.sender] = sub(balance[msg.sender], _value);
        balance[_to] = add(balance[_to],  _value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
        require(allowed[_from][msg.sender] >= _value, "not allowed");
        require(balance[_from] >= _value, "not enough token");
        allowed[_from][msg.sender] = sub(allowed[_from][msg.sender], _value);
        balance[_from] = sub(balance[_from], _value);
        balance[_to] = add(balance[_to],  _value);
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns(bool success) {
        require(_spender != msg.sender);
        allowed[msg.sender][_spender] = add(allowed[msg.sender][_spender], _value);
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function allowance(address _owner, address _spender) public view returns(uint256) {
        return allowed[_owner][_spender];
    }
    
    
    function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x);
    }
    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x);
    }
    function mul(uint x, uint y) internal pure returns (uint z) {
        require((z = x * y) <= x);
    }
    
}