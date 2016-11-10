$(function() {

  /**
   * Default variables:
   */
  var chosenGenre;

  /**
   * Define cart model:
   */
  var CartModel = $.Model([]);
  window.CartModel = CartModel;


  /**
   * Define App namespace:
   */
  var App = {

    GenreView: $.View({
      element: '#fragranceGenres'
    }),

    AvailableFragrancesView: $.View({
      element: '#availableFragrances',
      variable: 'fragrance'
    }),

    FragrancesGenreTitleView: $.View({
      element: '#fragrancesGenreTitle',
      variable: 'title'
    }),

    FragranceDetailView: $.View({
      element: '#fragranceDetail',
      variable: 'chosenFragrance'
    }),

    DetalTitleView : $.View({
      element: '#detailTitle',
      variable: 'title'
    }),

    CartView: $.View({
      element: '#purchaseItems',
      model: CartModel,
      variable: 'item'
    }),

    TotalItemsView: $.View({
      element: '#totalItems',
      variable: 'total'
    }),

    TotalCostView: $.View({
      element: '#totalCost',
      variable: 'total'
    }),

    TotalPurchasedItemsViews: $.View({
      element: '#purchaseDetails',
      variable: 'item',
      model: CartModel
    }),

    TotalPurchaseCostView: $.View({
      element: '#confirmTotalCost',
      variable: 'cost'
    })
  };

  App.GenreView.render(['ladies','men','kids']);

  /**
   * Add to cart:
   */
  $('#addToCart').on('tap', function() {
    var fragrance = $(this).data('fragrance');
    CartModel.push(fragrance);
    $.GoToScreen('cart');
    CartModel.orderBy('genre', 'product_title')
    App.CartView.render();
    var prices = CartModel.pluck('wholesale_price');
    var sum = 0;
    prices.map(function(price) {
      return sum += parseFloat(price);
    });
    App.TotalItemsView.render([CartModel.size()]);
    App.TotalCostView.render([$.currency(sum)]);

    App.TotalPurchaseCostView.render([$.currency(sum)]);
    $('#backToFragrance').find('span').text(fragrance.product_title);
  });

  /**
   * Popup for empty cart:
   */
  $.Popup({
    id: "emptyCart",
    title: 'Warning!', 
    message: 'There is nothing in the cart. Please add some items first.', 
    continueButton: 'OK'
  });

  /**
   * Go to cart:
   */
  $('#shoppingCart').on('tap', function() {
    if (!CartModel.size() > 0) {
      $('#emptyCart').ShowPopup();
    } else {
      $.GoToScreen('cart');
    }
  });

  /**
   * Cancel purchase:
   */
  $('#cancelOrder').on('tap', function() {
    CartModel.purge();
    App.TotalItemsView.empty();
    App.TotalCostView.empty();
    App.CartView.empty();
    $.GoBackToScreen('main');
  });

  /**
   * Place order:
   */
  $('#placeOrder').on('tap', function() {
    $.GoToScreen('confirmation');
    App.TotalPurchasedItemsViews.render();
    function confirmationNumber() {
      var d = Date.now();
      var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
      var randomLetter = charset[Math.floor(Math.random() * charset.length)];
      return randomLetter + 'xx-xxxx-xxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }
    $('#confirmationNum').text(confirmationNumber());
  });

  $('#backToCart').on('tap', function() {
    CartModel.purge();
    App.TotalItemsView.empty();
    App.TotalCostView.empty();
    App.CartView.empty();
  });

  /**
   * Define Routes:
   */
  var FragranzRoutes = $.Router();
  FragranzRoutes.addRoute([
    {
      route: 'fragranceList',
      callback: function(genre) {
        chosenGenre = [];
        fragrances.forEach(function(fragrance) {
          if (fragrance.genre === genre) {
            chosenGenre.push(fragrance)
          }
        });
        App.AvailableFragrancesView.render(chosenGenre);
        App.FragrancesGenreTitleView.render([genre]);
        $('#backToGenre span').text(genre);
      }
    },
    {
      route: 'detail',
      callback: function(sku) {
        var chosenFragrance = chosenGenre.filter(function(fragrance) {
          return fragrance.sku === sku;
        });
        App.FragranceDetailView.render(chosenFragrance);
        App.DetalTitleView.render([chosenFragrance[0].product_title])
        $('#addToCart').data('fragrance', chosenFragrance[0]);
      }
    }
  ]);

});