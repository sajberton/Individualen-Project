
 let GreenPlayer = "green";
 let BluePlayer = "blue";
 let RedPlayer = "red";
 let YellowPlayer = "yellow";
 
 let activePlayers = [];
 let curentPlayer ;

 let random;

 // function for the next player to roll the dice
 function nextPlayer() { 
    let index = activePlayers.indexOf(curentPlayer);
        
     if(index >= 0 && index < activePlayers.length - 1)
     {
          curentPlayer = activePlayers[index + 1]
     }
     else if(index >= 0 && index == activePlayers.length - 1)
     {
         curentPlayer = activePlayers[0];
     }
     return curentPlayer;
  }  

// For the first step taking a piece out of the home box
$(".home").on("click", function(){
  
     if(random == 6)
    {
    //the color of the piece that is clicked    
    let myClass = $(this).find("div").attr('class');
    console.log(myClass);
    let start = 1;

    //The first field of the piece that is clicked
    let startingPoint = $(`[data-item-id-${myClass}="${start}"`);

    //The piece
    let peon = $(this).html();
   
    //If a piece that is clicked is not a empty field
    if (peon != "")
    {
    //if there is another piece in the first field   
        if(startingPoint.html() != "" && myClass === curentPlayer)
        {   
           // the color of the piece in the first field
           let startingPointClass = startingPoint.find("div").attr('class');
                
           // what hapens when the piece in the first field is not the same as the piece that is moving
           if( myClass != startingPointClass )
           {   
               //bringin the pushed piece back home               
               xxx(startingPointClass, startingPoint, 1);
               startingPoint.html(peon);
               $(this).html("");
               $('.message').html(`${startingPointClass.toUpperCase()} ENEMY DOWN NEAR BASE`).hide().fadeIn(500);          
           }
           else{
           $('.message').html("NO FRIENDLY FIRE").hide().fadeIn(500);
           console.log("NO FRIENDLY FIRE");
           }     
        }
        //If there is NO other piece in the first field    
        else if (startingPoint.html() == "" && myClass === curentPlayer)
        {
            startingPoint.html(peon);
            $(this).html("");
            $('.message').html(`WE CAN START IT'S ${curentPlayer.toUpperCase()} TURN AGAIN`).hide().fadeIn(500);                               
        }
        else
        {          
         $('.message').html("IT SHOULDNT HAVE COME TO THIS").hide().fadeIn(500);
         console.log("IT SHOULDNT HAVE COME TO THIS");
        }      
   } 
   //This Hapens if the user clicks on a empty field   
   else
   {
       $('.message').html("NO ONE HERE").hide().fadeIn(500);
       console.log("NO ONE HERE");
   } // end of if peon
 } // end za 6ka
});

//Moving a piece when is out of the Home box and in the field
$(`.move`).on("click", function(){

    let myClass =$(this).find("div").attr('class');
    console.log(myClass);
    
    if($(this).html() != "" && myClass === curentPlayer)
    {   
        let peon = $(this).html()
        //the number of the field where the clicked piece is
        let pDataID =  Number($(this).attr(`data-item-id-${myClass}`));  

        //the number of the next field
        let max = Number(pDataID + random);
       
        //Not to go beyond the last field
        if (max <= 44 )
        {
            let nextStep =  $(`[data-item-id-${myClass}="${max}"]`);
       
            if(nextStep.html() != "")
            {
                let nextStepClass = nextStep.find("div").attr('class');

                if( myClass != nextStepClass )
                {
                    xxx(nextStepClass, nextStep , 1);
                    
                    $('.message').html(`${nextStepClass.toUpperCase()} ENEMY IS DOWN ON THE FIELD`).hide().fadeIn(500);
                    nextStep.html(peon);
                    $(this).html("");                  
                    $('.message').html(`${curentPlayer.toUpperCase()} NEEDS TO MOVE A PIECE`).hide().fadeIn(500);

                        // when there is a 6 there is NO next player
                        if(random == 6){
                            random = random;
                        }
                        else{
                        random = 0;
                        }    
                }
                else
                {
                    $('.message').html("NO FRIENDLY FIRE").hide().fadeIn(500);
                    console.log("NO FRIENDLY FIRE");
                }    
            }
            else if (nextStep.html() == "")
            {
                nextStep.html(peon);
                $(this).html("");

                if(random == 6){
                    random = random;
                }
                else{
                random = 0;
                }
            }
            else
            {                            
                if(random == 6){
                    random = random;
                }
                else{
                random = 0;
                }

                $('.message').html("SOMETHING WENT WRONG !!! SOME ERROR").hide().fadeIn(500);
                console.log("SOMETHING WENT WRONG !!! SOME ERROR")
            }
        }// if max < 44
        else
        {
            $('.message').html("END OF THE ROAD").hide().fadeIn(500);
            console.log("END OF THE ROAD");
        }      
    } // if we picked something
    else
    {
        $('.message').html("PICK SOMETHING").hide().fadeIn(500);
        console.log("PICK SOMETHING");
    }
});
   
  //what hapens when the dice is rolled  
  $(".roll").on("click", function(){
      
    if(random == 6){ 

     $('.message').html(`${curentPlayer.toUpperCase()} NEEDS TO MOVE A PIECE`);
    }
    else{
        
        nextPlayer();
        console.log(`${curentPlayer} NEEDS TO MOVE A PIECE`);
        $('.message').html(`${curentPlayer.toUpperCase()} NEEDS TO MOVE A PIECE`);       
    }
    random = Math.floor((Math.random() * 6) + 1);
    $(this).html(random);
});

//Function for bringing a pushed figure Home
function xxx(Dclass, _nextStep, num) {      
    if($(`[data-item-home-${Dclass}="${num}"]`).html() == "")
    {
        $(`[data-item-home-${Dclass}="${num}"]`).html(_nextStep.html());
            return;
    }      
    xxx(Dclass, _nextStep, num + 1)      
}
//The START PAGE 
$("#start").on("click", function(){
    $("#startPage").css("display", "none");
    $("#board").css("display", "block");
    curentPlayer = activePlayers[0]; 
    return curentPlayer;  
})

$("#greenButton").on("click", function(){
    activePlayers.push(GreenPlayer);
    $("#greenButton").html("GREEN PLAYER SELECTED");
    return activePlayers;
})

$("#blueButton").on("click", function(){
    activePlayers.push(BluePlayer);
    $("#blueButton").html("BLUE PLAYER SELECTED");
    return activePlayers;
})

$("#redButton").on("click", function(){
    activePlayers.push(RedPlayer);
    $("#redButton").html("RED PLAYER SELECTED");
    return activePlayers;
})

$("#yellowButton").on("click", function(){
    activePlayers.push(YellowPlayer);
    $("#yellowButton").html("YELLOW PLAYER SELECTED");
    return activePlayers;
})



