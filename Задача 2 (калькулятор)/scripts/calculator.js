const inputValue = (value) => {
    document.getElementById('display').value += value;
}

const clearDisplay = () => {
    document.getElementById('display').value = '';
}

const backspace = () => {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

const calculate = () => {
    let display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Ошибка";
    }
}

const copyToClipboard = () => {
    let display = document.getElementById('display');
    navigator.clipboard.writeText(display.value).then(() => {
        alert('Скопировано!');
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('keyup', function(event){
        console.log('Key: ', event.key);
        const key = event.key;
        if(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "*", "/", "+", "-"].indexOf(key) > -1)
            document.getElementById('display').value += String(key);
        else if(key == "Backspace")
            backspace()
        else if(key == "Enter" || key == "=")
            calculate()
        else if(key.toLowerCase() == "c")
            clearDisplay()
        else
            return
    });
});
