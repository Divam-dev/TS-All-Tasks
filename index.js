
// Функція додавання
function add(a, b) {
    return a + b;
}

// Функція віднімання
function subtract(a, b) {
    return a - b;
}

// Функція множення
function multiply(a, b) {
    return a * b;
}

// Функція ділення
function divide(a, b) {
    if (b === 0) {
        return "Неможливо поділити на нуль!";
    }
    return a / b;
}

// Функція обчислення відсотка
function percentage(a, b) {
    return (a * b) / 100;
}

// Функція обчислення квадратного кореня
function squareRoot(a) {
    if (a < 0) {
        return "Неможливо обчислити квадратний корінь з від'ємного числа!";
    }
    return Math.sqrt(a);
}

// Функція піднесення до степеня
function power(a, b) {
    return Math.pow(a, b);
}

// Функція обчислення факторіалу
function factorial(a) {
    if (a < 0) {
        return "Неможливо обчислити факторіал від'ємного числа!";
    }
    if (a === 0 || a === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= a; i++) {
        result *= i;
    }
    return result;
}

// Функція округлення числа
function round(number, decimals) {
    return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
}

// Функція об'єднання рядків
function concatenateStrings(str1, str2) {
    return str1 + str2;
}

// Функція підрахунку кількості символів
function countCharacters(str) {
    return str.length;
}

// Функція перетворення рядка у верхній регістр
function toUpperCase(str) {
    return str.toUpperCase();
}

// Функція перетворення рядка у нижній регістр
function toLowerCase(str) {
    return str.toLowerCase();
}

// Функція видалення пробілів по краях
function trimString(str) {
    return str.trim();
}

// Основна функція
function calculator() {
    console.log("Розширений калькулятор");
    console.log("Доступні операції:");
    console.log("1. Додавання (+)");
    console.log("2. Віднімання (-)");
    console.log("3. Множення (*)");
    console.log("4. Ділення (/)");
    console.log("5. Відсоток (%)");
    console.log("6. Квадратний корінь (sqrt)");
    console.log("7. Піднесення до степеня (^)");
    console.log("8. Факторіал (!)");
    console.log("9. Округлення (round)");
    console.log("10. Об'єднання рядків (concatenate)");
    console.log("11. Підрахунок символів (count)");
    console.log("12. Перетворення у верхній регістр (uppercase)");
    console.log("13. Перетворення у нижній регістр (lowercase)");
    console.log("14. Видалення пробілів по краях (trim)");
    console.log("15. Вийти");

    while (true) {
        let choice = prompt("Виберіть операцію (1-15):");
        if (choice === "15") {
            break;
        }

        let a, b, result, str;

        switch (choice) {
            case "1":
                a = parseFloat(prompt("Введіть перше число:"));
                b = parseFloat(prompt("Введіть друге число:"));
                result = add(a, b);
                console.log(`${a} + ${b} = ${result}`);
                break;
            case "2":
                a = parseFloat(prompt("Введіть перше число:"));
                b = parseFloat(prompt("Введіть друге число:"));
                result = subtract(a, b);
                console.log(`${a} - ${b} = ${result}`);
                break;
            case "3":
                a = parseFloat(prompt("Введіть перше число:"));
                b = parseFloat(prompt("Введіть друге число:"));
                result = multiply(a, b);
                console.log(`${a} * ${b} = ${result}`);
                break;
            case "4":
                a = parseFloat(prompt("Введіть перше число:"));
                b = parseFloat(prompt("Введіть друге число:"));
                result = divide(a, b);
                console.log(`${a} / ${b} = ${result}`);
                break;
            case "5":
                a = parseFloat(prompt("Введіть число:"));
                b = parseFloat(prompt("Введіть відсоток:"));
                result = percentage(a, b);
                console.log(`${b}% від ${a} = ${result}`);
                break;
            case "6":
                a = parseFloat(prompt("Введіть число:"));
                result = squareRoot(a);
                console.log(`√${a} = ${result}`);
                break;
            case "7":
                a = parseFloat(prompt("Введіть число:"));
                b = parseFloat(prompt("Введіть показник степеня:"));
                result = power(a, b);
                console.log(`${a}^${b} = ${result}`);
                break;
            case "8":
                a = parseInt(prompt("Введіть число:"));
                result = factorial(a);
                console.log(`${a}! = ${result}`);
                break;
            case "9":
                a = parseFloat(prompt("Введіть число:"));
                b = parseInt(prompt("Введіть кількість десяткових знаків:"));
                result = round(a, b);
                console.log(`${a} округлене до ${b} знаків після коми = ${result}`);
                break;
            case "10":
                a = prompt("Введіть перший рядок:");
                b = prompt("Введіть другий рядок:");
                result = concatenateStrings(a, b);
                console.log(`"${a}" + "${b}" = "${result}"`);
                break;
            case "11":
                str = prompt("Введіть рядок:");
                result = countCharacters(str);
                console.log(`Кількість символів у "${str}": ${result}`);
                break;
            case "12":
                str = prompt("Введіть рядок:");
                result = toUpperCase(str);
                console.log(`Верхній регістр: "${result}"`);
                break;
            case "13":
                str = prompt("Введіть рядок:");
                result = toLowerCase(str);
                console.log(`Нижній регістр: "${result}"`);
                break;
            case "14":
                str = prompt("Введіть рядок:");
                result = trimString(str);
                console.log(`Рядок без пробілів по краях: "${result}"`);
                break;
            default:
                console.log("Невірний вибір.");
        }
    }
}

calculator();