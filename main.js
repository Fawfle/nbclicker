var game = {
	points: 0,
	totalPoints: 0,
	totalClicks: 0,
	clickpercent: 0,
	bitches: 0,
	totalBitches: 0,
	prestigePoints: 0,
	multiplier: 1,
	globalMultiplier: 1,
	prestigeMulti: 1,
	prestigeAchievementMulti: 0,
	gnFrequency: 300000, // 5 min
	gnDuration: 10000,  // 10 sec
	version: "0.2.6",
	visited: false,
	exp:0,
	expClickPower: 1,
	levelRequirement: 50,
	level: 0,
	skillPoints: 0,
	expClickPower: 1,
	expFlatBonus: 0,
	expBonusPerBuilding: 0,
	expClickMultiplier:  1,
	expBuildingMultiplier: 1,
	skillClickPower: 1,
	skillBuildingPower: 1,

	addPoints: function(amount) {
	this.points += amount;
	this.totalPoints += amount;
	this.totalClicks ++;
	display.updateAll();
	bitches.getBitches();
	},
	getMultiplier: function() {
		game.multiplier = game.globalMultiplier * game.temporaryMultiplier * game.prestigeMulti * (1 + game.prestigeAchievementMulti * achievement.totalAchievements()) * (1 + game.level * 0.1)
		display.updateShop();
		display.updateInfoMenu();
	},
	getPointsPerSecond: function() {
		var pointsPerSecond = 0;
		for (i = 0; i < building.name.length; i++){
			pointsPerSecond += ((building.income[i] * building.count[i]) * game.multiplier)
		}
		pointsPerSecond *= game.skillBuildingPower
		return pointsPerSecond;
	},
	getExpPerSecond: function() {
		var ExpPerSecond = 0;
		for (i = 0; i < buildingTwo.name.length; i++){
			ExpPerSecond += ((game.expFlatBonus + buildingTwo.income[i]) * buildingTwo.count[i]) * game.expBuildingMultiplier
		}
		ExpPerSecond *= skills.getExpBonusPerBuilding()
		return ExpPerSecond;
	}
};

