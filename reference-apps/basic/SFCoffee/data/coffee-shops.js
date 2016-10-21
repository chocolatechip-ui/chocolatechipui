var shops = [
	{
		"id": "blue_bottle",
		"name" : "Blue Bottle",
		"date": 'August 20, 2013',
		"location" : "315 Linden ST, SF (near Hayes ST &amp; Gough ST)",
		"site" : "http://www.bluebottlecoffee.com",
		"description" : "This alleyway kiosk is groundzero for the boutique coffee revolution in San Francisco.",	
		"image" : './images/cups/pic-1.png',
		"content" : [
			"This alleyway kiosk is groundzero for the boutique coffee revolution in San Francisco. There's always a line here... even in the late afternoon. The secret sauce? A promise. James Freeman, the Bill Walsh of SF coffee connoisseurship, founded BB on a commitment to use the “finest organic, and pesticide-free, shade-grown beans” and serve them less than “48 hours out of the roaster.” The food options are spartan, but we like the reasonable prices on the not-so-sweet baked goods. The baristas also give us far less attitude than those at any of the other coffee-geek havens; we like that we don't feel challenged to prove that we're cool enough to patronize this place."
		]
	},
	{
		"id": "four_barrel",
		"name" : "Four Barrel Coffee",
		"date": 'July 14, 2013',
		"location" : "375 Valencia ST (at 15th ST",
		"site" : "http://fourbarrelcoffee.com",
		"description" : "Four Barrel is a nice reminder that coffee shops should be a social space.",	
		"image" : './images/cups/pic-2.png',
		"content" : [
			"Four Barrel coffee and treats. While many bars in the Mission are flooded with people glued to their laptops, Four Barrel is a nice reminder that coffee shops should be a social space. With well-sourced and delicious coffee, Four Barrel is the perfect spot for a casual business meeting or gossip session with your buds. The outdoor seating and delicious treats (maple-bacon dynamo donuts!) is the whipped cream on my mocha."
		]
	},
	{
		"id": "crossroads",
		"name" : "Crossroads Cafe",
		"date": 'June 18, 2013',
		"location" : "699 Delancey ST (at Brannan ST)",
		"site" : "http://www.delanceystreetfoundation.org/entercafe.php",
		"description" : "Crossroads Cafe seems aptly named due to its main features as a book store and peaceful garden.",	
		"image" : './images/cups/pic-3.png',
		"content" : [
			"Crossroads Cafe seems aptly named due to its main features as a book store and peaceful garden. If you are looking for a place to get out the laptop and get some work done, this place is not for you. Same goes if you are meeting someone to show them an online demo of your latest project. Why? No WiFi is available at Crossroads Cafe. While former inhabitants of Pier 39 used to love the convenience of this peaceful spot, it can still prove as a nice spot to chat if you are not in a hurry. It may be a bit out of the way for most these days."
		]
	},
	{
		"id": "grove",
		"name" : "The Grove",
		"date": 'May 9, 2013',
		"location" : "Hayes Valley",
		"site" : " http://www.thegrovesf.com",
		"description" : "Food at the Grove seems a bit healthier than the norm.",	
		"image" : './images/cups/pic-4.png',
		"content" : [
			"The Grove is conveniently located between downtown and SOMA, and its food “seems” like it is a bit healthier than the norm. Add to that a fireplace or nice outdoor seating, and the ambiance is good too. The downside for me is you get a code for the WiFi when you pay. Not only that, it can be hard to find a seat if you are there anywhere near lunch time. The bottom line is that it might be a good spot to catch up with a friend you’ve met before. They are likely someone you don’t have to worry about getting a seat right away with, and you don’t have to hear every single word they are saying."
		]
	},
	{
		"id": "ritual",
		"name" : "Ritual Coffee Roasters",
		"date": 'April 12, 2013',
		"location" : "1026 Valencia ST, SF (between 21st ST and 22nd ST)",
		"site" : "http://www.ritualroasters.com",
		"description" : "Ritual pioneered the roastery-cum-cafe experience in the Mission.",	
		"image" : './images/cups/pic-5.png',
		"content" : [
			"Ritual pioneered the roastery-cum-cafe experience in the Mission. They source their own beans, seeking out the best varietals by geography, altitude, soil, shade, and harvests. Ritual brews both coffee and controversy, ranging from the Soviet-inspired logo to the removal of the power outlets. (Sorry, all day Tweeters.) But they offer a great cup of coffee and they've even shared their brewing guide."
		]
	},
	{
		"id": "grind",
		"name" : "The Grind Cafe",
		"date": 'March 16, 2013',
		"location" : "783 Haight ST, SF (between Scott ST and Pierce ST)",
		"site" : "http://www.thegrindcafe.com",
		"description" : "The Grind Cafe has partnered with some of the titans of SF dining.",	
		"image" : './images/cups/pic-6.png',
		"content" : [
			"The Grind Cafe has partnered with some of the titans of SF dining, Mr Espresso, Boudin Bakery and Niman Ranch. Lucky they have vaulted ceilings to provide sufficient headroom and natural lighting. There's free Wi-Fi during the week. On the weekends, hit up the french toast croissant wopped with fruit. Don't worry, it won't hit back. This is your refuge from the Haight street panhandling."
		]
	},
	{
		"id": "coffee_bar",
		"name" : "Coffee Bar",
		"date": 'February 11, 2013',
		"location" : "1890 Bryant ST, SF (Corner of Florida ST)",
		"site" : "http://www.coffeebarsf.com",
		"description" : "The clean, industrial look is surprisingly welcoming.",	
		"image" : './images/cups/pic-7.png',
		"content" : [
			"Can't a guy keep one secret? Guess not. A gem on the corner of Bryant x Florida, the Coffee Bar warrants a spot in your regular rotation. They know their beans... one of the owners is the son of Mr. Espresso. The clean, industrial look is surprisingly welcoming. Lots of Silicon Valley rainmakers play hooky here. On a spring day, expect abundant sunshine and MacBooks."
		]
	},
	{
		"id": "atlas",
		"name" : "Atlas Cafe",
		"date": 'January 4, 2013',
		"location" : "3049 20th ST, SF (at Alabama ST)",
		"site" : "http://www.atlascafe.net",
		"description" : "Hang out on their back patio with a cup of Equator coffee.",	
		"image" : './images/cups/pic-8.png',
		"content" : [
			"Who let the dogs out? I can't help you there... but the Atlas Cafe lets the dogs in. Hang out on their back patio with the morning paper, man's best friend, and a cup of Equator coffee. For a morning snack, indulge with a $1 Mission Mini, you deserve it. Thursday nights are special here—live music from 8-10pm or ragtime & blues on Saturday from 4-6pm."
		]
	},
	{
		"id": "philz",
		"name" : "Philz",
		"date": 'December 23, 2012',
		"location" : "3101 24th ST, SF (at Folsom ST)",
		"site" : "http://www.philzcoffee.com",
		"description" : "Has over 20 handmade coffees brewed one cup at a time",	
		"image" : './images/cups/pic-9.png',
		"content" : [
			"Sorry folks, the Philz phenomenom is creeping outside SF. The reason? Discerning folks appreciate over 20 handmade coffees brewed one cup at a time. The go-to order is the Tesora blend. For special occassions, try the mint mojito iced coffee... smooth and chocolatey, decadent and refreshing. Patrons seem to be able to concentrate even though the pours probably have 3x the caffeine."
		]
	},
	{
		"id": "bernies",
		"name" : "Bernie's",
		"date": 'November 12, 2012',
		"location" : "3966 24th ST, SF (between Noe ST and Sanchez ST)",
		"site" : "https://www.facebook.com/BerniesCoffee",
		"description" : "The local coffee shop with bed and breakfast-like amicability and tranquility.",	
		"image" : './images/cups/pic-10.png',
		"content" : [
			"Bernie's is much too humble... \"a local coffee shop?\" no, THE local coffee shop with bed and breakfast-like amicability and tranquility. The owner, a third generation Noe Valley resident, will quickly match your face with your name and drink of choice. Reciprocate her smile and you'll have another friend along with a free refill. Milkbones gratis for the dogs (the people food is good too)."
		]
	}
]