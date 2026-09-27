async function loadABI() {
    try {
        const response = await fetch("TrainingCertificate_sol_TrainingCertificate.abi");

        if (!response.ok) {
            throw new Error("Could not load ABI file");
        }

        const abi = await response.json();

        console.log("ABI loaded successfully:");
        console.log(abi);

    } catch (error) {
        console.error("Error loading ABI:", error);
    }
}

loadABI();


// Contract
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

let contract;
let provider;
let signer;

async function loadContract() {
    try {
        const response = await fetch("TrainingCertificate_sol_TrainingCertificate.abi");

        if (!response.ok) {
            throw new Error("Could not load ABI file");
        }

        const abi = await response.json();

        console.log("ABI loaded for contract.");

        if (!window.ethereum) {
            throw new Error("MetaMask is not installed.");
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        const network = await provider.getNetwork();

        console.log("Contract network:");
        console.log(network);

        if (network.chainId !== 11155111n) {
            throw new Error("Wrong network. Please connect to Sepolia.");
        }

        contract = new ethers.Contract(
            contractAddress,
            abi,
            signer
        );

        console.log("Contract instance created:");
        console.log(contract);

    } catch (error) {
        console.error("Error loading contract:", error);
    }
}


const button = document.getElementById("connect-wallet");
const walletAddress = document.getElementById("wallet-address");
const walletRole = document.getElementById("wallet-role");

button.addEventListener("click", async function () {
    try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
            walletAddress.textContent = "MetaMask is not installed.";
            return;
        }

        // Create connection to MetaMask
        provider = new ethers.BrowserProvider(window.ethereum);

        // Ask MetaMask to connect
        const accounts = await provider.send("eth_requestAccounts", []);

        // Get signer
        signer = await provider.getSigner();

        const network = await provider.getNetwork();

        console.log("Network:");
        console.log(network);

        // Load contract
        await loadContract();

        // Get connected wallet address
        const address = accounts[0];

        // Update wallet information
        walletAddress.textContent = address;
        // walletRole.textContent = "Role: Connected";
        walletRole.textContent = "Network: " + network.name;
        button.textContent = "Wallet Connected";

    } catch (error) {
        console.error(error);
        walletAddress.textContent = "Wallet connection failed.";
        walletRole.textContent = "Role: Not connected";
    }
});

console.log("Register User section loaded.");

const registerUserForm = document.getElementById("register-user-form");

registerUserForm.addEventListener("submit", async function (event) {
    console.log("Register User form submitted.");

    event.preventDefault();

    try {
        const userAddress = document.getElementById("user-address").value;
        const userName = document.getElementById("user-name").value;
        const userRole = document.getElementById("user-role").value;

        console.log("Registering user...");
        console.log("Address:", userAddress);
        console.log("Name:", userName);
        console.log("Role:", userRole);

        document.getElementById("status").textContent =
            "User data entered successfully. Transaction not sent.";

    } catch (error) {
        console.error("Register User error:", error);

        document.getElementById("status").textContent =
            "User registration failed.";
    }
});

const userStatusForm = document.getElementById("user-status-form");

userStatusForm.addEventListener("submit", async function (event) {
    console.log("Update User Status form submitted.");

    event.preventDefault();

    try {
        const userAddress = document.getElementById("status-address").value;
        const userActive = document.getElementById("user-active").value;

        console.log("Updating user status...");
        console.log("Address:", userAddress);
        console.log("Active:", userActive);

        document.getElementById("status").textContent =
            "User status data entered successfully. Transaction not sent.";

    } catch (error) {
        console.error("Update User Status error:", error);

        document.getElementById("status").textContent =
            "User status update failed.";
    }
});

const issueCertificateForm = document.getElementById("issue-certificate-form");

