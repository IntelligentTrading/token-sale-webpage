jQuery(document).ready( function($) {

	var icoButton = $('.ico-card__button');

	var ethCard 			= $('.ico-card--ethereum');
	var ethWallet 			= $('.ico-card--ethereum .wallet');
	var ethAmount 			= $('.ico-card--ethereum .amount');
	var ethBuy				= $('.ico-card--ethereum .ico-card__button');
	var ethError			= $('.ico-card--ethereum .ico-card__message');
	var ethStepOne 			= $('.ico-card--ethereum .step-one');
	var ethStepTwo 			= $('.ico-card--ethereum .step-two');
	var ethReceive 			= $('.ico-card--ethereum .address.address-normal');
	var ethReceive10		= $('.ico-card--ethereum .address.address-plus-10');
	var ethReceive20 		= $('.ico-card--ethereum .address.address-plus-20');

	var btcCard 			= $('.ico-card--bitcoin');
	var btcWallet 			= $('.ico-card--bitcoin .wallet');
	var btcBuy				= $('.ico-card--bitcoin .ico-card__button');
	var btcError			= $('.ico-card--bitcoin .ico-card__message');
	var btcStepOne 			= $('.ico-card--bitcoin .step-one');
	var btcStepTwo 			= $('.ico-card--bitcoin .step-two');
	var btcReceive 			= $('.ico-card--bitcoin .address');


	// Ethereum funding.
	$(ethBuy).on('click', function(e) {

		e.preventDefault();
		$(ethError).removeClass('is-active');

		var amount 	= $(ethAmount).val();
		$(ethReceive).addClass('is-active');

		var address = $(ethWallet).val();
		var valid = isETHAddress(address);
		if( ! valid ) {
			$(ethError).addClass('is-active');
			return;
		}

		$(ethCard).find('.send-to').html(address);
		$(ethCard).find('.eth-amount').html(amount);

		$(ethStepOne).removeClass('is-active');
		$(ethStepTwo).addClass('is-active');

		// Facebook tracking.
		fbq('track', 'CompleteRegistration');

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
        // return isChecksumAddress(address);
        return true;
    }
};


var isBTCAddress = function(address) {
  var regex = "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$";
  return address.match(regex);
}