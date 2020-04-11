import React from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getWeb3 } from './utils';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			web3: undefined,
			account: "",
		}
	}

	componentWillMount = async () => {
		const web3 = await getWeb3();
		console.log(web3);
	}

	render() {
		return (
			<div className="App">
				<div className="container-fluid">
					<br />
					<h1>Mon Token ERC20</h1>
					<br />
					<h2>Informations</h2>
					<div className="row">
						<div className="col-4">Mon account : </div>
						<div className="col-8"><p id="account"></p></div>
					</div>
					<div className="row">
						<div className="col-4">Nom du Token : </div>
						<div className="col-8"><p id="name"></p></div>
					</div>
					<div className="row">
						<div className="col-4">Symbole du Token : </div>
						<div className="col-8"><p id="symbol"></p></div>
					</div>
					<div className="row">
						<div className="col-4">Décimal du Token : </div>
						<div className="col-8"><p id="décimal"></p></div>
					</div>
					<div className="row">
						<div className="col-4">Totalsupply du Token : </div>
						<div className="col-8"><p id="totalSupply"></p></div>
					</div>
					<h3>Ma balance : <span id="balance">test</span> <span id="symbol2">this.state.symbol ...</span></h3>
					<br />
					<br />

					<h2>Fonction Transfer</h2>
					<form>
						<div className="form-group">
							<label>l'adresse du destinataire</label>
							<input type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Le nombre de Token a transférer</label>
							<input type="number" className="form-control" />
						</div>
						<button type="submit" className="btn btn-warning">Transférer</button>
					</form>
					<br />
					<br />

					<h2>Fonction Approve</h2>
					<form>
						<div className="form-group">
							<label>l'adresse de l'Exchange</label>
							<input type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Le nombre de Token autorisé à trader</label>
							<input type="number" className="form-control" />
						</div>
						<button type="submit" className="btn btn-warning">Approuver</button>
					</form>
					<br />
					<br />

					<h2>Fonction TransferFrom</h2>
					<form>
						<div className="form-group">
							<label>l'adresse du vendeur (sender)</label>
							<input type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>l'adresse de l'acheteur (buyer)</label>
							<input type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Le nombre de Token a transférer</label>
							<input type="number" className="form-control" />
						</div>
						<button type="submit" className="btn btn-warning">Transférer (function transferFrom)</button>
					</form>
					<br />
					<br />
				</div>
			</div>
		);
	}

}

export default App;