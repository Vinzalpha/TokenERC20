const MonToken = artifacts.require("MonToken");

contract("Mon Token", ([sender, buyer, exchange]) => {
    let monToken;
    let NOM;
    let SYMBOL;
    let DECIMALS;
    let QUANTITY;
    before(async () => {
        NOM = "Roger Federer Fan Token";
        SYMBOL = "RF";
        DECIMALS = 2;
        QUANTITY = 21000000
        monToken = await MonToken.deployed();
    })

    it("should be deployed", async () => {
        const address = await monToken.address;
        console.log(address);
        assert.notEqual(address, '');
    })

    describe("nom, symbol, decimals, totalSupply", () => {
        it("function name", async () => {
            const nom = await monToken.name();
            assert.equal(nom, NOM);
        })

        it("function symbol", async () => {
            const symbol = await monToken.symbol();
            assert.equal(symbol, SYMBOL);
        })

        it("function decimals", async () => {
            const decimals = await monToken.decimals();
            assert.equal(decimals.toNumber(), DECIMALS);
        })

        it("function totalSupply", async () => {
            const totalSupply = await monToken.totalSupply();
            assert.equal(totalSupply.toNumber(), QUANTITY * 10 ** DECIMALS);
        })
    })

    describe("function transfer", () => {
        describe("success (check balance and EVENT Transfer)", () => {
            let Result;
            before(async () => {
                const tokenSent = 1000000 * (10 ** DECIMALS);
                console.log(tokenSent);
                Result = await monToken.transfer(buyer, tokenSent, { from: sender });
            })

            it("check balance", async () => {
                const balanceOf = await monToken.balanceOf(sender);
                console.log(balanceOf.toNumber());
                assert.equal(balanceOf.toNumber(), 20000000 * 10 ** DECIMALS)
                const balanceOf1 = await monToken.balanceOf(buyer);
                assert.equal(balanceOf1.toNumber(), 1000000 * (10 ** DECIMALS));
            })

            it("Check emit Transfer event", async () => {
                const logs = await Result.logs[0];
                assert.equal(logs.event, "Transfer", "nom de l'event");
                assert.equal(logs.args._from, sender);
                assert.equal(logs.args._to, buyer);
                assert.equal(logs.args._value.toNumber(), 1000000 * (10 ** DECIMALS));
            })
        })

        describe("failure", () => {
            it("tester not enough token", async () => {
                const ERROR = "not enough Token";
                try {
                    await monToken.transfer(buyer, 1, { from: exchange })
                } catch (err) {
                    assert.include(err.message, ERROR, "pas assez de jetons")
                }
            })
        })
    })

    describe("function approve", () => {
        describe("success (check allowance and EVENT Approval)", () => {
            let tokenTradable;
            let result;
            before(async () => {
                tokenTradable = 1 * (10 ** DECIMALS);
                result = await monToken.approve(exchange, tokenTradable);
            })

            it("check allowance", async () => {
                // await monToken.approve(exchange, tokenTradable, {from: sender})
                const allowance = await monToken.allowance(sender, exchange, {from: sender});
                console.log(allowance.toNumber());
                assert.equal(allowance.toNumber(), tokenTradable, "allowance");
            })

            it("emit event approval", async () => {
                const logs = await result.logs[0];
                console.log("test logs", logs)
                assert.equal(logs.event, "Approval");
                assert.equal(logs.args._owner, sender);
                assert.equal(logs.args._spender, exchange);
                assert.equal(logs.args._value.toNumber(), tokenTradable);
            })

        })

        describe("failure : msg.sender = spender", () => {
            it("fail", async () => {
                const ERROR = "VM Exception while processing transaction: revert";
                try{
                    await monToken.approve(sender, 1, {from: sender});
                } catch (err) {
                    console.log(err.message)
                    assert.include(err.message, ERROR)
                }
            })
        })
    })

    describe("function tranferFrom", () => {
        describe('success (check balance, allowance and event Transfer', async () => {
            // Exercice
        })

        describe('failure (not allowed, not enough token)', async () => {
            // Exercice
        })

    })


})