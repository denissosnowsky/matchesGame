//The 'computerSteps' array consists of all the possible steps including the last one when there are no matches left.
//Each internal array of the 'computerSteps' array is the instuction the computer will do on each step
//Each step (array) consists of two objects, which describes two different desicions the computer can make
//Which object the computer choose depends on whether it has odd or even quantity of matches on its account
//Object has four properties: 'e' - stands for 'even',  which is boolean and inidcates whether the quantity of matches on the computer account is even(true) or not(false); 'l' - stands for 'leftovers', which is number and shows us how much matches left not taken; 'c' - stands for 'condition', which is boolean and indicates whether the step is winning or losing in any way at a particular step; 's' - stands for 'steps', which is number and indicates how many matches the computer is going to take to make the best desicion. If it is on the losing step (where every step gives the opponent better position), the computer take only one match.
//Consider the 'computerSteps' as a matrix, where each row out of 'n' rows indicates the number of matches left, and where are 2 columns: the first one considers even leftover of the computer account on each step, and the second one considers odd leftover on the account.

const initalizationScript = (n, m) => {

    //'m' - the maximum number of matches to take
    //'n' - the number of matches
    let computerSteps = [];
    let l = 3; // leftover to consider from the third last step

    //The three steps below are always the same
    computerSteps.push([{e: true, l: 0, c: true, s: 0}, {e: false, l: 0, c: false, s: 0}]); // all steps finished 
    computerSteps.push([{e: true, l: 1, c: false, s: 1}, {e: false, l: 1, c: true, s: 1}]); // the last step
    computerSteps.push([{e: true, l: 2, c: true, s: 2}, {e: false, l: 2, c: true, s: 1}]); // the second last step 

    //The while cycle below initialize the algorithm for the computer how to play a game
    while(computerSteps.length < n+1){
        let stepArray = []; //consists of two objects for this step 
        let evenObject = {e: true, l: l}; // object when the computer account lefover is even
        let oddObject = {e: false, l: l}; // object when the computer accoutn lefover is odd
    
        if(l % 2 === 0){
            for (let i = 1; i<=m; i++){
                if(computerSteps[computerSteps.length-i] && !computerSteps[computerSteps.length-i][1].c){
                    evenObject.c = true;
                    evenObject.s = i;
                    break;
                }
            }
            if(evenObject.c !== true){
                evenObject.c = false;
                evenObject.s = 1;
            }
            for (let i = 1; i<=m; i++){
                if(computerSteps[computerSteps.length-i] && !computerSteps[computerSteps.length-i][0].c){
                    oddObject.c = true;
                    oddObject.s = i;
                    break;
                }
            }
            if(oddObject.c !== true){
                oddObject.c = false;
                oddObject.s = 1;
            };
        };
    
        if(l%2 === 1){
            for (let i = 1; i<=m; i++){
                if(computerSteps[computerSteps.length-i] && !computerSteps[computerSteps.length-i][0].c){
                    evenObject.c = true;
                    evenObject.s = i;
                    break;
                }
            }
            if(evenObject.c !== true){
                evenObject.c = false;
                evenObject.s = 1;
            }
            for (let i = 1; i<=m; i++){
                if(computerSteps[computerSteps.length-i] && !computerSteps[computerSteps.length-i][1].c){
                    oddObject.c = true;
                    oddObject.s = i;
                    break;
                }
            }
            if(oddObject.c !== true){
                oddObject.c = false;
                oddObject.s = 1;
            };
        };
    
        stepArray[0] = evenObject;
        stepArray[1] = oddObject;
        l++;
        computerSteps.push(stepArray);
    };

    return computerSteps;
};

export default initalizationScript;