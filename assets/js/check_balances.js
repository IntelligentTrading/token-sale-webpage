
function getTotalBalances(){
  var eth_total = getTotalETHBalance();
  var btc_total = getTotalBTCBalance();
  var usd_total = (eth_total * 400) + (btc_total * 4200);
  return (eth_total, btc_total, usd_total)
}

function getTotalETHBalance(){
  var eth_addresses = [
    "0xb12b399cA36e9F89791cA91ABEf8eAc74fc05c52",
    "0x8338bCD380b4380191F71de310e338223Af02357",
    "0xfcF9fA13978D6B6825A3c75342dF28DcF86559a1",
    "0x57677cea00492982AEf8da2F75635E69ec64f872"
  ]
  var eth_sum = 0
  for(i=0;i<4;i++){
    eth_sum = eth_sum + getETHBalance(eth_addresses[i]);
  }
  return eth_sum;
}

function getTotalBTCBalance(){
  var btc_addresses = [
    "12Cyt8eJ2mWah12esHGSSTFuWXFfcCuqB5",
    "1Mptoc1pQRpB4E2cPpxGrG9tAiehh7gEue",
    "1ACydwVvcW5XERpLBy4AHvwTLgzicN1k2F",
    "1F6fhLSVnnv9NZ8v6Sevsve5PLUcezXpQy"
  ]
  var btc_sum = 0
  for(i=0;i<4;i++){
    btc_sum = btc_sum + getBTCBalance(btc_addresses[i]);
  }
  return btc_sum;
}

function getETHBalance(eth_address) {
  $.getJSON('https://api.ethplorer.io/getAddressInfo/' + eth_address + '?apiKey=freekey', function(data) {
    return data["ETH"]['balance'];
  });
  
  //  alt_url = 'https://api.etherscan.io/api?module=account&action=balance&address=' + ethAddress + '&tag=latest&apikey=YourApiKeyToken'
  
}
 

function getBTCBalance(btc_address) {
  var btc_balance = 0;
  
  $.getJSON('https://blockexplorer.com/api/addr/' + btc_address + '/balance', function(data) {
    console.log(data)
    btc_balance = data
  });
  return parseInt(btc_balance);
  
}
