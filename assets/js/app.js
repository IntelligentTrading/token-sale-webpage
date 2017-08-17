jQuery(document).ready( function($) {

	var icoButton = $('.ico-card__button');

    var eth_address 		= "0x57677cea00492982AEf8da2F75635E69ec64f872";
    var eth_address_10 		= "0xfcF9fA13978D6B6825A3c75342dF28DcF86559a1";
    var eth_address_20 		= "0x8338bCD380b4380191F71de310e338223Af02357";

	var ethCard 			= $('.ico-card--ethereum');
	var ethWallet 			= $('.ico-card--ethereum .wallet');
	var ethBuy				= $('.ico-card--ethereum .ico-card__button');
	var ethError			= $('.ico-card--ethereum .ico-card__message');
	var ethStepOne 			= $('.ico-card--ethereum .step-one')
	var ethStepTwo 			= $('.ico-card--ethereum .step-two')


    var btc_address 		= "1F6fhLSVnnv9NZ8v6Sevsve5PLUcezXpQy";
    var btc_address_10 		= "1ACydwVvcW5XERpLBy4AHvwTLgzicN1k2F";
    var btc_address_20 		= "1Mptoc1pQRpB4E2cPpxGrG9tAiehh7gEue";

	var btcCard 			= $('.ico-card--bitcoin');
	var btcWallet 			= $('.ico-card--bitcoin .wallet');
	var btcBuy				= $('.ico-card--bitcoin .ico-card__button');
	var btcError			= $('.ico-card--bitcoin .ico-card__message');
	var btcStepOne 			= $('.ico-card--bitcoin .step-one')
	var btcStepTwo 			= $('.ico-card--bitcoin .step-two')


	// Ethereum funding.
	$(ethBuy).on('click', function(e) {

		e.preventDefault();
		$(ethError).removeClass('is-active');

		var address = $(ethWallet).val();
		// var valid = isETHAddress(address);
		var valid = true;
		if( ! valid ) {
			$(ethError).addClass('is-active');
			return;
		}

		$(ethStepOne).removeClass('is-active');
		$(ethStepTwo).addClass('is-active');

	});



	// Bitcoin funding.
	$(btcBuy).on('click', function(e) {

		e.preventDefault();
		$(btcError).removeClass('is-active');

		var address = $(btcWallet).val();
		var valid = isBTCAddress(address);
		// var valid = true;
		if( ! valid ) {
			$(btcError).addClass('is-active');
			return;
		}

		$(btcStepOne).removeClass('is-active');
		$(btcStepTwo).addClass('is-active');

	});


});


/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isETHAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isChecksumAddress = function(address) {
    // Check each case
    address = address.replace('0x','');
    var addressHash = sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};


var isBTCAddress = function(address) {
  var regex = "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$";
  return address.match(regex);
}