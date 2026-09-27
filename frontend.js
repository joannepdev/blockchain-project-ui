const button = document.getElementById("connect-wallet");
const walletAddress = document.getElementById("wallet-address");

button.addEventListener("click", async function () {
try {
// Check if MetaMask is installed
if (!window.ethereum) {
walletAddress.textContent = "MetaMask is not installed.";
return;
}

    // Create connection to MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Ask MetaMask to connect
    const accounts = await provider.send("eth_requestAccounts", []);

    // Get connected wallet address
    const address = accounts[0];

    walletAddress.textContent = address;
    button.textContent = "Wallet Connected";

} catch (error) {
    console.error(error);
    walletAddress.textContent = "Wallet connection failed.";
}

});