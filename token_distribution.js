// filter transactions
// Sep 22 9


var team_distribution_list = [

  {'address': '0x1e4972e5FA6775d58E1912A556266aA80E8730d6', 'amount': 43281113521204},
  {'address': '0xE8A4c87E1A543FEdfe274feCA435eb5B0eD584fd', 'amount': 43281113521204},
  {'address': '0x1921e3D8e32d84E05d4AaA2f805Bb8538B7954Bc', 'amount': 4869125271135},
  {'address': '0x83F706592475511375D00687739a49F0505965CE', 'amount': 5410139190150},
  {'address': '0x4C723216f41b5a4499580C249504Ca490eE4F008', 'amount': 3246083514090},
  {'address': '0x0C56e5911EC8cA9727873bDAF806dfe00e32e264', 'amount': 2705069595075},
  {'address': '0xEb28F3271e4bA62Da8075B364A91D5553b6975F0', 'amount': 2705069595075},

];

var from_address = "0x950db1e0ef25f9966b8762d4dccaeb70e84b04a5"

$.each(distribution_list, function(i, item) {
  console.log("begin sending " + item.amount + " tokens to " + item.address);
  
  $("select.select-contract-function").val('transfer');
  $("select.select-contract-function").trigger('change');

  $(".contract-functions input[name='_to']").val(item.address);
  $(".contract-functions input[name='_to']").trigger('change');
  
  $(".contract-functions input[name='elements_input_uint']").val(item.amount);
  $(".contract-functions input[name='elements_input_uint']").trigger('change');
  
  $(".dapp-select-account select[name='dapp-select-account']").val(from_address);
  
  setTimeout(function() {
    $("button.dapp-block-button.execute").click();
  }, 2000);

  //enter password
  
  console.log("SENT " + item.amount + " tokens to " + item.address);
});

