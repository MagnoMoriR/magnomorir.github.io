const currencySelect = document.getElementById("currency");
const calculateButton = document.getElementById("calculateButton");
const resultInput = document.getElementById("resultInput");

let cavali = 4.50;
let firmaElectro = 8.50;
let currencySymbol = "S/";

currencySelect.addEventListener("change", function () {
    if (currencySelect.value === "dolares") {
        cavali = 1.30;
        firmaElectro = 0.55;
        currencySymbol = "$";
    } else {
        cavali = 4.50;
        firmaElectro = 8.50;
        currencySymbol = "S/";
    }
});

calculateButton.addEventListener("click", function () {
    const amount = parseFloat(document.getElementById("amount").value);
    const days = parseInt(document.querySelector('input[name="days"]:checked')?.value || document.getElementById("days_Other").value);
    const financing = parseFloat(document.getElementById("financing").value) / 100;
    const rate = parseFloat(document.getElementById("rate").value) / 100;

    // Validar si los campos están completos
    if (isNaN(amount) || isNaN(days) || isNaN(financing) || isNaN(rate)) {
        resultInput.value = "Por favor, completa todos los campos.";
        return;
    }

    const interes = ((1 + rate) ** (days / 30) - 1) * amount;
    const comisionEstructura = amount * 0.02;
    const igvCom = comisionEstructura * 0.18;
    const igvCavali = (cavali + firmaElectro) * 0.18 + (currencySymbol === "$" ? 0.23 : 0.8);
    const garantia = (1 - financing) * amount;

    // Calcular el monto a abonar
    const montoAbonar = amount - (interes + comisionEstructura + cavali + firmaElectro + igvCom + igvCavali + garantia);

    // Mostrar resultado con validación de valor negativo
    if (montoAbonar < 0) {
        resultInput.value = `${currencySymbol} 0.00 (El monto calculado es negativo, verifica los valores ingresados).`;
    } else {
        resultInput.value = `${currencySymbol} ${montoAbonar.toFixed(2)}`;
    }
});