issueCertificateForm.addEventListener("submit", async function (event) {
    console.log("Issue Certificate form submitted.");

    event.preventDefault();

    try {
        const certificateId =
            document.getElementById("certificate-id").value;

        const certificateType =
            document.getElementById("certificate-type").value;

        const holderAddress =
            document.getElementById("holder-address").value;

        const expiryDate =
            document.getElementById("expiry-date").value;

        const fileHash =
            document.getElementById("file-hash").value;

        console.log("Issuing certificate...");
        console.log("Certificate ID:", certificateId);
        console.log("Certificate Type:", certificateType);
        console.log("Holder Address:", holderAddress);
        console.log("Expiry Date:", expiryDate);
        console.log("File Hash:", fileHash);

        document.getElementById("status").textContent =
            "Certificate data entered successfully. Transaction not sent.";

    } catch (error) {
        console.error("Issue Certificate error:", error);

        document.getElementById("status").textContent =
            "Certificate issuance failed.";
    }
});

const loadMyCertificatesButton =
    document.getElementById("load-my-certificates");

loadMyCertificatesButton.addEventListener("click", function () {
    console.log("Load My Certificates button clicked.");

    document.getElementById("my-certificates").innerHTML =
        "<p>Certificate list loaded successfully. Blockchain call not sent.</p>";
});

const verifyIdForm = document.getElementById("verify-id-form");

verifyIdForm.addEventListener("submit", function (event) {
    console.log("Verify by ID form submitted.");

    event.preventDefault();

    try {
        const certificateId =
            document.getElementById("verify-certificate-id").value;

        console.log("Verifying certificate by ID...");
        console.log("Certificate ID:", certificateId);

        document.getElementById("verification-result").innerHTML =
            "<p>Certificate ID received successfully. Blockchain call not sent.</p>";

    } catch (error) {
        console.error("Verify by ID error:", error);

        document.getElementById("verification-result").innerHTML =
            "<p>Verification failed.</p>";
    }
});

const verifyHashForm = document.getElementById("verify-hash-form");

verifyHashForm.addEventListener("submit", function (event) {
    console.log("Verify by Hash form submitted.");

    event.preventDefault();

    try {
        const fileHash =
            document.getElementById("verify-file-hash").value;

        console.log("Verifying certificate by hash...");
        console.log("File Hash:", fileHash);

        document.getElementById("verification-result").innerHTML =
            "<p>File hash received successfully. Blockchain call not sent.</p>";

    } catch (error) {
        console.error("Verify by Hash error:", error);

        document.getElementById("verification-result").innerHTML =
            "<p>Verification failed.</p>";
    }
});

const revokeCertificateForm =
    document.getElementById("revoke-certificate-form");

revokeCertificateForm.addEventListener("submit", function (event) {
    console.log("Revoke Certificate form submitted.");

    event.preventDefault();

    try {
        const certificateId =
            document.getElementById("revoke-certificate-id").value;

        const revocationReason =
            document.getElementById("revocation-reason").value;

        console.log("Revoking certificate...");
        console.log("Certificate ID:", certificateId);
        console.log("Reason:", revocationReason);

        document.getElementById("status").textContent =
            "Revocation data entered successfully. Transaction not sent.";

    } catch (error) {
        console.error("Revocation error:", error);

        document.getElementById("status").textContent =
            "Certificate revocation failed.";
    }
});

const certificateForm = document.getElementById("certificate-form");

certificateForm.addEventListener("submit", function (event) {
    console.log("Certificate Details form submitted.");

    event.preventDefault();

    try {
        const certificateId =
            document.getElementById("search-certificate-id").value;

        console.log("Loading certificate details...");
        console.log("Certificate ID:", certificateId);

        document.getElementById("certificate-result").innerHTML =
            "<p>Certificate ID received successfully. Blockchain call not sent.</p>";

    } catch (error) {
        console.error("Certificate Details error:", error);

        document.getElementById("certificate-result").innerHTML =
            "<p>Could not load certificate details.</p>";
    }
});

const loadAllCertificatesButton =
    document.getElementById("load-all-certificates");

loadAllCertificatesButton.addEventListener("click", function () {
    console.log("Load All Certificate IDs button clicked.");

    document.getElementById("all-certificates").innerHTML =
        "<p>Certificate IDs loaded successfully. Blockchain call not sent.</p>";
});