import './style.scss';

const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const startingScreen = document.querySelector('.startingScreen');
const game = document.querySelector('.game');
const gameItems = document.getElementsByClassName('game-item');
const endScreen = document.querySelector('.endScreen');
const endScreenMessage = document.querySelector('.endScreen-message');
const playAgainBtn = document.querySelector('.playAgain');


const gameItemsArray = Array.from(gameItems);
const [item1, item2, item3, item4, item5, item6, item7, item8, item9] = [...gameItemsArray];
let xCounter = 0;
let oCounter = 0;
let fieldsUsedX = [];
let fieldsUsedO = [];
let freeFields = [1,2,3,4,5,6,7,8,9];
const winningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
let winningMoveX = Boolean;
let winningMoveO = Boolean;
let oDeffence;
let oOffence;
let xDeffence;
let xOffence;
let gameX = false;
let gameO = false;

//OPENING
option1.addEventListener('click', startTheGameX);

function startTheGameX() {
    startingScreen.classList.add("animate__animated", "animate__bounceOutDown")
    setTimeout(() => {
        startingScreen.style.display = 'none';
        game.style.display = 'grid';
        game.classList.add("animate_animated", "animate__zoomIn")
        gameX = true;
    },1000)
}
///////////////////////////////////////////
function addX(item) {
    if(winningMoveO !== true) {
    let x = item.firstElementChild;
         x.classList.add('XO__show');
         item.style.pointerEvents = "none";
         setTimeout(()=> {
            x.style.opacity= '1';
         },50)
         
         xCounter ++;
        // free fields adjustment
            let numberOfField = eval(item.id);
            freeFields.forEach((field) => {
                if(field === numberOfField) {
                   freeFields.splice(freeFields.indexOf(field), 1);
                }
            })
         gameItemsArray.splice(gameItemsArray.indexOf(item), 1);
         gameItemsArray.forEach((item) => {
         item.style.pointerEvents = 'none';
         })
        }
};

//callbacks 


function item1Event(a) {
    a = item1;
    fieldsUsedX.push(1);
    addX(a);
}
function item2Event(a) {
    a = item2;
    fieldsUsedX.push(2);
    addX(a);
}
function item3Event(a) {
    a = item3;
    fieldsUsedX.push(3);
    addX(a);
}
function item4Event(a) {
    a = item4;
    fieldsUsedX.push(4);
    addX(a);
}
function item5Event(a) {
    a = item5;
    fieldsUsedX.push(5);
    addX(a);
}
function item6Event(a) {
    a = item6;
    fieldsUsedX.push(6);
    addX(a);
}
function item7Event(a) {
    a = item7;
    fieldsUsedX.push(7);
    addX(a);
}
function item8Event(a) {
    a = item8;
    fieldsUsedX.push(8);
    addX(a);
}
function item9Event(a) {
    a = item9;
    fieldsUsedX.push(9);
    addX(a);
}
//////////////////////////////////////////////////////
function winningMoves() {
    if(winningMoveX === true) {
        setTimeout(() => {
            game.style.display = 'none';
            endScreen.style.display = 'block';
            endScreenMessage.innerHTML = 'YOU WON!'
        },1500)
            
            setTimeout(() => {
                endScreenMessage.style.opacity = '1'; 
                playAgainBtn.style.opacity = '1';
            },500)

    } if(winningMoveO === true) {
        endScreen.classList.add("animate__fadeInUp");
        setTimeout(() => {
            endScreenMessage.innerHTML = 'YOU LOSE!'
            game.style.display = 'none';
            endScreen.style.display = 'block';
        }, 1500)
        setInterval(() => {
            endScreenMessage.style.opacity = '1'; 
            playAgainBtn.style.opacity = '1';
        }, 1100)
    }
}
//////////////////////////////////////////////////////
function draw() {
endScreenMessage.innerHTML = 'DRAW!';
setTimeout(() => {
    game.style.display = 'none';
     endScreen.style.display = 'block';
},500)
  setTimeout(() => {
     endScreenMessage.style.opacity = '1';
     playAgainBtn.style.opacity = '1';
    },900)
}
//////////////////////////////////////////////////////////
playAgainBtn.addEventListener('click', () => {
    location.reload();
});

