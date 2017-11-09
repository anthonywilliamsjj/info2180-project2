window.onload=function(){

    generatepuzzle();
    let shuffle=document.getElementById('shufflebutton');
    shuffle.addEventListener('click',function(){
            shuffletiles();
    });

}



function generatepuzzle(){
    let image = 'image.jpg';
    let tilenumber = 1;
    let topoffset = 80;
    let leftoffset = 500;
    let int = 0;
    let xcord = 0;
    let ycord = 0;
    let t = '';
    let l = '';
    let emptytop = 0;
    let emptyleft= 0; 
    let puzzle= document.getElementById('puzzlearea');
    let puzzlepiece=puzzle.querySelectorAll('div');
    
    //PUZZLE LAYOUT
    puzzlepiece.forEach(function(tile){
        tile.classList.add('puzzlepiece');
        tile.style.backgroundImage="url("+image+")";
        tile.style.position='fixed';
        tile.style.color='yellow';
        t=topoffset;
        tile.style.top=t+='px';
        l=leftoffset;
        tile.style.left=l+='px';
        ycord=int;
        tile.style.backgroundPositionY=-ycord+'px';
        tile.style.backgroundPositionX=-xcord+'px';
        xcord+=100;
        leftoffset+=100;
        tilenumber++;

        if((tilenumber-1)%4===0){
          topoffset+=100;
            leftoffset=500;
            int +=100;
            xcord=0;
        }

        if(tilenumber===15){
            emptytop=+topoffset;
            emptyleft=leftoffset+100;

            emptytop+='px';
            emptyleft+='px';
            puzzlepiece.forEach(function(tile){
                tile.addEventListener('click',function(){
                    //CHECK IF TILE IS MOVEABLE THEN SWAP WITH SELECTED
                    if (movetest(parseInt(emptytop),parseInt(emptyleft),parseInt(tile.style.top),parseInt(tile.style.left))===true){
                        let emptyvalues=switchtile(emptytop,emptyleft,tile);
                        emptytop=emptyvalues[0];
                        emptyleft=emptyvalues[1];
                        reevaluate(emptytop,emptyleft);
                    }
                });
                tile.addEventListener('mouseover',function(){
                    //use the move test to determine if the tile is moveable the use classList.add('moveablepiece');
                    if (movetest(parseInt(emptytop),parseInt(emptyleft),parseInt(tile.style.top),parseInt(tile.style.left))===true){
                        tile.classList.add('movablepiece');
                    }
                });
            })
        }
    });
}


function movetest(top,left,ctop,cleft){
    pass='';
    if((top-ctop ===0 && left-cleft=== 100) || (top-ctop===0 && left-cleft=== -100) || (top-ctop ===-100 && left-cleft===0) 
        || (top-ctop===100 && left-cleft===0)){
        pass= true;
    }
    else{
        pass= false;
    }
    return pass;
}

function switchtile(top,left,tile){
    let temp1=tile.style.top;
    let temp2=tile.style.left;
    tile.style.top=top;
    tile.style.left=left;
    top=temp1;
    left=temp2;
    return [top,left];
}

//Re-evaluate - Empty Space to Add/Remove the Event Listeners
function reevaluate(emptytop,emptytop){
    let puzzle= document.getElementById('puzzlearea');
    let puzzlepiece=puzzle.querySelectorAll('div');

    puzzlepiece.forEach(function(tile){
        tile.removeEventListener('mouseover',removeclass(tile));
        tile.addEventListener('mouseover',function(emptytop,emptyleft){
            if (movetest(parseInt(emptytop),parseInt(emptyleft),parseInt(tile.style.top),parseInt(tile.style.left))===true){
                    tile.classList.add('movablepiece');
            }

        });
    })


    function removeclass(item){
        item.classList.remove('movablepiece');
    }    
}


//SHUFFLE PUZZLE ELEMENTS
function shuffletiles(){
    let ran_num=Math.floor(Math.random() * 100) + 1; // returns a number between 1 and 100
    tile.style.color='black';

};