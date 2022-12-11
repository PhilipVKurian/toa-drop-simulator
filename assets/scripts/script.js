$(document).ready(function(){
    let raidLevel = 0;
    let raidLevelIndex = 0;
    let numberOfRuns = 0;
    let clicked = false;
    let purpChance = 0;

    let droppedItems = [];    
    let currentPoints = 0;
    let interval;
    let testRuns = 0;
    let totalGP = 0;
    const itemIDCommon = [0 , 560, 566, 444 , 11232, 6332, 1607, 1605, 2357, 3138, 383, 1603, 1601, 389, 6016, 1615, 1391, 5935, 27272, 5296, 5295, 5304, 5300, 1149, 5316, 26390]; 
    const commonPrice = [1 , 168, 198, 299, 1904, 320, 235, 433, 83, 482, 533, 866, 1789, 866,  482, 11500, 8054, 232, 2092, 1709, 36300, 19200, 46500, 58600, 81600, 60200];   
    const itemIDPurp = [27277, 25985, 27226, 27229, 27232, 25975, 26219 ];
    const purpPrice = [1300000000, 6600000, 27100000, 170700000, 141300000, 6100000, 64200000];
    const purpNames = ["Tumeken's shadow (uncharged)", "Elidinis' ward", "Masori mask", "Masori body", "Masori chaps", "Lightbearer", "Osmumten's fang"];
    const commonNames = ["Coins", "Death rune", "Soul rune", "Gold ore" , "Dragon dart" , "Mahogany logs" , "Sapphire" , "Emerald" , "Gold bar" , "Potato cactus" , "Raw shark" , "Ruby" , "Diamond" , "Raw manta ray" , "Cactus spine" , "Dragonstone" , "Battlestaff", "Coconut milk" , "Lilly of the sands", "Toadflax seed" , "Ranarr seed" , "Torstol seed" ,  "Snapdragon seed" , "Dragon med helm" , "Magic seed" , "Blood essence"];
    const purpLoot= ["assets/images/Tumeken's_shadow_(uncharged).png", "assets/images/Elidinis'_ward.png", "assets/images/Masori_mask.png", "assets/images/Masori_body.png", "assets/images/Masori_chaps.png", "assets/images/Lightbearer.png", "assets/images/Osmumten's_fang.png"];
    const commonLoot = ["https://oldschool.runescape.wiki/images/Coins_detail.png?404bc", 
    "https://oldschool.runescape.wiki/images/thumb/Death_rune_detail.png/1024px-Death_rune_detail.png?716ba",
    "https://oldschool.runescape.wiki/images/Soul_rune_detail.png?ad585", 
    "https://oldschool.runescape.wiki/images/thumb/Gold_ore_detail.png/1024px-Gold_ore_detail.png?ad615", 
    "https://oldschool.runescape.wiki/images/Dragon_dart_tip_detail.png?bdc25",
    "https://oldschool.runescape.wiki/images/thumb/Mahogany_logs_detail.png/1280px-Mahogany_logs_detail.png?8324b", 
    "https://oldschool.runescape.wiki/images/thumb/Sapphire_detail.png/800px-Sapphire_detail.png?200dd",
    "https://oldschool.runescape.wiki/images/thumb/Emerald_detail.png/800px-Emerald_detail.png?c99ac", 
    "https://oldschool.runescape.wiki/images/thumb/Gold_bar_detail.png/1280px-Gold_bar_detail.png?5ef03",
    "https://oldschool.runescape.wiki/images/thumb/Potato_cactus_detail.png/1024px-Potato_cactus_detail.png?1bf07", 
    "https://oldschool.runescape.wiki/images/thumb/Raw_shark_detail.png/1024px-Raw_shark_detail.png?a4a2c",
    "https://oldschool.runescape.wiki/images/thumb/Ruby_detail.png/800px-Ruby_detail.png?7041d", 
    "https://oldschool.runescape.wiki/images/thumb/Diamond_detail.png/800px-Diamond_detail.png?9ea5f", 
    "https://oldschool.runescape.wiki/images/thumb/Raw_manta_ray_detail.png/1024px-Raw_manta_ray_detail.png?0d195",
    "https://oldschool.runescape.wiki/images/Cactus_spine_detail.png?08f34", 
    "https://oldschool.runescape.wiki/images/thumb/Dragonstone_detail.png/800px-Dragonstone_detail.png?c6ee3", 
    "https://oldschool.runescape.wiki/images/thumb/Battlestaff_detail.png/800px-Battlestaff_detail.png?c5b58",
    "https://oldschool.runescape.wiki/images/thumb/Coconut_milk_detail.png/800px-Coconut_milk_detail.png?6771d", 
    "https://oldschool.runescape.wiki/images/thumb/Lily_of_the_sands_detail.png/1280px-Lily_of_the_sands_detail.png?3576d",
    "https://oldschool.runescape.wiki/images/Herb_seed_detail.png?e2d5a",
    "https://oldschool.runescape.wiki/images/Herb_seed_detail.png?e2d5a",  
    "https://oldschool.runescape.wiki/images/Herb_seed_detail.png?e2d5a",
    "https://oldschool.runescape.wiki/images/Herb_seed_detail.png?e2d5a", 
    "https://oldschool.runescape.wiki/images/thumb/Dragon_med_helm_detail.png/800px-Dragon_med_helm_detail.png?e3ed5",
    "https://oldschool.runescape.wiki/images/thumb/Magic_seed_detail.png/1280px-Magic_seed_detail.png?d844c",
    "https://oldschool.runescape.wiki/images/thumb/Blood_essence_detail.png/800px-Blood_essence_detail.png?60580"];
    const pointsWTP = [15141, 16465, 17789, 18451, 19114, 20437, 21761, 23085, 24409, 25729];
    const pointsNoWTP = [14803, 16084, 17365, 18005, 18646, 19927, 21208, 22489, 23770, 25051];
    const divisor = [1,20,40,90,100,180,200,250,250,250,250,300,400,450,600,600,1100,1100,1100,1400,1800,2200,2200,4000,6500,7500];
    $("#loot").css("visibility", "hidden");
    $("#controll").css("visibility", "hidden");

    const raid = () => {
        if(clicked){
            currentPoints = parseInt(pointsWTP[raidLevelIndex]);
        }else{
             currentPoints = parseInt(pointsNoWTP[raidLevelIndex]);
        }
        $("#form").remove();
        $("#loot").css("visibility", "visible");
        $("#controll").css("visibility", "visible");
        calculatePurpChance();
        interval = setInterval(getLoot, 1000);
    }

    const getLoot = () => {
        numberOfRuns--;     
        testRuns++;
        switch(numberOfRuns){
            case -1:
                clearInterval(interval);
                return;          
        }  

        $('.current-run').text("Current Run: " + testRuns);

        let purpNum = parseFloat(((Math.random()* (100.00 - 0.01 +1))+0.01).toFixed(2));

        if (purpNum < purpChance){
            let unique = ((purpNum/purpChance)*100).toFixed(2);
            if( unique >= 95.83 && unique < 100)
                displayPurp( 0 , 1);
            if(unique >= 83.33 && unique < 95.83)
                displayPurp( 1 , 1);
            if(unique >= 75.00 && unique < 83.33)
                displayPurp( 2 , 1);
            if(unique >= 66.67 && unique < 75.00)
                displayPurp( 3, 1);
            if(unique >= 58.34 && unique < 66.67)
                displayPurp( 4, 1);
            if(unique >= 29.17 && unique < 58.34)
                displayPurp( 5 ,1);
            if(unique >= 0.01 && unique < 29.17)
                displayPurp( 6, 1);
        }else{
            const itemRoll1 = calculateNormalChance(); 
            const itemRoll2 = calculateNormalChance(); 
            const itemRoll3 = calculateNormalChance();
            const itemRoll1Quantity = calculateQuantity(itemRoll1);
            const itemRoll2Quantity = calculateQuantity(itemRoll2);    
            const itemRoll3Quantity = calculateQuantity(itemRoll3);
            //need loop to go through all elements and 
            displayCommonLoot(itemRoll1,itemRoll1Quantity);
            displayCommonLoot(itemRoll2,itemRoll2Quantity);
            displayCommonLoot(itemRoll3,itemRoll3Quantity);

        }

    }

    const displayPurp = (n,q) => {
        totalGP += purpPrice[n];
        displayGold();
        if ($(".cards").find(".purp" +n).length !== 0){
            let added = parseInt($(".purp" + n).find(".white").text()) + q;
            $(".purp" + n).find(".white").text(added);
        }else{
            $(".cards").append(
                `<div class="gradient-border purp`+n+`" id="box-animated">
                    <div class="card card-created gradient-border">                
                        <button class="card-header-icon dropdown is-hoverable" aria-label="more options">
                            <img src="`+ purpLoot[n] +`"></img>
                            <p class="white">`+ q + `</p>
                            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                                <div class="dropdown-content">
                                <div class="dropdown-item">
                                    <p>`+purpNames[n]+`</p> 
                                    <p style="color:green;">Price: `+purpPrice[n]/1000000+`m</p>                                                             
                                </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>` 
            );
        }
    }

    const displayCommonLoot = (n,q) => {
        // $(".cards").load(location.href + " .cards");
        if ($(".cards").find(".item" +n).length !== 0){
            let added = parseInt($(".item" + n).find(".amount").text()) + q;
            $(".item" + n).find(".amount").text(added);    
        }else{
            $(".cards").append(
                `<div class="card card-created item`+ n +`">                
                    <button class="card-header-icon dropdown is-hoverable" aria-label="more options">
                        <img src="`+ commonLoot[n] +`"></img>
                        <p class="amount">`+ q + `</p>
                        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                            <div class="dropdown-content">
                            <div class="dropdown-item">
                                <p>`+commonNames[n] + `</p> 
                                <p>Price: `+ commonPrice[n] +`</p>                                                           
                            </div>
                            </div>
                        </div>
                    </button>
                </div>` 
            );
        }
    }

    const calculateNormalChance = () => {
        const item= parseInt(Math.random()*26);
        return item;
    }

    const calculatePurpChance= ()=>{
        const diff = parseInt(raidLevel) - 400;
        if(raidLevel > 400)
            purpChance = parseFloat((currentPoints/(10500 - 20*(400 + diff/3))).toFixed(2));
        else
            purpChance = parseFloat((currentPoints/(10500 - 20*raidLevel)).toFixed(2));  
    }

    const calculateQuantity= (n) => {
        const quantity = parseInt(currentPoints/divisor[n]);
        totalGP += commonPrice[n] * quantity;
        displayGold();
        return quantity;
    }

    const displayGold=()=>{
        let totalGPF;
        if(totalGP >= 1000000000){
            totalGPF = (totalGP/1000000000).toFixed(1);
            totalGPF += "b";
        }else if(totalGP >= 10000000){
            totalGPF = (totalGP/1000000).toFixed(1);
            totalGPF += "m";
        } else if (totalGP >= 1000 ) {
            totalGPF = (totalGP/1000).toFixed(1);
            totalGPF += "k";
        }              

        $('.gp').text(totalGPF);
    } 

    $("#submit").click(function(event){
        event.preventDefault();
        raidLevel = $(".raid-lvl").val().split(",")[0];
        numberOfRuns = $(".runs").val();
        raidLevelIndex = $(".raid-lvl").val().split(",")[1];
        raid(raidLevel, numberOfRuns);
    })

    $(".rerun").click(function() {
        location.reload(true);
    })

    $(".wtp").click(function () {
        if(!clicked){
            $(".wtp").css("background-color", "green");  
            clicked = true; 
            console.log("wtp was clicked");
        } else {
            $(".wtp").css("background-color", "grey");
            clicked = false;
            console.log("wtp was turned off");
        }
    })
});