const connect_metamask = async () => {
  try {
    const result = await ethereum.request({ method: 'eth_requestAccounts' });
    return result.length > 0
  } catch (err) {
    console.error(err);
  }
};

const is_metamask_installed = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const is_metamask_connected = async () => {
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  return accounts.length > 0;
};

const get_metamask_account = async () => {
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  if (accounts.length > 0) {
    return accounts[0]
  }
  else{
    throw "metamask not connected";
  }
}

const get_spark_balance = async () => {
  const account = await get_metamask_account();
  const spark_contract = new web3.eth.Contract(SPARK_ABI, SPARK_CONTRACT_ADDRESS);
  const wei_spark_balance = await spark_contract.methods.balanceOf(account).call();
  const spark_balance = await web3.utils.fromWei(wei_spark_balance, "ether");
  return spark_balance;
}

const init_metamask = async () => {
  if (!is_metamask_installed()) {
    console.log("metamask not installed");
    $("#install_metamask").show();
  }
  else {
    web3 = new Web3(window.ethereum);
    if (! await is_metamask_connected()) {
      console.log("metamask not connected");
      $("#connect_metamask").show();
    }
    else {
      if (await get_spark_balance() <= SPARK_HOLD) {
        console.log(`you don't hold enough spark (minimum ${SPARK_HOLD} required)`);
      }
      else {
        $("#buy_tickets").show();
        console.log("all good")
      }
    }
  }
}

if (typeof window.ethereum !== 'undefined') {
  window.ethereum.on('accountsChanged', async () => {
    location.reload();
  });
}

const buy_tickets = async () => {
  Swal.fire({
    title: `Buy Tickets :)`,
    html: `<label for="tickets">Number of tickets (1-${loot.remaining_tickets}):</label>
    <input type="number" id="tickets" name="tickets" min="1" max="${loot.remaining_tickets}">`,
    confirmButtonText: 'Sign in',
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Please enter login and password`)
      }
      return { login: login, password: password }
    }
  }).then((result) => {
    Swal.fire(`
      Login: ${result.value.login}
      Password: ${result.value.password}
    `.trim())
  })
}