var building = {
	name: ["Cursor","Chimp","Grandma","Rocket","Simp Sauce","Supercomputer","Gnome"],
	namePlural: ["Cursors","Chimps","Grandmas","Rockets","Simp Sauce","Supercomputers","Gnomes"],
	image: ["cursor.png","chimp.png","grandma.png","rocket.png","simpsauce.png","supercomputer.png","gnome.png"],
	count: [0,0,0,0,0,0,0],
	highestCount: [0,0,0,0,0,0,0],
	income: [1,8,47,260,1400,7800,44000],
	basecost: [100,1100,12000,130000,1400000,20000000,330000000],
	cost: [100,1100,12000,130000,1400000,20000000,330000000],
	tooltip:["They click for you!","unpaid labor!",	"They're a Placeholder!","Search the galaxy for bitches!","Guaranteed to Get YOU Bitches!","Use advanced algorithms to help you get Bitches!","They use ancient eldritch magic to search for Bitches!"],
	discount: 1,
	purchase: function(index) {
		if (game.points >= this.cost[index]) {
			game.points -= this.cost[index];
			this.count[index]++;
			updateDiscount();
			if (this.highestCount[index] < this.count[index]) {this.highestCount[index] = this.count[index]}
			display.updatePoints();
			display.updateShop();
			display.updateTotalBuildings();
			game.getMultiplier();
			display.updateHighestBuilding();
			display.updateUpgrades();
			display.checkAchievements();
		}
	},
	gettotal: function() {
		totalCount = 0;
		for (i = 0; i < this.count.length; i++) {
			totalCount += this.count[i];
		}
		return totalCount
	},
	total: 0
} 
function updateDiscount() {
	for (i=0; i<building.name.length; i++){
		building.cost[i] = Math.round((building.basecost[i] * building.discount) * Math.pow(1.15,building.count[i]));
	}
}
var buildingTwo = {
	name: ['Murder','Mining'],
	image:['murder.png','mining.png'],
	count:[0,0],
	highestCount:[0,0],
	income:[0.1,0.45],
	basecost:[60,300],
	cost:[50,250],
	tooltip:['Tried and True','Find all the valuables!'],
	purchase: function(index) {
		if (game.exp >= this.cost[index]) {
			game.exp -= this.cost[index];
			this.count[index]++;
			buildingTwo.cost[index] = Math.round(buildingTwo.basecost[index] * Math.pow(1.15,buildingTwo.count[index]));
			if (this.highestCount[index] < this.count[index]) {this.highestCount[index] = this.count[index]}
			display.updateGameTwo();
			display.updateShop();
			game.getMultiplier();
			display.checkAchievements();
		}
	},
	total: function() {
		let total = 0
		for (i=0; i<buildingTwo.name.length; i++) {
			total += buildingTwo.count[i]
		}
		return total
	}
}
var upgrade = {
	name: [
		"Precursors","Wood Cursors",  "Stone Cursors",  "Gold Cursors",  "Iron Cursors",  "Diamond Cursors",
		"Bananas",  "More Bananas",  "Genetic Modification",  "Cocaine","Crush the Rebellion", 
		"Ritual Rolling Pins","Underworld Ovens","One Mind",  "Communal Brainsweep",  "Elder Pact",
		"Anti Matter Rockets",  "Nano electrokinetic thruster",  "Faster than Light","Quantum Teleportation","Dyson Sphere",
		"Medium",  "Hot",  "Hell","Bigger Bottles","Industrial Barrels",
		"2040 Core Processor","Nvidia GeForce RTX 690690","Machine Learning","Atomic Transistors","Quantum Computing",
		"Gaming Mouse",  "Better Gaming Mouse",  "An actual Mouse",
		"Prepointer","Wood Clicks","Stone Clicks","Gold Clicks","Iron Clicks","Diamond Clicks",
		"Fedora","Neckbeard","Victory Royale",
		"Book of the Bitch","How to get any woman you want","Tax Evasion","Pyramid Scheme","Hygine","Multi-Level Marketing",
		"Cat","Dog","McDonalds",
		"Gnomeo and Juliet","Gnome Alone","The Greatest Gnomeman","Game of Gnomes", "Sherlock Gnomes",
		"Dino Nuggies","Disarming Personality","Haggling","Coupons","Factory",
		"Poor Working Conditions","Elder Pledge","Time Travel","Secret Formula","Hardest Drive","I'm Sorry","Tinder","Honey","Mousepad",
		"Pick up Lines","Day Trader","Ferret","Small Crime","Golden Nuggets","Crime Lord","NFT"
	],
	flavorText: [
		"Get it?","Cursors are now made of wood!",  "They're hard!",  "Shiny!",  "Harder!",  "It's a reference!",
		"Feed your chimps!",  "I'm out of ideas!",  "It's definitely safe!", "Don't worry, they're fine!","strip them of their rights (further)",
		"The result of years of scientific research!","Powered by science, of course!","We are one. We are many.",  "We fuse. We merge. We grow.",  "squirm crawl slither writhe today we rise",
		"Reach new heights!",  "I don't know what it does... But it's better!",  "Go faster than any man has gone before!","Beam me up, Scotty","Near unlimited energy!",
		"Spicier.","It's getting pretty hot","Hotter than Hell!","More Sauce!","Mass Produced",
		"So many Cores!","The best graphics card on the market!","Utilize the power of AI!","Beat Moore's Law!","Qubits Baby!",
		"Ergonomic","It's better!","Just... Don't ask.",
		"Guess the joke doesn't really work","Reusing Content!","Stronger!","Gilded!","Click like its 8th Century BC!","Its a reference! (Again!)",
		"Truly Fashionable","M'Lady","Impress the ladies with your gamer skill!",

		"The definitive guide to bitches!","Caution: Extremely Powerful","Don't let the government take your BP!","Easy Money","You've never tried it","Actually Legal!",
		"Cat, more like creatively bankrupt","I'm out of ideas! (For the second time)",
		"Get more Nuggets!",
		"The 4rd Best Movie ever Made","They're inside your home","\"The Gnomefather of children'	s entertainment\"","All Gnomes must die","The Peak of Cinema",
		"Delicious","Talk your way into anything!","It's like a game!","Get rewarded for hoarding!","Take control of nugget production",
		"Cut Corners!","This is simple ritual involving anti-aging cream, cookie batter mixed in the moonlight, and a live chicken.","I bet you didn't notice these upgrades triple BP","I'm pretty sure half these ingredients aren't legal","I've just given up at this point","But you have to see this","Find The Women","Saves you money","Improved Performance",
		"Sorry, I had to do it","A real mans job","Exotic","A Humble Start","Glistening","be your own boss!","They're all the rage"
	],
	image: [
		"cursorupg1.png","cursorupg2.png","cursorupg3.png","cursorupg4.png","cursorupg5.png","cursorupg6.png","chimpupg1.png","chimpupg2.png","chimpupg3.png","chimpupg4.png","chimpupg5.png","grandmaupg1.png","grandmaupg2.png","grandmaupg3.png","grandmaupg4.png","grandmaupg5.png","rocketupg1.png","rocketupg2.png","rocketupg3.png","rocketupg4.png","rocketupg5.png","simpsauceupg1.png","simpsauceupg2.png","simpsauceupg3.png","simpsauceupg4.png","simpsauceupg5.png","supercomputerupg1.png","supercomputerupg2.png","supercomputerupg3.png","supercomputerupg4.png","supercomputerupg5.png",
		"clickchanceupg1.png","clickchanceupg2.png","clickchanceupg3.png",
		"pointerupg1.png","pointerupg2.png","pointerupg3.png","pointerupg4.png","pointerupg5.png","pointerupg6.png",
		"globalmulti1.png","globalmulti2.png","globalmulti3.png",
		"prestigechanceupg1.png","prestigechanceupg2.png","prestigemultiupg1.png","prestigemultiupg2.png","prestigechanceupg3.png","prestigemultiupg3.png","prestigeachievementmulti1.png","prestigeachievementmulti2.png",
		"prestigenuggetfrequency1.png",
		"gnomeupg1.png","gnomeupg2.png","gnomeupg3.png","gnomeupg4.png","gnomeupg5.png",
		"prestigenuggetduration1.png","discount1.png","discount2.png","discount3.png","prestigenuggetfrequency2.png",
		"chimpupg6.png","grandmaupg6.png","rocketupg6.png","simpsauceupg6.png","supercomputerupg6.png","gnomeupg6.gif","globalmulti4.png","discount4.png","clickchanceupg4.png",
		"prestigechanceupg4.png","prestigemultiupg4.png","prestigeachievementmulti3.png","prestigemultiupg5.png","prestigenuggetduration2.png","prestigemultiupg6.png","prestigeachievementmulti4.png"
	],
	type: [
		"building","building","building","building", "building", "building",
		"building","building","building", "building","building",
		"building","building","building","building","building",
		"building","building","building","building","building",
		"building","building","building","building","building",
		"building","building","building","building","building",
		"clickchance","clickchance","clickchance",
		"clickpercent","clickpercent","clickpercent","clickpercent","clickpercent","clickpercent",
		"globalmulti","globalmulti","globalmulti",

		"prestigechance","prestigechance",
		"prestigemulti","prestigemulti",
		"prestigechance","prestigemulti",
		"prestigeachievementmulti","prestigeachievementmulti",
		"prestigenuggetfrequency",
		"building","building","building","building","building",
		"prestigenuggetduration","discount","discount","discount","prestigenuggetfrequency",
		"building","building","building","building","building","building","globalmulti","discount","clickchance",
		"prestigechance","prestigemulti","prestigeachievementmulti","prestigemulti","prestigenuggetduration","prestigemulti","prestigeachievementmulti"
	],
	cost:[
		540,2600,27500,3575000,30000000,5000000000,  // cursors

		5800,15000,355000,36000000,2750000000, // chimps

		120000,600000,6000000,600000000,60000000000, // grandmas

		1300000,6500000,65000000,6500000000,650000000000, // rockets

		14000000,70000000,700000000,70000000000,7000000000000, // sauce

		200000000,1000000000,10000000000,1000000000000,100000000000000, // computer

		2000,10000,100000,  // clickchance

		2000,10000,100000,10000000,1000000000,100000000000, // clickpercent

		10000000,100000000,1000000000, // global multiplier

		1,5,1,3,15,12,5,15,5,
		3300000000,16500000000,165000000000,16500000000000,1650000000000000,
		15,
		10000000,100000000,1000000000, 30,
		50000000000,550000000000,6000000000000,65000000000000,700000000000000,10000000000000000,10000000000,10000000000,1000000000,
		45,35,45,90,90,200,120
	],
	buildingIndex:[
		0,0,0,0,0,0,
		1,1,1,1,1,
		2,2,2,2,2,
		3,3,3,3,3,
		4,4,4,4,4,
		5,5,5,5,5,

		null,null,null,  //clickchance
		0,0,0,0,0,0,  // clickpercent
		null,null,null, // global multiplier
		null,null, // prestige upgrades
		null,null,null,null,null,null,null,6,6,6,6,6,
		null,null,null,null,null,
		1,2,3,4,5,6,null,null,null,
		null,null,null,null,null,null,null
	],
	requirement: [
		1,5,25,50,100,150,
		1,5,25,50,100,
		1,5,25,50,100,
		1,5,25,50,100,
		1,5,25,50,100,
		1,5,25,50,100,
		100,1000,5000, // clickchance
		1,5,25,50,100,150, // clickpercent
		100,200,300, //global multiplier

		//prestige upgrades
		null,null,null,null,null,null,null,null,null,1,5,25,50,100,
		null,100,200,300,null,
		150,150,150,150,150,150,400,400,10000,
		null,null,null,null,null,null,null
	],
	bonus: [
		// Buildings: 2 Clickchance: 0.5 Clickpercent: 0.01 Globalmulti: 2 Discount: 0.01
		// Prestigechance: 0.5 Prestigemulti: 4 Achievementmulti: 0.2 nuggetfrequency: 60000 nuggetduration: 5000
		2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
		0.5,0.5,0.5,
		0.01,0.01,0.01,0.01,0.01,0.01,
		2,2,2,
		0.5,0.5,
		4,4,0.5,4, 
		0.2,0.2,
		60000,
		2,2,2,2,2,
		5000,0.01,0.01,0.01,60000,
		3,3,3,3,3,3,2,0.01,0.5,
		0.5,4,0.2,4,5000,4,0.2
	],
	purchased: [],
	shown: [],
	upgradeTotal: function() {
		let total = 0;
		let prestigetotal = 0;
		for (i=0; i<this.name.length; i++){
			if (this.type[i] == "prestigechance" || this.type[i] == "prestigemulti" || this.type[i] == "prestigeachievementmulti" || this.type[i] == "prestigenuggetfrequency"|| this.type[i] == "prestigenuggetduration") {
				prestigetotal ++;
			} else {
				total ++;
			}
		}
		document.getElementById("upgradeTotal").innerHTML =total;
		document.getElementById("prestigeUpgradeTotal").innerHTML =prestigetotal;
	},
	totalUpgrades: function(){
		let total = 0;
		let prestigetotal=0;
		for (i=0; i<this.name.length; i++) {
			if (this.purchased[i] == true){
				if (this.type[i] === "prestigechance" || this.type[i] === "prestigemulti" || this.type[i] == "prestigeachievementmulti" || this.type[i] == "prestigenuggetfrequency"|| this.type[i] == "prestigenuggetduration") {
					prestigetotal ++;
				} else {
					total ++;
				}
			}
		}
		document.getElementById("totalUpgrades").innerHTML = total;
		document.getElementById("prestigeTotalUpgrades").innerHTML = prestigetotal;
	},
	purchase: function(index) {
		if(upgrade.purchased[index] == false && game.points >= upgrade.cost[index]) {
			if (upgrade.type[index] == "building" && building.count[upgrade.buildingIndex[index]] >= upgrade.requirement[index]) {
				game.points -= upgrade.cost[index];
				building.income[upgrade.buildingIndex[index]] *= upgrade.bonus[index];
				upgrade.purchased[index] = true;
				display.updateAll();
			} else if (upgrade.type[index] == "clickpercent" && building.count[upgrade.buildingIndex[index]] >= upgrade.requirement[index]){
				game.points -= upgrade.cost[index];
				game.clickpercent += upgrade.bonus[index];
				upgrade.purchased[index] = true;
				display.updateAll();
			} else if (upgrade.type[index] == "clickchance" && game.totalClicks >= upgrade.requirement[index]){
				game.points -= upgrade.cost[index];
				bitches.clickChance *= upgrade.bonus[index]
				upgrade.purchased[index] = true;
				display.updateAll();
			} else if (upgrade.type[index] == "globalmulti" && building.total >= upgrade.requirement[index]) {
				game.points -= upgrade.cost[index];
				game.globalMultiplier *= upgrade.bonus[index];
				upgrade.purchased[index] = true;
				display.updateAll();
				game.getMultiplier();
			}else if (upgrade.type[index] == "discount" && building.total >= upgrade.requirement[index]) {
				game.points -= upgrade.cost[index];
				building.discount -= upgrade.bonus[index];
				upgrade.purchased[index] = true;
				display.updateAll();
				game.getMultiplier();
			}
		} 
		if (upgrade.purchased[index] == false && game.prestigePoints >= upgrade.cost[index]) {
			if (upgrade.type[index] == "prestigechance") {
				game.prestigePoints -= upgrade.cost[index];
				bitches.buildingChance *= upgrade.bonus[index];
				upgrade.purchased[index] = true;
				display.updateAll();
			} else if (upgrade.type[index] == "prestigemulti") {
				game.prestigePoints -= upgrade.cost[index];
				game.prestigeMulti *= upgrade.bonus[index];
				upgrade.purchased[index] = true;
				display.updateAll();
				game.getMultiplier();
			}else if (upgrade.type[index] == "prestigeachievementmulti") {
				game.prestigePoints -= upgrade.cost[index];
				game.prestigeAchievementMulti += upgrade.bonus[index];
				upgrade.purchased[index] = true;
				display.updateAll();
				game.getMultiplier();
			}else if (upgrade.type[index] == "prestigenuggetfrequency") {
				game.prestigePoints -= upgrade.cost[index];
				game.gnFrequency -= upgrade.bonus[index];
				upgrade.purchased[index] = true;
				display.updateAll();
				game.getMultiplier();
			}else if (upgrade.type[index] == "prestigenuggetduration") {
				game.prestigePoints -= upgrade.cost[index];
				game.gnDuration += upgrade.bonus[index];
				upgrade.purchased[index] = true;
				display.updateAll();
				game.getMultiplier();
			}
		}
		upgrade.totalUpgrades();
	},
};

