

const SHA256 = require('crypto-js/sha256');
class Transaction{
    constructor(from_Address,to_Address,amount){
        this.from_Address=from_Address;
        this.to_Adress=to_Address;
        this.amount=amount;
    }
}
class Block {
    constructor( TimeStamp, Transactions, PreviousHash) {
       
        this.TimeStamp = TimeStamp;
        this.Transactions = Transactions;
        this.PreviousHash = PreviousHash;
        this.hash = this.Calculate_Hash();
        this.nonce=0;



    }
    Calculate_Hash() {
        return SHA256(this.Index + this.PreviousHash +
            this.TimeStamp + JSON.stringify(this.Data)+this.nonce).toString();

    }
    mine_Block(difficulty){
        while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.Calculate_Hash();
        }
        console.log("block mined:"+this.hash);
    }
}
class Block_Chain {
    constructor() {
        this.chain = [this.Create_GenesisBlock()];
        this.difficulty=2;
        this.pending_Transactions=[];
        this.mining_Reward=100;
    }
    Create_GenesisBlock() {
        return new Block( "20/2/2022", "Geneise Block", "0");
    }

    get_Last_Block() {
        return this.chain[this.chain.length - 1];
    }

    mine_panding_Transactions(mining_Reward_Adderss){
        let block= new Block(Data.now(),this.pending_Transactions);
        block.mine_Block(this.difficulty);

        console.log('Block successfuly mined');
        this.chain.push(block);

        this.pending_Transactions=[
            new Transaction(null.mining_Reward_Adderss,this.mining_Reward)
        ];
    }
    create_transactio(transaction){
        this.pending_Transactions.push(transaction);
    }

    get_Balance_ofAddress(address){
        let balance=0;
        for(const block of this.chain){
            for(const trans of block.Transactions){
                if(trans.from_Address===address){
                    balance-=trans.amount;
                }
                if(trans.to_Address ===address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    setBlock(newBlock) {
        newBlock.PreviousHash = this.get_Last_Block().hash;
       newBlock.mine_Block(this.difficulty);
        this.chain.push(newBlock);


    }
    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const current_Block=this.chain[i];
            const previous_Block=this.chain[i-1];

            if(current_Block.hash !==current_Block.Calculate_Hash){
                return false;
            }
            if(current_Block.PreviousHash!== previous_Block.hash ){
                return false;
            }
        }
        return false;
    }

}
let BlockChain = new Block_Chain();

BlockChain.create_transactio(new Transaction('address1','address2',50));
BlockChain.create_transactio(new Transaction('address2','address1',100));
 Block_Chain.mine_panding_Transactions();

console.log(JSON.stringify(BlockChain, null, 4));