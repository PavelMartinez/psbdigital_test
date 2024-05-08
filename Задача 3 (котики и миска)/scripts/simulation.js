document.getElementById('start-button').addEventListener('click', startSimulation);

function startSimulation() {
    const numCats = parseInt(document.getElementById('num-cats').value);
    const bowlCapacity = parseInt(document.getElementById('bowl-capacity').value);
    const catFeed = parseInt(document.getElementById('cat-feed').value);
    const feedTime = parseInt(document.getElementById('feed-time').value);
    const refillTime = parseInt(document.getElementById('refill-time').value);
    const logDiv = document.getElementById('log');
    let currentBowlAmount = bowlCapacity;
    let totalTime = 0;
    let catIndex = 1;
    let isRefilling = false;

    if (catFeed > bowlCapacity) {
        logDiv.innerHTML = "Котик не может съесть больше одной миски";
        return;
    }

    logDiv.innerHTML = "Запуск симуляции...\n";

    function simulateNextEvent() {
        if (catIndex > numCats) {
            logDiv.innerHTML += `Все котики покормлены! Всего потрачено времени: ${totalTime} секунд.\n`;
            return;
        }

        if (isRefilling) {
            logDiv.innerHTML += `Бабушка пополнила миску.\n`;
            currentBowlAmount = bowlCapacity;
            isRefilling = false;
            totalTime += refillTime;
        }

        if (currentBowlAmount < catFeed) {
            logDiv.innerHTML += `Миска пуста! Бабушка пополняет миску ${refillTime} секунд.\n`;
            isRefilling = true;
            setTimeout(simulateNextEvent, refillTime * 1000);
        } else {
            logDiv.innerHTML += `Котик под номером ${catIndex} подошёл к миске.\n`;
            currentBowlAmount -= catFeed;
            totalTime += feedTime;

            setTimeout(() => {
                logDiv.innerHTML += `Котик под номером ${catIndex} отошёл от миски. \n`;
                catIndex += 1;
                simulateNextEvent();
            }, feedTime * 1000);
        }
    }

    simulateNextEvent();
}