var skills = {
  name: ['XP Click Power','XP Building Power','Button Size','Building Bonus','XP Click Multiplier','XP Building Multiplier','BP Click Power','BP Building Power'],
  basecost: [1,1,2,2,2,2,3,3],
  cost: [1,1,2,2,2,2,2,2],
  count: [0,0,0,0,0,0,0,0],
  max: [null,null,7,7,null,null,null,null],
  requirement:[0,0,5,5,10,10,15,15],
  description: ['EXP Clicks give +1.5 exp','EXP buildings give +0.06 EXP per second','EXP Button is larger','Gain +0.2% EXPpS per EXP building','EXP Clicks give +20% more','EXP buildings give +7% more EXP','BP Button Clicks give 5% more','BP Buildings give 2% more'],
  purchase: function(index) {
  	if (skills.count[index] != skills.max[index]) {
    if (game.skillPoints >= skills.cost[index]) {
    game.skillPoints -= skills.cost[index]
    skills.count[index] ++;
    skills.cost[index] = skills.basecost[index] * Math.floor(1 + skills.count[index] / 5)
    display.updateSkills() 
	display.updateShop();
    }
    }
  },
  updateSkillBonus: function() {
	  game.expClickPower = 1 + (skills.count[0] * 1.5) // click power
	  game.expFlatBonus = 0.06 * skills.count[1] // building power
	  movingClicker.xMax = 90 - skills.count[2] // button size
	  movingClicker.yMax = 70 - (skills.count[2] * 3)
	  r.style.setProperty('--moving-clicker-width',`${9.9 + (skills.count[2])}%`)
	  game.expBonusPerBuilding =  skills.count[3] * 0.002 // Building Bonus
	  game.expClickMultiplier =  1 + (skills.count[4] * 0.2) // Click Multiplier
	  game.expBuildingMultiplier = 1 + (0.07 * skills.count[5]) // Building Multiplier
	  game.skillClickPower = 1 + (0.05 * skills.count[6]) //  normal click power
	  game.skillBuildingPower = 1 + (0.02 * skills.count[7])// normal building poewer
  },
resetSkillPoints: function() {
	game.skillPoints = 0
	for (i = 1; i < game.level + 1; i++) {
	  game.skillPoints += (1 + Math.floor((i - 1) / 10))
	} for (i=0; i<skills.name.length; i++) {skills.count[i] = 0; skills.cost[i] = skills.basecost[i]}
	display.updateSkills();
	display.updateShop();
  },
	getExpBonusPerBuilding: function() {
		let value = 1 + buildingTwo.total() * game.expBonusPerBuilding
		return value
	}
}
function ascend() {
if(confirm("Are you sure you want to prestige? Your bitches will be converted into HM which can be used on special upgrades. Remember: You will loose all progress except HM and achievements")) {
	game.prestigePoints += game.bitches;
	game.points = 0;
	game.clickpercent = 0;
	game.globalMultiplier = 1;
	game.bitches = 0;
	bitches.clickChance = 50000;
	bitches.buildingChance = 1000000;
	building.total = 0;
    building.income = [1,8,47,260,1400,7800,44000]
	building.discount = 1;
	for (i = 0; i<building.name.length; i++) {
		building.count[i] = 0
	}
	for (i=0; i<upgrade.name.length; i++) {
		if (upgrade.type[i] != "prestigechance") {
			if (upgrade.type[i] != "prestigemulti") {
				if (upgrade.type[i] != "prestigeachievementmulti") {
					if (upgrade.type[i] != "prestigenuggetfrequency") {
						if (upgrade.type[i] != "prestigenuggetduration") {
							upgrade.purchased[i] = false;
							upgrade.shown[i] = false;
						}
					}
				}
			}
		}
	}
	display.updateAll();
	upgrade.totalUpgrades();
}
};

var achievement = {
	name: [
		"Finger King","You Can Count on Me",
		"Prime-mates","Planet of the Apes",
		"Bake the world a better place","Grandmapocalypse",
		"Space Colonization","Space Empire",
		"Lost in the Sauce","Saucy Boy",
		"Gaming Setup","Sentience",
		"Elon Musk","Bezos",
		"Clicktastic","Carpal Tunnel","Click Jonas",
		"You Got Bitches!","More!","Why you no play cookie clicker?","Pimp",
		"Gnomies","They're Always Watching",
		"3rd Finger","Ape Shit","InstaGram","Artificial Planets","Tang","Takeover","True Form"
	],
	description: [
		"Buy 50 Cursors","Buy 100 Cursors",
		"\"Befriend\" 50 Chimps","\"Aquire\" 100 Chimps",
		"Buy 50 Grandmas","Buy 100 Grandmas",
		"Buy 50 Rockets","Buy 100 Rockets",
		"Buy 50 Simp Sauce","Buy 100 Simp Sauce",
		"Buy 50 Supercomputers","Buy 100 Supercomputers",
		"Get 420 Million BP","Get 69 Billion BP",
		"Click 1000 times","Click 5000 times","Click 10000 times",

		"Get Bitches","Get 5 Bitches","Get 10 Bitches","get 25 bitches",
		"Awaken 50 Gnomes","Awaken 100 Gnomes",
		"Buy 150 Cursors","Buy 150 Chimps","Buy 150 Grandmas","Buy 150 Rockets","Buy 150 Simp Sauce","Buy 150 Supercomputers","Awaken 150 Gnomes"
	],
	image: [
		"cursor.png","cursorach2.png",
		"chimp.png","chimpach2.png",
		"grandmaach1.png","grandmaach2.png",
		"rocketach1.png","rocketach2.png",
		"simpsauceach1.png","simpsauceach2.png",
		"supercomputerach1.png","supercomputerach2.png",
		"totalbpach1.png","totalbpach2.png",
		"pointer.png","clickach2.png","clickach3.png",

		"bitchesach1.png","bitchesach2.png","bitchesach3.png","bitchesach4.png",
		"gnomeach1.png","gnomeach2.png",
		"cursorach3.png","chimpach3.png","grandmaach3.png","rocketach3.png","simpsauceach3.png","supercomputerach3.png","gnomeach3.png"
	],
	type: [
		"building","building",
		"building","building",
		"building","building",
		"building","building",
		"building","building",
		"building","building",
		"points","points",
		"click","click","click",

		"bitches","bitches","bitches","bitches",
		"building","building",
		"building",	"building",	"building",	"building",	"building",	"building",	"building"
	],
	requirement: [
		50,100,
		50,100,
		50,100,
		50,100,
		50,100,
		50,100,
		420000000,69000000000,
		1000,5000,10000,
		1,5,10,25,
		50,100,
		150,150,150,150,150,150,150
	],
	buildingIndex: [
		0,0,
		1,1,
		2,2,	
		3,3,
		4,4,
		5,5,
		null,null, // points
		null,null,null, // clicks
		null,null,null,null, // bitches
		6,6,
		0,1,2,3,4,5,6
	],
	awarded: [], 
	shown: [],
	totalAchievements: function(){ 
		total = this.awarded.filter(value => value === true).length;
		document.getElementById("totalAchievements").innerHTML = total
		return this.awarded.filter(value => value === true).length
	},
	achievementTotal: function() {
		total = this.name.length
		return total
	},

	earn: function(index) {
		this.awarded[index] = true;
		this.totalAchievements();
		display.updateInfoMenu();
		if (this.shown[i] === false) {
			display.createNotification("New Achievement Unlocked!",6)
			this.shown[index] = true
		}
	}
};