///////////////////////////////////////////////////////////

// evaluation for x
function evaluationX() {
   let sortedFiledsX = fieldsUsedX.sort();
   winningCombinations.forEach((element) => {
     let counter = 0;
      for(let i = 0; i < 3; i++) {
        sortedFiledsX.forEach((sortedElement) => {
        if(JSON.stringify(element[i]) === JSON.stringify(sortedElement)) {
            counter ++;
             } if(counter === 3) {
               fieldsUsedO = [];
               winningMoveO = false;
               winningMoveX = true;
          } 
      }) 
    }
 })
}

// evaluation for o
function evaluationO() {
let sortedFieldsO = fieldsUsedO.sort();
winningCombinations.forEach((element) => {
 let counter = 0;
    for(let i = 0; i < 3; i++) {
         sortedFieldsO.forEach((sortedElement) => {
         if(JSON.stringify(element[i]) === JSON.stringify(sortedElement)) {
         counter ++;
        } if(counter === 3) {
           fieldsUsedX = [];
           winningMoveX = false;
           winningMoveO = true;
         } 
       }) 
     }
 })
}

////////////////////////////////////////////////
function defence() {
            freeFields.forEach((freField) => {
                let potentialWin = [];
                fieldsUsedX.forEach((field) => {
                potentialWin.push(field);
                })
                potentialWin.push(freField);
                let sortedPotentialWin = potentialWin.sort();
                winningCombinations.forEach((winningCombo) => {
                    let counter = 0;
                    for(let i = 0; i < 3; i++) {
                        sortedPotentialWin.forEach((sortedPW) => {
                            if(winningCombo[i] === sortedPW) {
                                counter ++
                                if(counter === 3) {
                                    oDeffence = freField;
                                }
                            }
                        })
                    }
             })
    })    
}

function offence() {
    freeFields.forEach((freField) => {
        let potentialWin = [];
            fieldsUsedO.forEach((field) => {
              potentialWin.push(field);
        })
        potentialWin.push(freField);
        let sortedPotentialWin = potentialWin.sort();
        winningCombinations.forEach((winningCombo) => {
            let counter = 0;
            for(let i = 0; i < 3; i++) {
                sortedPotentialWin.forEach((sortedPW) => {
                    if(winningCombo[i] === sortedPW) {
                        counter ++
                        if(counter === 3) {
                            oOffence = freField;
                        }
                    }
                })
            }
        })
 })    
}


function offenceAndDefence(o) {
    if(winningMoveX !== true) {
        if(oOffence > 0) {
            let field = document.getElementById(oOffence);
            let numberOfField = oOffence;
     freeFields.forEach((field) => {
         if(field === numberOfField) {
            freeFields.splice(freeFields.indexOf(field), 1);
         }
     })
    
     field.style.pointerEvents = "none";
        oCounter ++;
        gameItemsArray.splice(gameItemsArray.indexOf(field), 1);
        fieldsUsedO.push(oOffence);
        setTimeout(() => {
        let o = field.firstElementChild.nextElementSibling;
        o.classList.add('XO__show');
        setTimeout(()=> {
            o.style.opacity= '1';
         },50)
        gameItemsArray.forEach((item) => {
        item.style.pointerEvents = 'auto';
        oOffence = 0;
        })
        }, 500);
    }else if(oDeffence > 0) {
        let field = document.getElementById(oDeffence);
        let numberOfField = oDeffence;
     freeFields.forEach((field) => {
         if(field === numberOfField) {
            freeFields.splice(freeFields.indexOf(field), 1);
         }
     })
     field.style.pointerEvents = "none";
        oCounter ++;
        gameItemsArray.splice(gameItemsArray.indexOf(field), 1);
        fieldsUsedO.push(oDeffence);
        setTimeout(() => {
        let o = field.firstElementChild.nextElementSibling;
        o.classList.add('XO__show');
        setTimeout(()=> {
            o.style.opacity= '1';
         },50)
        gameItemsArray.forEach((item) => {
        item.style.pointerEvents = 'auto';
        oDeffence = 0;
        })
        }, 500);
    } else {
        let randomNum = Math.floor(Math.random() * gameItemsArray.length);
        let randomItem = gameItemsArray[randomNum];
    
     //fre fields adjustment
     let numberOfField = eval(randomItem.id);
     freeFields.forEach((field) => {
         if(field === numberOfField) {
            freeFields.splice(freeFields.indexOf(field), 1);
         }
     })
        randomItem.style.pointerEvents = "none";
        oCounter ++;
        gameItemsArray.splice(gameItemsArray.indexOf(randomItem), 1);
        fieldsUsedO.push(eval(randomItem.id));
        setTimeout(() => {
        let o = randomItem.firstElementChild.nextElementSibling;
        o.classList.add('XO__show');
        setTimeout(()=> {
            o.style.opacity= '1';
         },50)
        gameItemsArray.forEach((item) => {
        item.style.pointerEvents = 'auto';
        })
        }, 500);
    }
    }

}

