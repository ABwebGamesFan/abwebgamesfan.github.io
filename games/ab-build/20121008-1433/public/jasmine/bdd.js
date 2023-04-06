(function() {
	var Test = {
		execute : function() {
			jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
			jasmine.getEnv().execute();
		},
		delay:20000
	};
	Piggies.test = Test;
})();

describe("Test Works", function() {
	it("Making Sure Test works", function() {
		expect(true).toBe(true);
	});
});

describe("Social", function() {
	it("Login functionality works", function() {
		var retVal;

		runs(function(){
			Piggies.social.init().always(function() {
				retVal = true;
			});
		})
	
		waitsFor(function() {
			return retVal;
		},"Trying to log in",Piggies.test.delay);
		
		runs(function(){
			expect(Piggies.social.me).not.toBeNull();
			expect(Piggies.social.me.friends).not.toBeNull();
			expect(Piggies.social.me.friends.length).not.toEqual(0);
		});
	});
	
	it("Bolts refreshed",function(){
		var testBolts = null;
		var finished;
		
		runs(function(){
			Piggies.social.me.boltsUpdater.notify(function(bolts){
				testBolts = Piggies.social.me.bolts;
				finished = true;
			}).fail(function(){
				testBolts = Piggies.social.me.bolts;
				finished = true;
			});
		});
		
		waitsFor(function(){
			return finished;
		});
		
		runs(function(){
			expect(testBolts).not.toBeNull();
			expect(testBolts.maxBolts).not.toBeNull();
		});
		
	});
});

describe("Quest Specs", function() {
	
	it("Quest Progress fetched", function() {
		var quest = null;
		var finished;
		
		runs(function(){
			Piggies.build.questManager.getAllQuests().always(function(){
				finished = true;
			}).done(function(result){
				quest = result;
			});
		});
		
		waitsFor(function() {
			return finished;
		},"Fetching Quest progress",Piggies.test.delay);
		
		runs(function(){
			expect(quest).not.toBeNull();
			for(var q in quest){
				expect(quest[q]).not.toBeNull();
			}
		});
	});	
	
	it("Start a quest", function() {
		var quest = null;
		var finished;
		
		runs(function(){
			Piggies.build.questManager.getAllQuests().done(function(result){
				// Loop through returned results and start a first quest
				for(var q in result){
					Piggies.build.questManager.start(JSON.stringify(result[q])).always(function(){
						finished = true;
					}).done(function(startedResult){
						quest = startedResult;
					});
					break;
				}
			});
		});
		
		waitsFor(function() {
			return finished;
		},"Fetching Quest progress",Piggies.test.delay);
		
		runs(function(){
			expect(quest).not.toBeNull();
		});
	});	
});

describe("Level Specs", function() {		
	it("Top Levels", function() {
		var topLevels = new Piggies.play.LevelCollection("/page/popular", true);
		var levels = null;
		var finished;
		
		runs(function(){
			topLevels.fetchLevels().always(function(){
				finished = true;
			}).done(function(result){
				levels = result;
			});
		});
		
		waitsFor(function() {
			return finished;
		},"Fetching .... ",Piggies.test.delay);
		
		runs(function(){
			expect(levels).not.toBe(null);
			expect(levels.endCursor).not.toBe(null);
		});
	});
	
	it("Latest Levels", function() {
		var topLevels = new Piggies.play.LevelCollection("/page/latest", true);
		var levels = null;
		var finished;
		
		runs(function(){
			topLevels.fetchLevels().always(function(){
				finished = true;
			}).done(function(result){
				levels = result;
			});
		});
		
		waitsFor(function() {
			return finished;
		},"Fetching .... ",Piggies.test.delay);
		
		runs(function(){
			expect(levels).not.toBe(null);
			expect(levels.endCursor).not.toBe(null);
		});
	});
	
	it("My Levels", function() {
		var topLevels = new Piggies.play.LevelCollection("/my/published", true);
		var levels = null;
		var finished;
		
		runs(function(){
			topLevels.fetchLevels().always(function(){
				finished = true;
			}).done(function(result){
				levels = result;
			});
		});
		
		waitsFor(function() {
			return finished;
		},"Fetching .... ",Piggies.test.delay);
		
		runs(function(){
			expect(levels).not.toBe(null);
			expect(levels.endCursor).not.toBe(null);
		});
	});
	
	it("Favourite Levels", function() {
		var topLevels = new Piggies.play.LevelCollection("/page/favourite", true);
		var levels = null;
		var finished;
		
		runs(function(){
			topLevels.fetchLevels().always(function(){
				finished = true;
			}).done(function(result){
				levels = result;
			});
		});
		
		waitsFor(function() {
			return finished;
		},"Fetching .... ",Piggies.test.delay);
		
		runs(function(){
			expect(levels).not.toBe(null);
			expect(levels.endCursor).not.toBe(null);
		});
	});
	
});