var display = {
	updatePoints: function() {
		document.getElementsByClassName("points")[menu.displayIndex].innerHTML = abbreviateNumber(Math.round(game.points * 100)/100);
		document.getElementById("prestigePoints").innerHTML = abbreviateNumber(game.prestigePoints);
		document.getElementById("pointsPerSecond").innerHTML = abbreviateNumber(Math.round(game.getPointsPerSecond() * 100) / 100);
		document.title = abbreviateNumber(game.bitches) + " Bitches - NB Clicker"
		document.getElementById("ascendPreview").innerHTML = abbreviateNumber(game.bitches)
	},
	
	updateShop: function() {
		document.getElementById("shopContainer").innerHTML = "";
		document.getElementById("shopContainer2").innerHTML = "";
		for (i= 0; i < building.name.length; i++) {
			document.getElementById("shopContainer").innerHTML += '<span title="'+building.tooltip[i]+'\nBP per '+building.name[i]+': '+abbreviateNumber(Math.round((building.income[i] * game.multiplier) * 100) / 100)+'\nTotal BPpS: '+abbreviateNumber(Math.round((building.income[i] * game.multiplier * building.count[i]) * 100) / 100)+'""><table id="'+building.name[i]+'" class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><img draggable="false" ondragstart="return false;" src="images/'+building.image[i]+'"></td><td id="nameAndCost"><div>'+building.name[i]+'</div><div><span>'+abbreviateNumber(building.cost[i])+'</span> BP<div></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table></span>'
			if (game.points < building.cost[i]) {document.getElementById(building.name[i]).style.cssText = "pointer-events: none;filter: grayscale(100%);opacity: 0.6;"}
		}
		for (i=0; i < buildingTwo.name.length; i++) {
			document.getElementById("shopContainer2").innerHTML += '<span title="'+buildingTwo.tooltip[i]+'\nEXP per '+buildingTwo.name[i]+': '+abbreviateNumber(Math.round(((buildingTwo.income[i] + game.expFlatBonus) * game.expBuildingMultiplier) * 1000) / 1000)+'\nTotal EXPpS: '+abbreviateNumber(Math.round(((game.expFlatBonus + buildingTwo.income[i]) * buildingTwo.count[i] * game.expBuildingMultiplier) * 1000) / 1000)+'""><table id="'+buildingTwo.name[i]+'" class="shopButton unselectable" onclick="buildingTwo.purchase('+i+')"><tr><td id="image"><img draggable="false" ondragstart="return false;" src="images/'+buildingTwo.image[i]+'"></td><td id="nameAndCost"><div>'+buildingTwo.name[i]+'</div><div><span>'+abbreviateNumber(buildingTwo.cost[i])+'</span> EXP<div></td><td id="amount"><span>'+buildingTwo.count[i]+'</span></td></tr></table></span>'
			if (game.exp < buildingTwo.cost[i]) {document.getElementById(buildingTwo.name[i]).style.cssText = "pointer-events: none;filter: grayscale(100%);opacity: 0.6;"}
		}
	},
	
	updateUpgrades: function() {
		upgradeContainerIndex.setOrder();
		prestigeContainerIndex.setOrder();
		for (i = 0; i < upgrade.name.length; i++) {
			if(upgrade.purchased[i] === false) {
				if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){
					document.getElementById(upgrade.type[i] + upgrade.buildingIndex[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br>BP from '+building.namePlural[upgrade.buildingIndex[i]]+' is <strong>'+abbreviateUpgradeAffect(upgrade.bonus[i])+'</strong><br>('+abbreviateNumber(upgrade.cost[i])+' BP)</span></div>';	
					if (!upgrade.shown[i]) {
						display.createNotification("New Upgrade Unlocked!",1)
						upgrade.shown[i] = true
					}
				}if (upgrade.type[i] == "clickchance" && game.totalClicks >= upgrade.requirement[i]) {
					document.getElementById(upgrade.type[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br>Chance to get Bitches from clicks is <strong>'+abbreviateUpgradeAffect(upgrade.bonus[i])+'</strong><br>('+abbreviateNumber(upgrade.cost[i])+' BP)</span></div>';
					if (!upgrade.shown[i]) {
						display.createNotification("New Upgrade Unlocked!",1)
						upgrade.shown[i] = true
					}
				}if (upgrade.type[i] == "clickpercent" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
					document.getElementById(upgrade.type[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br>Clicks give <strong>+'+abbreviateUpgradeAffect(upgrade.bonus[i])+'</strong> of BPpS<br>('+abbreviateNumber(upgrade.cost[i])+' BP)</span></div>';
					if (!upgrade.shown[i]) {
						display.createNotification("New Upgrade Unlocked!",1)
						upgrade.shown[i] = true
					}
				}if (upgrade.type[i] == "globalmulti" && building.total >= upgrade.requirement[i]) {
					document.getElementById(upgrade.type[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br><strong>All</strong> BP is <strong>'+abbreviateUpgradeAffect(upgrade.bonus[i])+'</strong><br>('+abbreviateNumber(upgrade.cost[i])+' BP)</span></div>';
					if (!upgrade.shown[i]) {
						display.createNotification("New Upgrade Unlocked!",1)
						upgrade.shown[i] = true
					}
				}if (upgrade.type[i] == "discount" && building.total >= upgrade.requirement[i]) {
					document.getElementById(upgrade.type[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br><strong>All</strong> Buildings are <strong>+'+abbreviateUpgradeAffect(upgrade.bonus[i])+'</strong> cheaper<br>('+abbreviateNumber(upgrade.cost[i])+' BP)</span></div>';
					if (!upgrade.shown[i]) {
						display.createNotification("New Upgrade Unlocked!",1)
						upgrade.shown[i] = true
					}
				}
				if (upgrade.type[i] == "prestigechance") {
					document.getElementById(upgrade.type[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br>Chance to get Bitches from buildings is <strong>'+abbreviateUpgradeAffect(upgrade.bonus[i])+'</strong><br>('+abbreviateNumber(upgrade.cost[i])+' HM)</span></div>';
				}if (upgrade.type[i] == "prestigemulti") {
					document.getElementById(upgrade.type[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br><strong>All</strong> BP is <strong>'+abbreviateUpgradeAffect(upgrade.bonus[i])+'</strong><br>('+abbreviateNumber(upgrade.cost[i])+' HM)</span></div>';
				}if (upgrade.type[i] == "prestigeachievementmulti") {
					document.getElementById(upgrade.type[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br>Gives <strong>+'+abbreviateUpgradeAffect(upgrade.bonus[i])+' BP</strong> per achievement<br>('+abbreviateNumber(upgrade.cost[i])+' HM)</span></div>';
				}if (upgrade.type[i] == "prestigenuggetfrequency") {
					document.getElementById(upgrade.type[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br>Nuggets appear <strong>'+upgrade.bonus[i] / 60000+'</strong> minute faster<br>('+abbreviateNumber(upgrade.cost[i])+' HM)</span></div>';
				}if (upgrade.type[i] == "prestigenuggetduration") {
					document.getElementById(upgrade.type[i]).innerHTML += '<div class="tooltip"><img draggable="false" ondragstart="return false;" src="images/'+upgrade.image[i]+'" onclick="upgrade.purchase('+i+')"><span class="tooltiptext">'+upgrade.name[i]+'<br>'+upgrade.flavorText[i]+'<br>Nuggets will last <strong>+'+upgrade.bonus[i] / 1000+'</strong> seconds longer<br>('+abbreviateNumber(upgrade.cost[i])+' HM)</span></div>';
				}
			}
		}
	},
	createNotification: function(content,id) {
		if (menu.onmenu === menu.name[id]) return
		let parameter = document.getElementById("notificationArea");
		let element = document.createElement("div");
		function close() {element.style.opacity = 0; setTimeout(function(){element.remove()},600)}
		element.textContent = content
		element.classList.add("notification","unselectable");
		parameter.appendChild(element);
		setTimeout(function(){close()},20000)
		if (id != null) {
		element.onclick = function(){close(); menu.goto(id)}
		} else {element.onclick = function(){close()}}
		setInterval(function(){if (menu.onmenu === menu.name[id]){close()}})
	},
	updateTotalBuildings: function() {
		building.total = building.gettotal()
		this.updateInfoMenu()
	},
	checkAchievements: function (){
		for (i = 0; i < achievement.name.length; i++) {
			if (achievement.type[i] === "points" && game.totalPoints >= achievement.requirement[i] && achievement.awarded[i] === false) achievement.earn(i);
			else if(achievement.type[i] === "click" && game.totalClicks >= achievement.requirement[i] && achievement.awarded[i] === false) achievement.earn(i);
			else if (achievement.type[i] === "bitches" && game.totalBitches >= achievement.requirement[i] && achievement.awarded[i]  === false) achievement.earn(i);
			else if (achievement.type[i] === "building" && building.highestCount[achievement.buildingIndex[i]] >= achievement.requirement[i] && achievement.awarded[i]  === false) achievement.earn(i);
		}
	},
	updateAchievements: function() {
		achievementContainerIndex.setOrder();
		for (i = 0 ; i < achievement.name.length; i++) {
			if (achievement.awarded[i]) {
				if (achievement.type[i] == "building") {
					document.getElementById("ach" + achievement.type[i] + achievement.buildingIndex[i]).innerHTML += '<div class="achievementTooltip"><img draggable="false" ondragstart="return false;" src="images/'+achievement.image[i]+'"><span class="achievementDescription">'+achievement.name[i]+'<br>'+achievement.description[i]+'</span></div>';
				} else {
					document.getElementById("ach" + achievement.type[i]).innerHTML += '<div class="achievementTooltip"><img draggable="false" ondragstart="return false;" src="images/'+achievement.image[i]+'"><span class="achievementDescription">'+achievement.name[i]+'<br>'+achievement.description[i]+'</span></div>';
				}
			} if (!achievement.awarded[i]) {
				if (achievement.type[i] == "building") {
					document.getElementById("ach" + achievement.type[i] + achievement.buildingIndex[i]).innerHTML += '<div class="achievementTooltip"><img draggable="false" ondragstart="return false;" src="images/questionmark.png"><span class="achievementDescription">?<br>'+achievement.description[i]+'</span></div>';
				} else {
					document.getElementById("ach" + achievement.type[i]).innerHTML += '<div class="achievementTooltip"><img draggable="false" ondragstart="return false;" src="images/questionmark.png"><span class="achievementDescription">?<br>'+achievement.description[i]+'</span></div>';
				}
			}
		}
	},
	updateBackgroundShop: function() {
		document.getElementById("backgroundContainer").innerHTML = "";
		for (i=0; i < background.name.length; i++) {
			document.getElementById("backgroundContainer").innerHTML += '<div class="backgroundTooltip"><img draggable="false" ondragstart="return false;" src="images/'+background.image[i]+'" onclick="background.setbg('+i+')"><span class="backgroundDescription">'+background.name[i]+'<br>'+background.artist[i]+'</span></div>';
		}
	},
	updateInfoMenu: function() {
		document.getElementById("stats").innerHTML = `
		<br>Total BP (All Time): ${abbreviateNumber(Math.round(game.totalPoints * 100) / 100)}
		<br>Total Clicks: ${abbreviateNumber(game.totalClicks)}
		<br>Global Multiplier : &#215;${abbreviateNumber(Math.round(game.multiplier * 100)/100)}
		<br>Bonus from Achievements: &#215;${(1+Math.round(game.prestigeAchievementMulti * achievement.totalAchievements() * 100) / 100)}
		<br>Bonus from level: &#215;${Math.round((1 + game.level * 0.1) * 10) / 10}
		<br>Total Bitches: ${abbreviateNumber(game.totalBitches)}
		<br>Current Building Count: ${building.total}
		<br>Click Bitch Chance: 1/${abbreviateNumber(Math.round((bitches.clickChance) * 100) / 100)}
		<br>Building Bitch Chance: 1/${abbreviateNumber(Math.round((bitches.buildingChance/building.total) * 100) / 100)}
		`;
	},
	updateHighestBuilding: function() {
		for (i=0; i<building.name.length; i++){
			if (building.highestCount[i] < building.count[i]) {
			building.highestCount[i] = building.count[i]
			}
		}
		this.updateAchievements();
	},
	updateAll: function() {
		this.updatePoints();
		this.updateInfoMenu();
		this.updateTotalBuildings();
		this.updateHighestBuilding();
		game.getMultiplier();
		updateDiscount();
		display.updateGameTwo();
		display.updateSkills();
		this.updateShop();
		this.updateUpgrades();
		this.checkAchievements();
		this.updateAchievements();
	},
	updateGameTwo: function() {
		game.levelRequirement = Math.round(50 * Math.pow(1.2,game.level))
		document.getElementById('barContainerText').innerHTML = `${abbreviateNumber(Math.round(game.exp * 100)/100)}/${abbreviateNumber(game.levelRequirement)} EXP (${Math.round(((game.exp/game.levelRequirement)*100) * 10) / 10}%)`
	   r.style.setProperty('--level-width',`${(game.exp/game.levelRequirement) * 100 + 10}%`)
	   document.getElementById('level').innerHTML = game.level
	   document.getElementById('expPerSecond').innerHTML = Math.round(game.getExpPerSecond() *100) /100
	  },
	updateSkills: function() {
		document.getElementById('skillPoints').innerHTML = game.skillPoints
		document.getElementById('skillContainer').innerHTML = ""
		  for (i = 0; i < skills.name.length; i++) {
			if (game.level >= skills.requirement[i]) {
			if (skills.max[i] === null) {document.getElementById('skillContainer').innerHTML += '<div class="skillTooltip"><span class="skillDescription">'+skills.description[i]+'</span><table onclick="skills.purchase('+i+')" class="skillButton unselectable" id="'+skills.name[i]+'"><tr><td id="head" colspan="3">' + skills.name[i] + '</td></tr><td id="cost">' + abbreviateNumber(skills.cost[i]) + ' SP</td><td id="count">' + skills.count[i] + '</td></table></div>'}
			if (skills.count[i] < skills.max[i]) {document.getElementById('skillContainer').innerHTML += '<div class="skillTooltip"><span class="skillDescription">'+skills.description[i]+'</span><table onclick="skills.purchase('+i+')" class="skillButton unselectable" id="'+skills.name[i]+'"><tr><td id="head" colspan="3">' + skills.name[i] + '</td></tr><td id="cost">' + abbreviateNumber(skills.cost[i]) + ' SP</td><td id="count">' + skills.count[i] + '/' + skills.max[i] + '</td></table></div>'}
			if (skills.count[i] === skills.max[i]){document.getElementById('skillContainer').innerHTML += '<div class="skillTooltip"><span class="skillDescription">'+skills.description[i]+'</span><table onclick="skills.purchase('+i+')" class="skillButton unselectable" id="'+skills.name[i]+'"><tr><td id="head" colspan="3">' + skills.name[i] + '</td></tr><td id="cost">Maxed!</td><td id="count">' + skills.count[i] + '/' + skills.max[i] + '</td></table></div>'}
			if (game.skillPoints < skills.cost[i] || skills.count[i] === skills.max[i]) {document.getElementById(skills.name[i]).style.cssText = "pointer-events: none;filter: grayscale(100%);opacity: 0.6;"}
			} else document.getElementById('skillContainer').innerHTML += '<div><table style="pointer-events: none;filter: grayscale(100%);opacity: 0.6;" class="skillButton unselectable" id="'+skills.name[i]+'"><tr><td id="head" colspan="3">' + skills.name[i] + '</td></tr><td id="cost" text-align: center;">Get to level '+skills.requirement[i]+' To Unlock!</td></table></div>'
		  }
		  skills.updateSkillBonus();
		},
	checkLevelUp: function() {
		if (game.exp >= game.levelRequirement) {
			game.exp -= game.levelRequirement
			game.level ++;
			game.skillPoints += (1 + Math.floor((game.level - 1) / 10))
			document.getElementById('level').innerHTML = game.level
			display.updateGameTwo()
			display.updateSkills()
			game.getMultiplier();
		}
	 }
};
let upgradeContainerIndex = {
	order: [
		"building0",
		"building1",
		"building2",
		"building3",
		"building4",
		"building5",
		"building6",
		"clickchance",
		"clickpercent",
		"globalmulti",
		"discount"
	],
	setOrder: function() {
		document.getElementById("upgradeContainer").innerHTML = "";
		for (i=0; i< this.order.length; i++) {
			document.getElementById("upgradeContainer").innerHTML += '<span id="'+this.order[i]+'"></span>';
		}
	}
}
let prestigeContainerIndex = {
	order: [
		"prestigechance",
		"prestigemulti",
		"prestigeachievementmulti",
		"prestigenuggetfrequency",
		"prestigenuggetduration"
	],
	setOrder: function() {
		document.getElementById("prestigeContainer").innerHTML = "";
		for (i=0; i< this.order.length; i++) {
			document.getElementById("prestigeContainer").innerHTML += '<span id="'+this.order[i]+'"></span>';
		}
	}
}
let achievementContainerIndex = {
	order: [
		"building0",
		"building1",
		"building2",
		"building3",
		"building4",
		"building5",
		"building6",
		"points",
		"click",
		"bitches"
	],
	setOrder: function() {
		document.getElementById("achievementContainer").innerHTML = "";
		for (i=0; i< this.order.length; i++) {
			document.getElementById("achievementContainer").innerHTML += '<span id="ach'+this.order[i]+'"></span>';
		}
	}
}

let r = document.querySelector(':root');
var background = {
	currentBackgroundIndex: "",
	name: [
		"Blank",
		"Rock",
		"Will",
		"Gavin and Elijah",
		"Psychedelic Frog",
		"Noah and Bucket",
		"Jojo",
		"Fish",
		"Pokimane"
	],
	artist: [
		"Defualt",
		"Free!",
		"Free!",
		"Support from: Gavin",
		"Support from: Amara",
		"Support from: Arden",
		"Support from: Ian",
		"Support from: Cailan",
		"Support from: Arden"
	],
	image: [
		"background0.png",
		"background1.png",
		"background2.png",
		"background3.png",
		"background4.png",
		"background5.png",
		"background6.png",
		"background7.png",
		"background8.png"
	],
	repeat: [
		"round",
		"space repeat",
		"no-repeat",
		"no-repeat",
		"round",
		"repeat",
		"no-repeat",
		"repeat",
		"no-repeat"
	],
	position: [
		"top left",
		"top left",
		"center",
		"center",
		"top left",
		"top left",
		"center",
		"top left",
		"center"
	],
	setbg: function(index) {
		r.style.setProperty('--background-image','url("./images/'+this.image[index]+'")');
		r.style.setProperty('--background-repeat',''+this.repeat[index]+'');
		r.style.setProperty('--background-position',''+this.position[index]+'');
		background.currentBackgroundIndex = index
	},
	modeColor:["rgb(255,255,255)","rgb(43,42,51)"], currentColor:"rgb(255,255,255)",
	modeTextColor:["rgb(0,0,0)","rgb(225,225,225)"], currentTextColor:"rgb(0,0,0)",
	modeButton:['#ffffff','#212121'], currentButton:'url("./images/button.png")',
	modeSecondary:['rgb(220,220,220, 0.7)','rgb(17,17,17, 0.7)'], currentSecondary:'rgb(220,220,220, 0.7)',
	setMode: function(index) {
		r.style.setProperty('--background-color',''+this.modeColor[index]+'');
		this.currentColor = this.modeColor[index]
		r.style.setProperty('--inverse-color',''+this.modeTextColor[index]+'');
		this.currentTextColor = this.modeTextColor[index]
		r.style.setProperty('--button-color',''+this.modeButton[index]+'');
		this.currentButton = this.modeButton[index]
		r.style.setProperty('--secondary-color',''+this.modeSecondary[index]+'');
		this.currentSecondary = this.modeSecondary[index]
	}
}

var menu = {
	onmenu: "",
	displayIndex: 0,
	name: [
	  "Button",
	  "Upgrades",
	  "Backgrounds",
	  "Info",
	  "Prestige",
	  "Button Boogaloo",
	  "Achievements",
	  "Skills",
	  "Gambling"
	],
	id: [
	"buttonMenu",
	"upgradeMenu",
	"backgroundMenu",
	"infoMenu",
	"prestigeMenu",
	"buttonMenu2",
	"achievementMenu",
	"skillsMenu",
	"gamblingMenu"
	],
	location: [
		"menu",
		"menu",
		"rightmenu",
		"rightmenu",
		"menu",
		"menu",
		"leftmenu",
		"menu",
		"menu"
	],
	goto: function(index) {
	  if (menu.onmenu !== menu.name[index]) {
	  for (i=0; i<menu.name.length; i++) {
		if (i === index) {
		document.getElementById(menu.id[i]).style.display = "block";
		this.onmenu = menu.name[index]
		if (index === 0 || index === 1 || index === 8) {
			if (index === 8) this.displayIndex = 2
			else this.displayIndex = i;
		}
		if (menu.name[i] === "Button Boogaloo" || menu.name[i] === "Skills") {document.getElementById('shopContainer').style.display = "none"; document.getElementById('shopContainer2').style.display = "block";} else {document.getElementById('shopContainer').style.display = "block"; document.getElementById('shopContainer2').style.display = "none";}
		if (menu.name[i] === "Info") display.updateInfoMenu()
		} else if (i !== index){
		document.getElementById(menu.id[i]).style.display = "none";
		}
	  }
	  display.updatePoints();
	  }
	},
  }
function makemenubuttons() {
	for (i = 0; i < menu.name.length; i++) {
	  document.getElementById(menu.location[i]).innerHTML += '<button class="pointer unselectable fontStandard" onclick="menu.goto('+i+')">' + menu.name[i] + '</button>'
	}
}
function abbreviateUpgradeAffect(bonus) {
	if (bonus === 2) return "doubled"
	else if (bonus === 4) return "quadrupled"
	else if (bonus === 0.01) return "1%"
	else if (bonus === 0.5) return "doubled"
	else if (bonus === 0.2) return "20%"
	else if (bonus === 3) return "tripled"
	else return "undefined"
}
//https://www.html-code-generator.com/javascript/shorten-long-numbers for abbreviateNumber code
function abbreviateNumber(num) {
	num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "q"},
      {v: 1E18, s: "e18"},
	  {v: 1E21, s: "e21"},
	  {v: 1E24, s: "e24"},
	  {v: 1E27, s: "e27"},
	  {v: 1E30, s: "e30"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}
let encryptedSave = "";
function saveGame() {
	var gameSave = {
		points: game.points,
		totalPoints: game.totalPoints,
		totalClicks: game.totalClicks,
		bitches: game.bitches,
		prestigePoints :game.prestigePoints,
		gotBitches: gotBitches,
		buildingCount: building.count,
		buildingCountTwo: buildingTwo.count,
		buildingHighestCount: building.highestCount,
		multiplier: game.multiplier,
		totalBitches: game.totalBitches,
		upgradePurchased: upgrade.purchased,
		upgradeShown: upgrade.shown,
		achievementShown: achievement.shown,
		buildingTotal: building.total,
		backgroundIndex: background.currentBackgroundIndex,
		modeColor: background.currentColor,
		modeTextColor: background.currentTextColor,
		modeButton: background.currentButton,
		modeSecondary: background.currentSecondary,
		lastVersion: game.version,
		visited: game.visited,
		exp: game.exp,
		level: game.level,
		skillPoints: game.skillPoints,
		skillsCount: skills.count
	};
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
	encryptedSave = (btoa(JSON.stringify(gameSave)));
}

function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("gameSave"));
	if(localStorage.getItem("gameSave") !== null) {
		if (typeof savedGame.points !== "undefined") game.points =savedGame.points
		if (typeof savedGame.skillPoints !== "undefined") game.skillPoints =savedGame.skillPoints
		if (typeof savedGame.skillsCount !== "undefined") skills.count =savedGame.skillsCount
		if (typeof savedGame.totalPoints !== "undefined") game.totalPoints =savedGame.totalPoints
		if (typeof savedGame.totalClicks !== "undefined") game.totalClicks =savedGame.totalClicks
		if (typeof savedGame.bitches !== "undefined") game.bitches =savedGame.bitches
		if (typeof savedGame.prestigePoints !== "undefined") game.prestigePoints = savedGame.prestigePoints
		if (typeof savedGame.gotBitches !== false) gotBitches = savedGame.gotBitches
		if (typeof savedGame.achievementShown !== "undefined") achievement.shown = savedGame.achievementShown
		if (typeof savedGame.multiplier !== "undefined") game.multiplier = savedGame.multiplier
		if (typeof savedGame.buildingTotal !== "undefined") building.total = savedGame.buildingTotal
		if (typeof savedGame.totalBitches !== "undefined") game.totalBitches = savedGame.totalBitches
		if (typeof savedGame.buildingHighestCount !== "undefined") building.highestCount = savedGame.buildingHighestCount
		if (typeof savedGame.exp !== "undefined") game.exp = savedGame.exp
		if (typeof savedGame.level !== "undefined") {game.level = savedGame.level; game.levelRequirement = Math.round(50 * Math.pow(1.2,game.level))}
		if (typeof savedGame.buildingCount !== "undefined") {
			for(i = 0; i < savedGame.buildingCount.length; i++) {
				building.count[i] = savedGame.buildingCount[i];
				building.cost[i] = Math.round((building.basecost[i] * building.discount) * Math.pow(1.15,savedGame.buildingCount[i]));
			}
		}if (typeof savedGame.buildingCountTwo !== "undefined") {
			for(i = 0; i < savedGame.buildingCountTwo.length; i++) {
				buildingTwo.count[i] = savedGame.buildingCountTwo[i];
				buildingTwo.cost[i] = Math.round(buildingTwo.basecost[i] * Math.pow(1.15,savedGame.buildingCountTwo[i]));
			}
		}
		if (typeof savedGame.upgradePurchased !== "undefined") {
			for (i = 0; i < savedGame.upgradePurchased.length; i++) {
				if (savedGame.upgradePurchased[i] == true) {
				if (upgrade.type[i] === "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {building.income[upgrade.buildingIndex[i]] *= upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else if (upgrade.type[i] === "clickpercent" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {game.clickpercent += upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else if (upgrade.type[i] === "clickchance" && game.totalClicks >= upgrade.requirement[i]) {bitches.clickChance *= upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else if (upgrade.type[i] === "globalmulti" && building.total >= upgrade.requirement[i]) {game.globalMultiplier *= upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else if (upgrade.type[i] === "discount" && building.total >= upgrade.requirement[i]) {building.discount -= upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else if (upgrade.type[i] === "prestigechance") {bitches.buildingChance *= upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else if (upgrade.type[i] === "prestigemulti") {game.prestigeMulti *= upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else if (upgrade.type[i] === "prestigeachievementmulti") {game.prestigeAchievementMulti += upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else if (upgrade.type[i] === "prestigenuggetfrequency") {game.gnFrequency -= upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else if (upgrade.type[i] === "prestigenuggetduration") {game.gnDuration += upgrade.bonus[i]; upgrade.purchased[i] = true;}
				else {upgrade.purchased[i] = false}
				} else if (savedGame.upgradePurchased[i] === false) {
					upgrade.purchased[i] = false
				}
			}
		}
		if (typeof savedGame.upgradeShown !== "undefined") {
			for (i = 0; i < savedGame.upgradePurchased.length; i++) {
				if (savedGame.upgradeShown[i] == true) {
				if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) upgrade.shown[i] = true;
				else if (upgrade.type[i] == "clickpercent" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) upgrade.shown[i] = true;
				else if (upgrade.type[i] == "clickchance" && game.totalClicks >= upgrade.requirement[i]) upgrade.shown[i] = true;
				else if (upgrade.type[i] == "globalmulti" && building.total >= upgrade.requirement[i]) upgrade.shown[i] = true;
				else if (upgrade.type[i] == "discount" && building.total >= upgrade.requirement[i]) upgrade.shown[i] = true;
				else {upgrade.shown[i] = false}
				}
			}
		}
		if (typeof savedGame.modeColor !== "undefined") {
		r.style.setProperty('--background-color',''+savedGame.modeColor+'');
		background.currentColor = savedGame.modeColor;
		r.style.setProperty('--inverse-color',''+savedGame.modeTextColor+'');
		background.currentTextColor = savedGame.modeTextColor;
		r.style.setProperty('--button-color',''+savedGame.modeButton+'');
		background.currentButton = savedGame.modeButton;
		r.style.setProperty('--secondary-color',''+savedGame.modeSecondary+'');
		background.currentSecondary = savedGame.modeSecondary;
		}
		if (savedGame.lastVersion !== game.version && savedGame.visited == true) {
			modal.patchNotes();
			saveGame();
		}
		game.visited = true;
		background.setbg(savedGame.backgroundIndex);
        while (building.highestCount.length < building.name.length) {
			building.highestCount.push(0)
		}
	}
}

var bitches = {
	clickChance: 50000, // 50k
	buildingChance: 1000000, // 1 Million

	getBitches: function() {
		if (randomNumber(0,this.clickChance) == 1) {
			game.bitches++;
			game.totalBitches++;
			display.updateAll();
			document.getElementById("ascendPreview").innerHTML = abbreviateNumber(game.bitches)
		}
	},

	getBuildingBitches: function() {
		let totalBuildingChance = this.buildingChance / building.gettotal();
		if (randomNumber(0,totalBuildingChance) == 1) {
			game.bitches++;
			game.totalBitches++;
			display.updateAll();
			document.getElementById("ascendPreview").innerHTML = abbreviateNumber(game.bitches)
		}
	},
};

let gotBitches = false

function checkBitches() {
	if (!gotBitches && game.bitches >= 1) {
		alert("You got Bitches!")
		gotBitches = true;
	}
}

function resetGame() {
	if(confirm("Are you sure you want to reset your game?")) {
		var gameSave = {};
		localStorage.setItem("gameSave",JSON.stringify(gameSave))
		location.reload();
	}
}

function randomNumber(min,max) {
	return Math.round(Math.random() * (max-min) + min);
}

function fadeOut(element, duration, finalOpacity, callback) {
	let opacity = 1;

	let elementFadingInterval = window.setInterval(function() {
		opacity -= 80 / duration;

		if(opacity <= finalOpacity) {
			clearInterval(elementFadingInterval);
			callback();
		}

		element.style.opacity = opacity;
	}, 50);
}
function createGN() {
	// Grab sectionLeft
	let parameter = document.getElementById("gnParameter");
	//Get Random Position
	let position = {
		x: randomNumber(0,65) + 1,
		y: randomNumber(0,37) + 1
	}
	// Create Element
	let element = document.createElement("div");
	element.classList.add("goldenNugget","unselectable");
	element.style.left = position.x + "vw";
	element.style.top = position.y + "vw";
	element.onclick = function() {
		gnBonus();
		element.remove();
	}
	// Add Element
	parameter.appendChild(element);
	// Remove element
	setTimeout(function(){element.remove()},10000)
}

function gnBonus() {
	let gnDuration = game.gnDuration
	let displayDuration = game.gnDuration
	let gnText = ""
	let outcome = randomNumber(0,1)
	switch(outcome) {
		case 0:
		displayDuration = gnDuration / 1000
		game.temporaryClickMultiplier *= 777
		gnText = `Click Frenzy! x${game.temporaryClickMultiplier}`
		setTimeout(function(){game.temporaryClickMultiplier /= 777},gnDuration)
		break
		case 1:
		gnDuration *=2
		displayDuration = gnDuration / 1000
		game.temporaryMultiplier *= 64
        game.getMultiplier();
		gnText = `Multiplier! x${game.temporaryMultiplier}`
		setTimeout(function(){game.temporaryMultiplier /= 64; game.getMultiplier();},gnDuration)
		break
	}
	let parameter = document.getElementById("gnduration");
	let element = document.createElement("div");
	setTimeout(function(){element.style.opacity = 0; setTimeout(function(){element.remove()},600)},(gnDuration))
	element.classList.add("notification","goldennuggetnotification","unselectable");
	parameter.appendChild(element);
	element.textContent = `${gnText} for ${displayDuration} seconds`
	displayDuration --;
	let display = setInterval(() => {
		element.textContent = `${gnText} for ${displayDuration} seconds`
		displayDuration --;
		if(displayDuration <= 0) clearInterval(display)
	}, 1000);
}
movingClicker = {
	xMax: 90,
	yMax: 70
}
function movingClickerClicked() {
	let position = {
	  x: Math.random() * movingClicker.xMax,
	  y: Math.random() * movingClicker.yMax
	}
	r.style.setProperty('--x-position', `${position.x}%`)
	r.style.setProperty('--y-position', `${position.y}%`)
	game.exp += game.expClickPower * game.expClickMultiplier
	display.updateGameTwo()
  }
function createNumberOnClick(event) {
	// grab the clicker
	let clicker = document.getElementById("clicker");

	//grab mouse position
	let clickerOffset = clicker.getBoundingClientRect();
	let position = {
		x: event.pageX - clickerOffset.left + randomNumber(-5,5) - 25,
		y: event.pageY - clickerOffset.top -30
	}

	//create the number
	let element = document.createElement("div");
	element.textContent = "+" + abbreviateNumber(Math.round(((1*game.multiplier + game.getPointsPerSecond() * game.clickpercent) * game.temporaryClickMultiplier) * game.skillClickPower * 100) / 100)
	element.classList.add("number","unselectable");
	element.style.left = position.x + "px";
	element.style.top = position.y + "px";

	//add the number to the click
	clicker.appendChild(element);

	//rise element
	let movementInterval = window.setInterval(function() {
		if (typeof element == "undefined" && element == null) clearInterval(movementInterval);

		position.y -= 2;
		element.style.top = position.y + "px";
	}, 10)

	//fade out
	fadeOut(element, 2000, 0.5, function() {
		element.remove();
	});
}

document.getElementById("clicker").addEventListener("click", function(event) {
	game.addPoints((1*game.multiplier + game.getPointsPerSecond() * game.clickpercent) * game.temporaryClickMultiplier * game.skillClickPower)

	createNumberOnClick(event);
}, false);

function createNumberOnRandomClicker(event) {
	let clicker = document.getElementById("movingClickerContainer");

	//grab mouse position
	let clickerOffset = clicker.getBoundingClientRect();
	let position = {
		x: event.pageX - clickerOffset.left + randomNumber(-5,5),
		y: event.pageY - clickerOffset.top -5
	}

	//create the number
	let element = document.createElement("div");
	element.textContent = "+" + abbreviateNumber(Math.round(game.expClickPower * game.expClickMultiplier * 100)/100)
	element.classList.add("number","unselectable");
	element.style.left = position.x + "px";
	element.style.top = position.y + "px";

	//add the number to the click
	clicker.appendChild(element);

	//rise element
	let movementInterval = window.setInterval(function() {
		if (typeof element == "undefined" && element == null) clearInterval(movementInterval);

		position.y -= 2;
		element.style.top = position.y + "px";
	}, 10)

	//fade out
	fadeOut(element, 2000, 0.5, function() {
		element.remove();
	});
}
document.getElementById("movingClicker").addEventListener("click", function(event) {
	movingClickerClicked();
	createNumberOnRandomClicker(event);
}, false);
// Spinner code
let actualDeg = 0;
function createSpinner() {
	const wheel = document.getElementById('wheel');
	const startButton = document.getElementById('spinnerButton');
	let deg = 0;
	startButton.addEventListener('click', () => {
		let answer = document.getElementById('spinnerOutcome')
		let wager = document.getElementById("spinnerInput").value
		let power = document.getElementById("spinnerSelect").value
		let totalWager = power * wager
		if (!isNaN(wager / 1 || answer)) {
		if (totalWager <= game.points) {
		let element = document.createElement("div");
		element.classList.add("cooldown","unselectable");
		document.getElementById('cooldown').appendChild(element);
		answer.innerHTML = 'Spinning...'
		// game stuff
		let outcome = Math.round(Math.random() * 360)
		setTimeout(function(){ if ((0 <= outcome && outcome < 45) || (135<=outcome && outcome <225) || (315<= outcome && outcome <= 360)) { game.points += totalWager;answer.innerHTML = `you win! (gained  ${abbreviateNumber(totalWager)})`;}
		else { game.points -= totalWager;answer.innerHTML = `you loose! (lost ${abbreviateNumber(totalWager)})`;}
		display.updatePoints();element.remove()},4000)
		// display stuff
		startButton.style.pointerEvents = 'none'; // disable button
		// Calculate a new rotation between 5000 and 10 000
		deg = 3600 + outcome;
		// Set the transition on the wheel
		wheel.style.transition = 'all 4s ease-out';
		// Rotate the wheel
		wheel.style.transform = `rotate(${deg}deg)`;
		// Apply the blur
		wheel.classList.add('blur');
		// check if valid 
		} else answer.innerHTML = "Need more points"
		} else answer.innerHTML = 'Please input a number'
	  });
	  wheel.addEventListener('transitionend', () => {
		// Remove blur
		wheel.classList.remove('blur');
		startButton.style.pointerEvents = 'auto'; //enable button
		// Need to set transition to none as we want to rotate instantly
		wheel.style.transition = 'none';
		// Calculate degree on a 360 degree basis to get the "natural" real rotation
		// Important because we want to start the next spin from that one
		// Use modulus to get the rest value from 360
		actualDeg = deg % 360;
		// Set the real rotation instantly without animation
		wheel.style.transform = `rotate(${actualDeg}deg)`;
	  });
}
const select = ["","K","M","B","T","q","e18","e21","e24"]
function setSelect() {
	for (i=0; i<select.length; i++) {
	document.getElementById('spinnerSelect').innerHTML += `<option value ="${Math.pow(10,i * 3)}">${select[i]}</option>`
	}
}
function setPercentWagerContainer() {
	for (i=25; i<101; i+=25) {
	document.getElementById('percentWagerContainer').innerHTML += '<button class="pointer unselectable" onclick="setWager('+i+')">'+i+'%</button>'
	}
}
function setWager(percent) {
	document.getElementById("spinnerInput").value = game.points * (0.01 * percent)
	document.getElementById('spinnerSelect').value = 1;
	}
	
let element = document.createElement("div");
element.classList.add("cooldown","unselectable");
element.innerHTML = '<div class="centered-text"><div id="loadingHeader">NB Clicker</div><div id="loadingText">Loading...</div></div>'
document.getElementById('cooldown').appendChild(element);
setTimeout(function(){element.remove()},1500)

window.onload = function() {
	loadGame();
	game.temporaryClickMultiplier = 1
	game.temporaryMultiplier = 1
	display.updateHighestBuilding();
	display.updateTotalBuildings();
	while (upgrade.purchased.length < upgrade.name.length) {
			upgrade.purchased.push(false);
	}while (upgrade.shown.length < upgrade.name.length) {
			upgrade.shown.push(false);
	}while (achievement.awarded.length<achievement.name.length) {
		achievement.awarded.push(false)
	}while (achievement.shown.length < achievement.name.length) {
		achievement.shown.push(false)
	}while (skills.count.length < skills.name.length) {
		skills.count.push(0)
	}
	display.updateBackgroundShop();	
	achievement.totalAchievements();
	upgrade.totalUpgrades();
	upgrade.upgradeTotal();
	document.getElementById("achievementTotal").innerHTML = achievement.achievementTotal();
	document.getElementById("version").innerHTML = game.version;
	document.getElementById("leftmenu").innerHTML += "<button class='pointer unselectable fontStandard' onclick='saveGame();'>Save Game</button><button class='pointer unselectable fontStandard' onclick='openFeedback()'>Feedback</button><button class='pointer unselectable fontStandard' onclick='window.location.reload()'>Update</button>"
	makemenubuttons();
	menu.goto(0);
	createSpinner()
	setSelect()
	setPercentWagerContainer()
	game.getMultiplier();

	display.updateAll();
	if (game.visited == false) {
		modal.help();
		game.visited = true
		saveGame();
	}
};
function enableCheats() {r.style.setProperty('--background-image','url("./images/cheat.png")');r.style.setProperty('--background-repeat','no-repeat');r.style.setProperty('--background-position','center');window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ","_blank")}
function openFeedback() {window.open('https://forms.gle/3Yo4EeKj9ktytCva8','_blank')}
setInterval (function() { // tick interval
	game.points += game.getPointsPerSecond();
	game.totalPoints += game.getPointsPerSecond();
	game.exp += game.getExpPerSecond()
	display.updateGameTwo();
	display.updatePoints();
	display.updateAchievements();
	bitches.getBuildingBitches();
	checkBitches();
	display.updateInfoMenu();
	for (i=0; i<building.name.length; i++) {
		if (game.points < building.cost[i]) {document.getElementById(building.name[i]).style.cssText = "pointer-events: none;filter: grayscale(100%);opacity: 0.6;"} 
		else {document.getElementById(building.name[i]).style.cssText = ""}
	} for (i=0; i<buildingTwo.name.length; i++) {
		if (game.exp < buildingTwo.cost[i]) {document.getElementById(buildingTwo.name[i]).style.cssText = "pointer-events: none;filter: grayscale(100%);opacity: 0.6;"} 
		else {document.getElementById(buildingTwo.name[i]).style.cssText = ""}
	}
},1000);
setInterval (function() { // make nuggets
	createGN();
},game.gnFrequency)
setInterval(function() { // autosave
saveGame();
},30000);
setInterval (function() { // reminder
	display.createNotification("Enjoying the game? Consider leaving feedback!",null)
},420000);
// Below Code from dcode on youtube / https://codepen.io/dcode-software/pen/zeWXrL
const ModalWindow = {
    init() {
        document.body.addEventListener("click", e => {
            if (e.target.classList.contains("modal__close")) {
                this.closeModal(e.target);
            }
        });
    },

    getHtmlTemplate(modalOptions) {
        return `
            <div class="modal__overlay">
                <div class="modal__window">
                    <div class="modal__titlebar">
						<p></p>
                        <span class="modal__title">${modalOptions.title}</span>
                        <button class="modal__close material-icons">close</button>
                    </div>
                    <div class="modal__content">
                        ${modalOptions.content}
                    </div>
                </div>
            </div>
        `;
    },

    openModal(modalOptions = {}) {
        modalOptions = Object.assign({
            title: 'Modal Title',
            content: 'Modal Content'
        }, modalOptions);

        const modalTemplate = this.getHtmlTemplate(modalOptions);
        document.body.insertAdjacentHTML("afterbegin", modalTemplate);
    },

    closeModal(closeButton) {
		r.style.setProperty('--modal-opacity','0')
		setTimeout(function(){
        const modalOverlay = closeButton.parentElement.parentElement.parentElement;
        document.body.removeChild(modalOverlay);
		},600)
    }
};
var modal = {
	help: function() {
		r.style.setProperty('--modal-opacity','1');
		ModalWindow.openModal({
			title:`Welcome to NB Clicker!`,
			content:"Hello and welcome to NB Clicker. In this game your goal is to get <strong>bitches</strong>. To play you click the big button on the screen to gain <strong>BP</strong>. Then use <strong>BP</strong> to buy buildings which generate <strong>BP</strong> passively. You can naviate the game with the menus at the bottom. There are two ways to get <strong>bitches</strong>. The first is by <strong>clicking the button</strong>. The second is by <strong>purchasing buildings</strong>. Every second the game will check if you got bitches from buildings. This is based on your <strong>total buildings</strong> and not <strong>building income</strong>.<br><br><div style='text-align: center'>Meta:</div><br>This game features autosaving as well as manually saving. To check for updates hit the \"Update\" Button. Your progress <strong>will</strong> be saved. You can give feedback with the \"Feedback\" Button which is appreciated. You can reopen this window anytime as well as get info on other mechanics by clicking the \"?\" icon in the bottom right. Have a great time getting bitches!"})
			game.lastVersion = game.version;
	},patchNotes: function() {
		r.style.setProperty('--modal-opacity','1');
		ModalWindow.openModal({
			title:`Version ${game.version} Patch Notes`,
			content:"<ul><li>Minor Bug and UI fixes</li><ul>"})
			game.lastVersion = game.version;
	},upgrades: function() {
		r.style.setProperty('--modal-opacity','1');
		ModalWindow.openModal({
			title:`Upgrades`,
			content:"Upgrades cost BP and give powerful bonuses. Each appears once a specific requrement is met. A list of requrements include getting X amount of: <ul><li>A specific Building</li><li>Total Clicks</li><li>Total Buildings</li></ul> You can read the tooltip to see their bonuses and costs."})
	},prestige: function() {
		r.style.setProperty('--modal-opacity','1');
		ModalWindow.openModal({
			title:`Prestige`,
			content:"You can prestige to turn your <strong>Bitches</strong> into a new currency called <strong>HM</strong> which can be used to purchase special upgrades. You will loose all of your BP, buildings, and upgrades but you keep your HM, presige upgrades, and levels."})
	},gameTwo: function() {
		r.style.setProperty('--modal-opacity','1');
		ModalWindow.openModal({
			title:`Button Boogaloo`,
			content:"Click the button to gain <strong>EXP</strong>. Once you have enough EXP you level up. Each level gives a +10% Multiplier to the base game as well as granting skill points. You can also use your EXP to purchase buildings that passively give EXP. TIP: If you're fast enough you can click the button before it moves to get a combo."})
	}, skills: function() {
		r.style.setProperty('--modal-opacity','1');
		ModalWindow.openModal({
			title:`Skills`,
			content:"You gain skill points upon leveling up. You gain an extra point every 10 levels (1 for levels 1-10, 2 for levels 11-20, etc.) You can use them to purchase skills. You can always reset your skill points with no penalty so feel free to experiment!"})
	}, gambling: function() {
		r.style.setProperty('--modal-opacity','1');
		ModalWindow.openModal({
			title:`Gambling`,
			content:"Gambing allows you to put your hard earned BP on the line! You can navigate selecting a wager by using the text box to enter your number and the dropdown menu to select a Unit. Gambling has two outcomes: doubling your wager and giving you nothing."})
	},exportSave: function() {
			r.style.setProperty('--modal-opacity','1');
			ModalWindow.openModal({
				title:`Export Save`,
				content:`<textarea class="center3">${encryptedSave}</textarea><div class="textCenter">Copy Me!</div>`})
	},importSave: function() {
		r.style.setProperty('--modal-opacity','1');
			ModalWindow.openModal({
				title:`Import Save`,
				content:`<div class="textCenter">Paste Here!</div><textarea id="loadSave" class="center3"></textarea><button class="center3" onclick="importSave()">Confirm</button>`})
	} 
}
function importSave() {
	if (confirm('This will overide your previous save. If you have entered your save incorrectly bad things will happen. Are you sure you want to load this save?')){
	loadSave = atob(document.getElementById("loadSave").value);
	localStorage.setItem("gameSave", loadSave);
	location.reload()
	}
}
document.addEventListener("DOMContentLoaded", () => ModalWindow.init());
// funny stuff in console
console.log('Congratulations! I see you you opened the console!')

//Cheatcode
// HI ;)
var allowedKeys = {37: 'C',38: 'H',39: 'E',40: 'A',65: 'T',66: 'R'};var konamiCode = ['H', 'H', 'A', 'A', 'C', 'E', 'C', 'E', 'R', 'T'];var konamiCodePosition = 0;document.addEventListener('keydown', function(e) {var key = allowedKeys[e.keyCode];var requiredKey = konamiCode[konamiCodePosition];if (key == requiredKey) {konamiCodePosition++; if (konamiCodePosition == konamiCode.length) {activateCheats();konamiCodePosition = 0;}} else {konamiCodePosition = 0;}});function activateCheats() {if (confirm('Are you sure you want to enable cheats?')) enableCheats()}