/////////////////////////////////////////////////////////ANIMATION
let container = [];
let container1 = [];
//for X
function animation() {
    winningCombinations.forEach(combination => {
        let counter = 0;
        fieldsUsedX.forEach(field => {
            for(let i = 0; i < combination.length; i++) {
                if(field === combination[i]) {
                    counter ++;
                    if(counter === 3) {
                      combination.forEach(number => {
                        if(container.length < 3) {
                            container.push(number);
                        }
                      })
                    }
                }
            }
        })
    })
    //for O
    winningCombinations.forEach(combination => {
        let counter = 0;
        fieldsUsedO.forEach(field => {
            for(let i = 0; i < combination.length; i++) {
                if(field === combination[i]) {
                    counter ++;
                    if(counter === 3) {
                      combination.forEach(number => {
                        if(container1.length < 3) {
                            container1.push(number);
                        }
                      })
                    }
                }
            }
        })
    })
}

function animation1() {
    //for X
    if(container.length === 3) {
        let fields = [];
        container.forEach(number => {
          let field = document.getElementById(number);
           fields.push(field);

        })
        fields.forEach(field => {
            field.firstElementChild.firstElementChild.classList.add("animate__animated", "animate__flash");
            field.firstElementChild.firstElementChild.nextElementSibling.classList.add("animate__animated", "animate__flash");
        })
    }
    //for 0
    if(container1.length === 3) {
        let fields = [];
        container1.forEach(number => {
          let field = document.getElementById(number);
           fields.push(field);

        })
        fields.forEach(field => {
            setInterval(() => {
                field.firstElementChild.nextElementSibling.classList.add("animate__animated", "animate__flash");
            },350)
            
        })
    }
}
//////////////////////////////
function Game() {
animation1()
animation();

    defence();
   
    winningMoves();

        if(xCounter === oCounter) {

            evaluationO();

            item1.addEventListener('click', item1Event);
            item2.addEventListener('click', item2Event);
            item3.addEventListener('click', item3Event);
            item4.addEventListener('click', item4Event);
            item5.addEventListener('click', item5Event);
            item6.addEventListener('click', item6Event);
            item7.addEventListener('click', item7Event);
            item8.addEventListener('click', item8Event);
            item9.addEventListener('click', item9Event);
        }
         else if(xCounter > oCounter && xCounter !== 5) {
        offence();
        defence();

        item1.removeEventListener('click', item1Event);
        item2.removeEventListener('click', item2Event);
        item3.removeEventListener('click', item3Event);
        item4.removeEventListener('click', item4Event);
        item5.removeEventListener('click', item5Event);
        item6.removeEventListener('click', item6Event);
        item7.removeEventListener('click', item7Event);
        item8.removeEventListener('click', item8Event);
        item9.removeEventListener('click', item9Event);
        evaluationX();

        offenceAndDefence();

        } else if( xCounter === 5) {
            evaluationX();
            setTimeout(animation1, 600);
            if (winningMoveX != true) {
                draw();
            }
        }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
setInterval(() => {
   if(gameX === true) {
       Game();
   } if(gameO === true) {
    game__O();
   }
}, 200)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////GAME O///////////////////////////////////////////////////////////////////////////////////////////////////////////
option2.addEventListener('click', startTheGameO);
function startTheGameO() {
    startingScreen.classList.add("animate__animated", "animate__bounceOutDown")
    setTimeout(() => {
        startingScreen.style.display = 'none';
        game.style.display = 'grid';
        game.classList.add("animate_animated", "animate__zoomIn")
        gameO = true;
    },1000)

}
///////////////////////////////////////
function addO(item) {
    if(winningMoveO !== true) {
    let o = item.firstElementChild.nextElementSibling;
         o.classList.add('XO__show');
         item.style.pointerEvents = "none";
         setTimeout(()=> {
            o.style.opacity= '1';
         },200)
         
         oCounter ++;
        // fre fields adjustment
            let numberOfField = eval(item.id);
            freeFields.forEach((field) => {
                if(field === numberOfField) {
                   freeFields.splice(freeFields.indexOf(field), 1);
                }
            })
         gameItemsArray.splice(gameItemsArray.indexOf(item), 1);
         gameItemsArray.forEach((item) => {
         item.style.pointerEvents = 'none';
         })
        }
};
// call backs

function item1EventO(a) {
    a = item1;
    fieldsUsedO.push(1);
    addO(a);
}
function item2EventO(a) {
    a = item2;
    fieldsUsedO.push(2);
    addO(a);
}
function item3EventO(a) {
    a = item3;
    fieldsUsedO.push(3);
    addO(a);
}
function item4EventO(a) {
    a = item4;
    fieldsUsedO.push(4);
    addO(a);
}
function item5EventO(a) {
    a = item5;
    fieldsUsedO.push(5);
    addO(a);
}
function item6EventO(a) {
    a = item6;
    fieldsUsedO.push(6);
    addO(a);
}
function item7EventO(a) {
    a = item7;
    fieldsUsedO.push(7);
    addO(a);
}
function item8EventO(a) {
    a = item8;
    fieldsUsedO.push(8);
    addO(a);
}
function item9EventO(a) {
    a = item9;
    fieldsUsedO.push(9);
    addO(a);
}
///////////////////////////////////////
function evaluationXa() {
    let sortedFiledsX = fieldsUsedX.sort();
    winningCombinations.forEach((element) => {
      let counter = 0;
       for(let i = 0; i < 3; i++) {
         sortedFiledsX.forEach((sortedElement) => {
         if(JSON.stringify(element[i]) === JSON.stringify(sortedElement)) {
             counter ++;
              } if(counter === 3) {
                fieldsUsedO = [];
                winningMoveO = true;
                winningMoveX = false;
           } 
       }) 
     }
  })
 }

 function evaluationOa() {
    let sortedFieldsO = fieldsUsedO.sort();
    winningCombinations.forEach((element) => {
     let counter = 0;
        for(let i = 0; i < 3; i++) {
             sortedFieldsO.forEach((sortedElement) => {
             if(JSON.stringify(element[i]) === JSON.stringify(sortedElement)) {
             counter ++;
            } if(counter === 3) {
               fieldsUsedX = [];
               winningMoveX = true;
               winningMoveO = false;
             } 
           }) 
         }
     })
    }
///////////////////////////////////////////////

function defenceX() {
    freeFields.forEach((freField) => {
        let potentialWin = [];
        fieldsUsedO.forEach((field) => {
        potentialWin.push(field);
        })
        potentialWin.push(freField);
        let sortedPotentialWin = potentialWin.sort();
        winningCombinations.forEach((winningCombo) => {
            let counter = 0;
            for(let i = 0; i < 3; i++) {
                sortedPotentialWin.forEach((sortedPW) => {
                    if(winningCombo[i] === sortedPW) {
                        counter ++
                        if(counter === 3) {
                            xDeffence = freField;
                        }
                    }
                })
            }
     })
})    
}


function offenceX() {
    freeFields.forEach((freField) => {
        let potentialWin = [];
            fieldsUsedX.forEach((field) => {
              potentialWin.push(field);
        })
        potentialWin.push(freField);
        let sortedPotentialWin = potentialWin.sort();
        winningCombinations.forEach((winningCombo) => {
            let counter = 0;
            for(let i = 0; i < 3; i++) {
                sortedPotentialWin.forEach((sortedPW) => {
                    if(winningCombo[i] === sortedPW) {
                        counter ++
                        if(counter === 3) {
                            xOffence = freField;
                        }
                    }
                })
            }
        })
 })    
}



function offenceAndDefenceX() {
    if(xOffence > 0) {
            let field = document.getElementById(xOffence);
            let numberOfField = xOffence;
     freeFields.forEach((field) => {
         if(field === numberOfField) {
            freeFields.splice(freeFields.indexOf(field), 1);
         }
     })
    
     field.style.pointerEvents = "none";
        xCounter ++;
        gameItemsArray.splice(gameItemsArray.indexOf(field), 1);
        fieldsUsedX.push(xOffence);
        setTimeout(() => {
        let x = field.firstElementChild;
        x.classList.add('XO__show');
        setTimeout(()=> {
            x.style.opacity= '1';
         },50)
        gameItemsArray.forEach((item) => {
        item.style.pointerEvents = 'auto';
        xOffence = 0;
        setTimeout(animation1, 300)
        })
        }, 300);
    }else if(xDeffence > 0) {
        let field = document.getElementById(xDeffence);
        let numberOfField = xDeffence;
     freeFields.forEach((field) => {
         if(field === numberOfField) {
            freeFields.splice(freeFields.indexOf(field), 1);
         }
     })
     field.style.pointerEvents = "none";
        xCounter ++;
        gameItemsArray.splice(gameItemsArray.indexOf(field), 1);
        fieldsUsedX.push(xDeffence);
        setTimeout(() => {
        let x = field.firstElementChild;
        x.classList.add('XO__show');
        setTimeout(()=> {
            x.style.opacity= '1';
         },50)
        gameItemsArray.forEach((item) => {
        item.style.pointerEvents = 'auto';
        xDeffence = 0;
        setTimeout(animation1, 300)
        })
        }, 300);
    }
    else {
        
        let randomNum = Math.floor(Math.random() * gameItemsArray.length);
        let randomItem = gameItemsArray[randomNum];
    
     //fre fields adjustment
     let numberOfField = eval(randomItem.id);
     freeFields.forEach((field) => {
         if(field === numberOfField) {
            freeFields.splice(freeFields.indexOf(field), 1);
         }
     })
        gameItemsArray.forEach((item) => {
        item.style.pointerEvents = 'none';
        })
        randomItem.style.pointerEvents = "none";
        xCounter ++;
        gameItemsArray.splice(gameItemsArray.indexOf(randomItem), 1);
        fieldsUsedX.push(eval(randomItem.id));
        setTimeout(() => {
        let x = randomItem.firstElementChild;
        x.classList.add('XO__show');
        setTimeout(()=> {
            x.style.opacity= '1';
         },50)
        gameItemsArray.forEach((item) => {
        item.style.pointerEvents = 'auto';
        })
        setTimeout(animation1, 300)
        }, 300);
    }
    }
/////////////////////////////////////////////
function game__O() {
        animation();
            defenceX();
            winningMoves();
            if(xCounter === oCounter) {
                evaluationOa();
                animation1();
                if(winningMoveX !== true) {
                    offenceX();
                    offenceAndDefenceX();
                }
            }
             else if(xCounter > oCounter && xCounter !== 5) {
    
            item1.addEventListener('click', item1EventO);
            item2.addEventListener('click', item2EventO);
            item3.addEventListener('click', item3EventO);
            item4.addEventListener('click', item4EventO);
            item5.addEventListener('click', item5EventO);
            item6.addEventListener('click', item6EventO);
            item7.addEventListener('click', item7EventO);
            item8.addEventListener('click', item8EventO);
            item9.addEventListener('click', item9EventO);
            evaluationXa();
    
            } else if( xCounter === 5) {
                evaluationXa();
                setTimeout(animation1, 600);
                if (winningMoveO !== true) {
                    draw();
                }
            }
            
    }

