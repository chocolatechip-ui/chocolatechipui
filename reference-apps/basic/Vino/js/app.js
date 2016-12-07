(function() {
  'use strict';
  $(function() {

    /**
     * Scope views and routes to App object:
     */
    var App = {

      /**
       * Define views:
       */
      SpecialRedsView: $.View({
        element: '#picksRed',
        variable: 'wine'
      }),

      SpecialWhitesView: $.View({
        element: '#picksWhite',
        variable: 'wine'
      }),

      SelectedWineView: $.View({
        element: '#wineDetail',
        variable: 'wine'
      }),

      FilteredWinesView: $.View({
        element: '#filteredWines',
        variable: 'wine'
      }),

      WineryView: $.View({
        element: '#viewWinery',
        noTemplate: true,
        events: [{
          event: 'tap',
          callback: function() {
            var location = $(this).attr('data-location');
            window.location.href= 'http://maps.apple.com/?q=' + location;
          }
        }]
      }),

      /**
       * Define router:
       */
      WineRoute: $.Router()
    };

    App.SpecialRedsView.render(bestWines[0].data);
    App.SpecialWhitesView.render(bestWines[1].data);


    /**
     * Get purchase sheet template:
     */
    var purchaseSheetTemplate = $('#purchaseSheetTemplate').html();

    /**
     * Setup up About info sheet:
     */
    var aboutContent = $('#aboutContent').html();
    $.Sheet({
      id: 'aboutSheet',
      handle: true,
      slideDown: true
    });
    $('#aboutSheet').find('section').html(aboutContent);

    /**
     * Define handler to show about sheet when use taps the info icon button:
     */
    $('#getInfo').on('tap', function() {
      $.ShowSheet('#aboutSheet');
    });

    /**
     * Define method to output hero image:
     */
    var outputHeroImg = function() {
      /**
       * Define method to randomize images:
       */
      var randomizeImage = function() {
        return Math.floor(Math.random()*69) + 1;
      };
      var randomImg = randomizeImage();
      /**
       * Set random image on page:
       */
      var imagePath = "./images/barrels/img-";
      if (window.innerWidth > 767) imagePath = "./images/barrels-ipad/img-";
      $('.hero').css('background-image', 'url(' + imagePath + randomImg + '.jpg)');
    };

    /**
     * Define handlers to show select wines from scroll panel:
     */
    App.WineRoute.addRoute([
      {
        route: 'selectedWine',
        callback: function(param) {
          var selectedWine = wines.filter(function(wine) {
            return wine.id === param;
          })[0];
          $('#selectWineType').text(selectedWine.type);
          $('#selectedWineVarietal').text(selectedWine.varietal);
          App.SelectedWineView.render(selectedWine);
          outputHeroImg();
          $('#viewWinery').attr('data-location', selectedWine.location);
        }
      }
    ]);

    /**
     * Define methods for search
     */
    var searchPanel = $('#searchPanel').html();
    var searchNavBar = $('#searchNavBarTemplate').html();

    var assembleSearchSheet = function () {
      $('#searchSheet section').html(searchNavBar + searchPanel);
    };

    var searchParameteresTemplate = $('#searchParameteresTemplate').html();
    $('#searchParameters').html(searchParameteresTemplate);
    $('#searchParameters-no-match').html(searchParameteresTemplate);

    $.Sheet({id:'searchSheet'});
    assembleSearchSheet();

    /**
     * Set up inital values for search parameters.
     */
    var searchParameters = {
      "type": "Red",
      "body": "Medium",
      "price": 20
    };

    /**
     * Handler to show chosen parameters for wine search:
     */
    var showChosenSearchParameters = function(element, parameters) {
      if (!parameters) return;
      element.find('.type').html(parameters.type);
      element.find('.body').html(parameters.body);
      element.find('.price').html('$' + parameters.price);
    };

    /**
     * Initialize segemented control behavior:
     */
    $.Segmented({
      element: '#typeSegmented',
      selected: 0, 
      callback: function() {
        searchParameters.type = $(this).text();
      }
    });

    $.Segmented({
      element: '#varietySegmented',
      selected: 1, 
      callback: function() {
        searchParameters.body = $(this).text();
      }
    });
      
    $('#search').on('tap', function() {
      $.ShowSheet('#searchSheet');
    });
    /**
     * Hide search sheet when user taps Cancel:
     */
    $('#searchSheet').on('tap', '#cancelSearch', function() {
      $.HideSheet('#searchSheet');
      /**
       * Turn off window resize for price range input:
       */
      window.onresize = null;
    });
    /**
     * Show initial value of price range input:
     */
    $('#priceRangeOutput > span').html('20');

    /**
     * Handle user interaction with price range input.
     */
    $('#priceRangeInput').on('input', function() {
      searchParameters.price = this.value;
      $('#priceRangeOutput').text(this.value);
    });

    /**
     * Event listener to search for wines:
     */
    $('#searchSheet').on('tap', '#startSearch', function() {
      
      /**
       * Filter wines based on user choices.
       * These are stored on searchParameters object:
       */
      var filteredWines = wines.filter(function(wine) {
        return wine.type === searchParameters.type && wine.body === searchParameters.body && parseInt(wine.price.split('$')[1],10) <= searchParameters.price;
      });

      /**
       * Close the search sheet:
       */
      $.HideSheet('#searchSheet');

      /**
       * Turn off window resize for price range input:
       */
      window.onresize = null;

      /**
       * Handle no match with chosen parameters:
       */
      if (filteredWines.length === 0) {
        $.GoToScreen('noMatch');
        /**
         * Show search parameters:
         */
        showChosenSearchParameters($('#searchParameters-no-match'), searchParameters);
      } else {
        /**
         * Go to wine list and show results:
         */
        $.GoToScreen('wineList');      

        /**
         * Show search parameters:
         */
        showChosenSearchParameters($('#searchParameters'), searchParameters);
        App.FilteredWinesView.render(filteredWines);
      }
    });

    /**
     * Define method for purchase process.
     * This will animate the progress bar:
     */
    var pval = 0;
    var progressInterval;
    var processProgress = function() {
      if (pval === 500) {
        /**
         * Make sure we are starting clean:
         */
        clearInterval(progressInterval);

        /**
         * Hide the progress panel:
         */
        $('#progressPanel').hide();

        /**
         * Show the confirmation panel:
         */
        $('#confirmationPanel').css('display', 'block');
        if ($('body').hasClass('isDesktop')) {
          $('#purchaseSheet').css('height', '140px');
        } else {
          $('#purchaseSheet').css('height', '180px');
        }

        /**
         * Set inital value for progress animation:
         */
        pval = 0;
      } else {

        $('#progressPanel').show();
        $('#purchaseSheet').css('height', '80px');
        /**
         * Increate the value for animation:
         */
        pval++;

        /**
         * Update the progress bar with new value:
         */
        $('progress').val(pval);
      }
    };

    $.Popup({
      id: "purchasePopup",
      message: 'Do you want to purchase wine?', 
      cancelButton: 'Cancel',
      continueButton: 'Purchase',
      callback: function() {
        $('#confirmationPanel').hide();
        setTimeout(function() {
          $('#progressPanel').show();
          $.ShowSheet('#purchaseSheet');
          progressInterval = setInterval(processProgress, 0);
        });
      }
    });

    /**
     * Initialize purchase sheet:
     */
    $.Sheet({id:'purchaseSheet'});
    
    /**
     * Populate purchase sheet
     */
    $('#purchaseSheet').find('section').html(purchaseSheetTemplate);    
    $('#selectedWine').on('tap', '.price', function(e) {
      var wine = $('#selectedWineVarietal').text().trim();
      var price = $(this).text().trim();
      $('#purchasePopup').find('.panel p').text('Do you want to purchase ' + wine + ' for ' + price + '?');
      $('#purchasePopup').ShowPopup();
    });

    /**
     * Define handler to display purchase sheet:
     */
    $('#confirmationPanel button').on('tap', function() {
      $.HideSheet('#purchaseSheet');
      $('#confirmationPanel').hide();
      $('#purchaseSheet').css('height', 80);

      /**
       * Delay showing the progress bar so it doesn't show while hiding the sheet:
       */
      setTimeout(function() {
        $('#progressPanel').show();
      }, 200);
    });
  });
})();