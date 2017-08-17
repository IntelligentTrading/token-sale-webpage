jQuery(document).ready( function($) {

	var icoButton = $('.ico-card__button');

    var btc_address = "1F6fhLSVnnv9NZ8v6Sevsve5PLUcezXpQy";
    var btc_address_10 = "1ACydwVvcW5XERpLBy4AHvwTLgzicN1k2F";
    var btc_address_20 = "1Mptoc1pQRpB4E2cPpxGrG9tAiehh7gEue";

    var eth_address = "0x57677cea00492982AEf8da2F75635E69ec64f872";
    var eth_address_10 = "0xfcF9fA13978D6B6825A3c75342dF28DcF86559a1";
    var eth_address_20 = "0x8338bCD380b4380191F71de310e338223Af02357";

  
	$(icoButton).on('click', function(e) {

		e.preventDefault();

		var token			= $(this).data('token');
		var icoCard 		= $(this).closest('.ico-card');
		var errorMessage 	= $(icoCard).find('.ico-card__message');
		var wallet 			= $(icoCard).find('.wallet');
		wallet 				= $(wallet).val();
      
		var coin = $(icoCard).data('coin');

		var newContentContainer = $(icoCard).find('.ico-card__inner');

		if( 'bitcoin' == coin && !isBTCAddress(wallet) ) {
 			$(errorMessage).addClass('is-active');
 			$(errorMessage).html( 'That doesn\'t look like a valid wallet address' );
			return;
		}

		if( 'ethereum' == coin && !isETHAddress(wallet) ) {
 			$(errorMessage).addClass('is-active');
 			$(errorMessage).html( 'That doesn\'t look like a valid wallet address' );
			return;
		}

		// Insert the new content.
		$(newContentContainer).html('');
		$( addCardContent(wallet, coin, errorMessage) ).appendTo(newContentContainer);
		initCopyBox();

	});


	function addCardContent(wallet, coin, errorMessage) {

		if( 'bitcoin' == coin ) {

			return '<div class="ico-card__content"><p>Send BTC to:</p><span class="copy-box copy-box--text">' + btc_address + '</span><p>You must include this in the transaction message:</p><span class="copy-box copy-box--text">Send ITT tokens to ' + wallet + ' </span><p>Your referral link is:</p><span class="copy-box copy-box--text">http://intelligenttrading.org/ico?r=' + wallet.substr(wallet.length - 8) + '</span></div>';

		} else if( 'ethereum' == coin ) {

			return '<div class="ico-card__content"><p>Send ETH to:</p><span class="copy-box copy-box--text">' + eth_address + '</span><p>Your referral link is:</p><span class="copy-box copy-box--text">http://intelligenttrading.org/ico?r=' + wallet.substr(wallet.length - 8) + '</span><p>ITT tokens will be sent to your Ethereum address:</p><span class="copy-box copy-box--text disabled">' + wallet + '</span></div>';

		}

	}


	function initCopyBox() {

		$('.copy-box--text').click(function (){
		    var text = $(this).text();
		    var $this = $(this);
		    var $input = $('<input type=text>');
		    $input.prop('value', text);
		    $input.insertAfter($(this));
		    $input.focus();
		    $input.select();
		    $this.hide();
		    $input.focusout(function(){
		        $this.show();
		        $input.remove();
		    });
		})

		$('.copy-box--textarea').click(function (){
		    var text = $(this).text();
		    var $this = $(this);
		    var $input = $('<textarea></textarea>');
		    $input.prop('value', text);
		    $input.insertAfter($(this));
		    $input.focus();
		    $input.select();
		    $this.hide();
		    $input.focusout(function(){
		        $this.show();
		        $input.remove();
		    });
		})

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
var isChecksumAddress = function (address) {
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


var isBTCAddress = function (address) {
  var regex = "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$";
  return address.match(regex);
}