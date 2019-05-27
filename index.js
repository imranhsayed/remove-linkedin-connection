// ==UserScript==
// @name         Remove LinkedIn Connection
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove a LinkedIn Connection with a single click.
// @author       @imranhsayed @m-muhsin
// @match        https://github.com/imranhsayed/remove-linkedin-connection/blob/master/index.js
// @grant        none
// ==/UserScript==

window.onload = function() {

	// Get all elements containing remove button.
	var cardContainers =  document.querySelectorAll( '.mn-connection-card__dropdown' );
	const cardContainersArray = Array.from( cardContainers );

	/**
	 *
	 * Remove Connection with single click
	 *
	 * Get the three elements that trigger the removal of the connection,
	 * and trigger a click on them explicitly
	 *
	 * @param event
	 */
	const removeConnection = ( event ) => {

		// 1. FIRST TARGET ELEMENT CLICK
		const parentEl = event.target.parentElement;
		const firstTarget = parentEl.querySelector( '.mn-connection-card__dropdown-trigger' );
		firstTarget.click();

		setTimeout( function (  ) {

			// 2. SECOND TARGET ELEMENT CLICK
			const secondTargetEl = parentEl.querySelector( '.dropdown-options--expanded li button' );
			secondTargetEl.click();

			setTimeout( function (  ) {

				// 3. THIRD TARGET ELEMENT CLICK
				const thirdTargetElContainer = document.getElementById( 'artdeco-modal-outlet' );
				const thirdTargetEl = thirdTargetElContainer.querySelector( '.artdeco-button--primary.ember-view' );
				thirdTargetEl.click();
			},200 )

		}, 100 );
	};

	// Loop through each item in the conatiner and add our custom button
	cardContainersArray.forEach( item => {

		item.appendChild( createRemoveBtn() );

	});
  
  function createRemoveBtn() {
    const removeConnectionBtn = document.createElement( 'button' );
    removeConnectionBtn.textContent = 'Remove';
    removeConnectionBtn.classList.add( 'artdeco-button--danger' );
    removeConnectionBtn.classList.add('artdeco-button');

    // Add an event to our custom button
    removeConnectionBtn.addEventListener( 'click', removeConnection );
    return removeConnectionBtn;
  }

  // Select the node that will be observed for mutations
  var targetNode = document.querySelector('.mn-connections')

  // Options for the observer (which mutations to observe)
  var config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
      if (mutation.type == 'childList' && mutation.addedNodes[0].localName === "li" ) {
        const container = mutation.addedNodes[0].querySelector( '.mn-connection-card__dropdown' );
        container.appendChild( createRemoveBtn() );
      }
    }
  };

  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
};
