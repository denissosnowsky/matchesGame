function gamePlay(number, computerAccount, userAccount, matches, computerSteps, m){

    if(matches === 0){
        return {failed: true, msg: 'Игра окончена'};
    }

    let computerAccountInner = computerAccount;
    let userAccountInner = userAccount;
    let matchesInner = matches;

    if(number>m || number<1){
        return {failed: true, msg: 'Введите правильное число'};
    };

    if(matches < number){
        return {failed: true, msg: 'Спичек осталось меньше'};
    }

    if(!/(?=^\d+$)/.test(+number)){
        return {failed: true, msg: 'Введите число'};
    }

    userAccountInner += number;
    matchesInner -= number;
    let computerStep = 0;

    if(computerAccountInner % 2 === 0 || computerAccountInner === 0){
        computerStep = computerSteps[matchesInner][0].s;
        computerAccountInner += computerStep;
        matchesInner -= computerStep;
    } else if(computerAccountInner % 2 === 1){
        computerStep = computerSteps[matchesInner][1].s;
        computerAccountInner += computerStep;
        matchesInner -= computerStep;
    }

    if(matchesInner === 0){
        if(computerAccountInner % 2 ===0){
            return {matches: 0, computerAccount: computerAccountInner, userAccount: userAccountInner, winner: 'Вы проиграли', failed: false}
        } else if (userAccountInner % 2 ===0){
            return {matches: 0, computerAccount: computerAccountInner, userAccount: userAccountInner, winner: 'Вы выиграли', failed: false}
        };
    };

    return {
        computerAccount: computerAccountInner,
        userAccount: userAccountInner,
        matches: matchesInner,
        failed: false
    }
};

export default gamePlay;