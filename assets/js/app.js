jQuery(document).ready( function($) {

	var icoButton 			= $('.ico-card__button');

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
      // $(ethEmailShow).html($(ethEmail).val());
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
          var validEmail = validateEmail( $(ethEmail).val() );
          if ( validEmail ) {
          	if ( ! $('input.email-confirm').is(':checked') ) {
          		$('.ico-card__message--email-confirm').addClass('is-active');
          	}
          } else {
          	$('.ico-card__message--email').addClass('is-active');
          }

        }

		$(ethReceive).addClass('is-active');

		var address = $(ethWallet).val();
		var valid = isETHAddress(address);
		if( ! valid ) {
			$('.ico-card__message--address').addClass('is-active');
			return;
		}

		$(ethCard).find('.send-to').html(address);
		$(ethCard).find('.eth-amount').html(amount);

		$(ethStepOne).removeClass('is-active');
		$(ethStepTwo).addClass('is-active');
      
        // Facebook tracking.
        fbq('track', 'CompleteRegistration');
      
	});

	function validateEmail(email) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    return pattern.test(email);
	}

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