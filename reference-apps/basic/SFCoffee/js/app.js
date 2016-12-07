$(function() {
	/**
   * Defined model and views:
	 */
	var ShopsModel = $.Model(shops);
	var ShopsView = $.View({
		element: '#shop-list',
    variable: 'coffeeshop',
		model: ShopsModel,
    template:
    '<li data-goto="coffeeShopDetail:{= coffeeshop.id }">\
        <img data-src="{= coffeeshop.image }" alt="{= coffeeshop.name }">\
        <div>\
          <h3>{= coffeeshop.name }</h3>\
          <h4>{= coffeeshop.location }</h4>\
          <p>{= coffeeshop.description }</p>\
        </div>\
        <aside><disclosure></disclosure></aside>\
      </li>'
	});
	ShopsView.render();

	var ShopDetailView = $.View({
		element: '#shopDetail',
    variable: 'choice',
    template:
    '<li>\
      <div>\
        <div class="horizontal-panel">\
          <img src="{= choice.image }" alt="{= choice.name }">\
          <div>\
            <h3>{= choice.name } <a class="offsiteLink" target="_blank" href="{= choice.site }"></a></h3>\
            <h4>{= choice.location }</h4>\
          </div>\
        </div>\
        <p>{= choice.content }</p>\
      </div>\
    </li>'
	});

	/**
   * Event handler to get to list of shops:
   */
	$('#exploreButton').on('tap', function() {
		$.GoToScreen('shops');
	});
	/**
   * Set up router:
   */
  var SelectedCoffeeRoute = $.Router();
  SelectedCoffeeRoute.addRoute([
    {
      route: 'coffeeShopDetail',
      callback: function(param) {
        var selectedShop = shops.filter(function(shop) {
          return shop.id === param;
        })[0];
        ShopDetailView.render(selectedShop);
      }
    }
  ]);

  /**
   * Setup up About info sheet:
   */
  var aboutApp = $('#aboutThisAppTemplate').html();
  $.Sheet({
    id: 'aboutSheet',
    handle: true,
    slideDown: true
  });
  
  /**
   * Register event to show sheet:
   */
  $('#aboutSheet').find('section').html(aboutApp);

  /**
   * Open About sheet:
   */
  $('#aboutThisApp').on('tap', function() {
		$.ShowSheet('#aboutSheet');
	});

  /**
   * Close About sheet:
   */
	$('#aboutSheet').find('button').on('tap', function() {
		$.HideSheet('#aboutSheet');
	});

});