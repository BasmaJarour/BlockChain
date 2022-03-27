

const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(Index, TimeStamp, Data, PreviousHash) {
        this.Index = Index;
        this.TimeStamp = TimeStamp;
        this.Data = Data;
        this.PreviousHash = PreviousHash;
        this.hash = '';


    }
    Calculate_Hash() {
        return SHA256(this.Index + this.PreviousHash +
            this.TimeStamp + JSON.stringify(this.Data)).toString();

    }
}
class BlockChain {
    constructor() {
        this.chain = [this.Create_GenesisBlock()];
    }
    Create_GenesisBlock() {
        return new Block(0, "20/2/2022", "Geneise Block", "0");
    }

    get_Last_Block() {
        return this.chain[this.chain.length - 1];
    }
    setBlock(newBlock) {
        newBlock.PreviousHash = this.get_Last_Block().hash;
        newBlock.hash = newBlock.Calculate_Hash();
        this.chain.push(newBlock);


    }

}
let Ass1 = new BlockChain();
Ass1.setBlock(new Block(1, "25/2/2022", "ScondBlock"));
Ass1.setBlock(new Block(2, "26/2/2022", "ThirdBlock"));
Ass1.setBlock(new Block(3, "28/2/2022", "FourthBlock"));

console.log(JSON.stringify(Ass1, null, 4));