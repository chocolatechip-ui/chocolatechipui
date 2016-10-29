$(function() {
  var music = [
    {
      title: "Imagine Dragons",
      album: "Radioactive",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "The Hurry and the Harm",
      album: "Hurt",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae."
    },
    {
      title: "David Cook",
      album: "Permanent",
      description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem."
    },
    {
      title: "Kiss",
      album: "This Kiss",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas."
    },
    {
      title: "Willy Moon",
      album: "Yeah Yeah",
      description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non."
    }
  ];

  var docs = [
    {
      title: "Receipts",
      subtitle: "Lunch",
      amount: 24
    },
    {
      title: "Receipts",
      subtitle: "Gas",
      amount: 12
    },
    {
      title: "Receipts",
      subtitle: "Groceries",
      amount: 6
    },
    {
      title: "Utilities",
      subtitle: "Electiricity",
      amount: 1
    },
    {
      title: "Rent",
      subtitle: "Receipt",
      amount: 10
    },
    {
      title: "Legal",
      subtitle: "Car",
      amount: 5
    },
    {
      title: "Family",
      subtitle: "Legal",
      amount: 3
    },
    {
      title: "Personal",
      subtitle: "Will",
      amount: 1
    },
    {
      title: "Personal",
      subtitle: "Health Care",
      amount: 16
    }
  ]; 

  var recipes = [
    {
      name: "Italian Style Meatloaf",
      ingredients: [
        "1 1/2 pounds ground beef",
        "2 eggs, beaten",
        "3/4 cup dry bread crumbs",
        "1/4 cup ketchup",
        "1 teaspoon Italian-style seasoning",
        "1 teaspoon garlic salt",
        "1 (14.5 ounce) can diced tomatoes, drained"
      ],
      directions: [
      
        "Preheat oven to 350 degrees F (175 degrees C).",
        "In a large bowl, mix together ground beef, eggs, bread crumbs and ketchup. Season with Italian-style seasoning, oregano, basil, garlic salt, diced tomatoes and cheese. Press into a 9x5 inch loaf pan, and cover loosely with foil.",
        "Bake in the preheated oven approximately 1 hour, or until internal temperature reaches 160 degrees F (70 degrees C)."
      ]
    },
    {
      name: "Chicken Marsala",
      ingredients: [
        "1/4 cup all-purpose flour for coating",
        "1/2 teaspoon salt",
        "1/4 teaspoon ground black pepper",
        "1/2 teaspoon dried oregano",
        "4 skinless, boneless chicken breast halves - pounded 1/4 inch thick",
        "4 tablespoons butter",
        "4 tablespoons olive oil",
        "1 cup sliced mushrooms",
        "1/2 cup Marsala wine",
        "1/4 cup cooking sherry"
      ],
      directions: [
      
        "In a shallow dish or bowl, mix together the flour, salt, pepper and oregano. Coat chicken pieces in flour mixture.",
        "In a large skillet, melt butter in oil over medium heat. Place chicken in the pan, and lightly brown. Turn over chicken pieces, and add mushrooms. Pour in wine and sherry. Cover skillet; simmer chicken 10 minutes, turning once, until no longer pink and juices run clear."
      ]
    },
    {
      name: "Chicken Breasts with Lime Sauce",
      ingredients: [
        "4 skinless, boneless chicken breast halves - pounded to 1/4 inch thickness",
        "1 egg, beaten",
        "2/3 cup dry bread crumbs",
        "2 tablespoons olive oil",
        "1 lime, juiced",
        "6 tablespoons butter",
        "1 teaspoon minced fresh chives",
        "1/2 teaspoon dried dill weed"
      ],
      directions: [
      
        "Coat chicken breasts with egg, and dip in bread crumbs. Place on a wire rack, and allow to dry for about 10 minutes.",
        "Heat olive oil in a large skillet over medium heat. Place chicken into the skillet, and fry for 3 to 5 minutes on each side. Remove to a platter, and keep warm.",
        "Drain grease from the skillet, and squeeze in lime juice. Cook over low heat until it boils. Add butter, and stir until melted. Season with chives and dill. Spoon sauce over chicken, and serve immediately."
      ]
    },
    {
      name: "Lemon Rosemary Salmon",
      ingredients: [
        "1 lemon, thinly sliced",
        "4 sprigs fresh rosemary",
        "2 salmon fillets, bones and skin removed coarse salt to taste",
        "1 tablespoon olive oil, or as needed"
      ],
      directions: [
      
        "Preheat oven to 400 degrees F (200 degrees C).",
        "Arrange half the lemon slices in a single layer in a baking dish. Layer with 2 sprigs rosemary, and top with salmon fillets. Sprinkle salmon with salt, layer with remaining rosemary sprigs, and top with remaining lemon slices. Drizzle with olive oil.",
        "Bake 20 minutes in the preheated oven, or until fish is easily flaked with a fork."
      ]
    },
    {
      name: "Strawberry Angel Food Dessert",
      ingredients: [
        "1 (10 inch) angel food cake",
        "2 (8 ounce) packages cream cheese, softened",
        "1 cup white sugar",
        "1 (8 ounce) container frozen whipped topping, thawed",
        "1 quart fresh strawberries, sliced",
        "1 (18 ounce) jar strawberry glaze"
      ],
      directions: [
      
        "Crumble the cake into a 9x13 inch dish.",
        "Beat the cream cheese and sugar in a medium bowl until light and fluffy. Fold in whipped topping. Mash the cake down with your hands and spread the cream cheese mixture over the cake.",
        "In a bowl, combine strawberries and glaze until strawberries are evenly coated. Spread over cream cheese layer. Chill until serving."
      ]
    }
  ];

  var favorites = [
    "Pizza",
    "Ice Cream",
    "Software Development",
    "Baseball",
    "Movies",
    "Computer Games",
    "Music",
    "Debugging Code",
    "Hiking",
    "Puzzles"
  ];
  var templates = {
    music: `<li>
      <div>
        <h3>{= data.title }</h3>
        <h4>{= data.album }</h4>
        <p>{= data.description }</p>
      </div>
    </li>`,
    documents: `<li class="center-vertical">
      <h3>{= data.title }</h3>
      <h4>{= data.subtitle }</h4>
      <aside>
        <span class="counter">{= data.amount }</span>
      </aside>
    </li>`,
    recipes: `<li>
      <div>
        <h3>{= data.name }</h3>
        <h4>Ingredients</h4>
        <ul>
          {{ data.ingredients.forEach(function(ingredient) { }}
            <li>{= ingredient }</li>
          {{ }); }}
        </ul>
        <h4>Directions</h4>
        <ol>
          {{ data.directions.forEach(function(direction) { }}
            <li>{= direction }</li>
          {{ }); }}
        </ol>
      </div>
    </li>`,
    favorites: `<li>
       <h3>{= data }</h3>
    </li>`
  };

  /**
   * Define initial state of View:
   */
  var listView = $.View({
    element: "#myList",
    template: templates.music
  });
  listView.render(music);

  /**
   * Setup Slide Out:
   */
  var AppSlideOut = $.SlideOut();
  
  /** 
   * Notice names have `:` to indicate id for routing.
   * Id will be used to render view.
   */
  AppSlideOut.populate([
    { "choice:music": "Music" },
    { "choice:documents": "Documents"},
    { "choice:recipes": "Recipes" },
    { "choice:favorites": "Favorites" }
  ]);

  /**
   * Define Routes:
   */
  var App = $.Router();
  /**
   * Define routes to handle ids from slide out menu items:
   */
  App.addRoute([
    {
      /**
       * The route:
       */
      route: "choice", 
      /**
       * Callback to handle passed id:
       */
      callback: function(id) {
        /**
         * Method to render templates in switch statement:
         */
        var renderChosenTemplate = function(template, item) {
          listView.setTemplate(template);
          listView.render(item);
        };
        /**
         * Handle passed id:
         */
        switch (id) {
          case "music":
            renderChosenTemplate(templates.music, music);
            break;
          case "documents":
            renderChosenTemplate(templates.documents, docs);
            break;
          case "recipes":
            renderChosenTemplate(templates.recipes, recipes);
            break;
          case "favorites":
            renderChosenTemplate(templates.favorites, favorites);
            break;
        }
      }
    }
  ]);
});