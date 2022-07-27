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