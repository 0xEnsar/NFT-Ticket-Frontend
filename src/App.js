import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import contract from './Helper.json';

const contractAddress = "0xC26408C60dc3167D8731198cb92f39E2B338B5Ab";
const abi = contract.abi;
function App() {
  const [ , setCurrentAccount] = useState(null);

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    }
    catch(err) {
      console.log(err);
    }
  }

  const mintHandler = async(filmName) => {
    const { ethereum } = window;
    try {
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const transaction = await contract.mint(filmName, { value: ethers.utils.parseEther("1") });

        await transaction.wait();

        alert(`${filmName} minted successfully // ${transaction.hash}`);
      }
    }
    catch(err) {
      console.log(err);
    }
  } 



  return (
      <body>
        <button onClick={connectWalletHandler} className= "connect-button">Connect Wallet</button>
        <div class='img-div'>
          <img class="img-responsive" alt="Avatar: Suyun Yolu" src="https://media.paribucineverse.com/255//files/movie_posters/HO00005497_638048142804242379_avatar-suyun-yolu.png"></img>
          <h1>Avatar: Suyun Yolu</h1>
          <button onClick={e => mintHandler("avatar")}class="mint-button"> Bilet Satın Al</button>
        </div>

        <div class='img-div'>
          <img class="img-responsive" alt="Menu" src="https://media.paribucineverse.com/255//files/movie_posters/HO00005484_638037649998532211_the-menu.png"></img>
          <h1>Menu</h1>
          <button onClick={e => mintHandler("menu")} class="mint-button"> Bilet Satın Al</button>
        </div>
      </body>
      

  );
}

export default App;
