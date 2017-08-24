jQuery(document).ready( function($) {

	var icoButton = $('.ico-card__button');

	var ethCard 			= $('.ico-card--ethereum');
	var ethWallet 			= $('.ico-card--ethereum .wallet');
	var ethAmount 			= $('.ico-card--ethereum .amount');
    var ethEmail 			= $('.ico-card--ethereum .email');
    var ethEmailShow 		= $('.ico-card--ethereum .email-show');
    var ethEmailConfirm 	= $('.ico-card--ethereum .email-confirm');
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


    $(ethAmount).on('change', function(e){
      var amount 	= $(ethAmount).val();
      if( amount > 28.5 ){
        $('.email-field').show();
      }else{
        $('.email-field').hide();
      }
    });
  
    $(ethEmail).on('keyup', function(e){
      $(ethEmailShow).html($(ethEmail).val());
    });
  
	// Ethereum funding.
	$(ethBuy).on('click', function(e) {

		e.preventDefault();
		$(ethError).removeClass('is-active');

		var amount 	= $(ethAmount).val();
      
        if( amount > 28.5 ) {
          // TODO:
          // check that the email address is properly formed
          // send the amount and email to our database
          // if successful, carry on as normal
        }
      
		if( amount > 4.999999999 && amount < 49.99999999 ) {
			$(ethReceive10).addClass('is-active');
		} else if( amount >= 50 ) {
			$(ethReceive20).addClass('is-active');
		} else {
			$(ethReceive).addClass('is-active');
		}

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

		$(btcCard).find('.send-to').html(address);

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
        // return isChecksumAddress(address);
        return true;
    }
};


var isBTCAddress = function(address) {
  var regex = "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$";
  return address.match(regex);
}