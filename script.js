/* pseudokode: 
jeg skal have en function der tager indput fra inputfeletet med et specifikt id og så når den har testet det,
så ænderer den på p med et specifikt id, på specifikke dele af teksten. 
jeg skal bruge regEx til at finde og vurderer hvilke bogstaver der er store, små, specialtegn og numre mm. 
jeg skal bruge regEx til at genkende hvad der bliver tastet. og hvor meget den bruger af hvad, og hvad rækkefølged et kkommer i.
jeg skal så lave en farveindikator på, hvor sikkert det er, rød til grøn. som er påvirket af svaret også. 

så skal jeg lave at jo flere karakters, jo stærkere password. så det er inputlength
måske jeg skal give points? og så kan de forskellige ting give points? 
*/

//oversigt over elementer
const password = document.getElementById("passwordInput");
const outputTekst = document.getElementById("styrkeIndikator");
const bar = document.getElementById("farvetBar");

//
password.addEventListener("input", () => {
    const value = password.value; 
    const score = checkStrength(value);
    dinEvaluering(value.length, score); 
});

//regEx til at finde de forskellige ting i passwordet
const regExLetter=/[a-zæøå]/;
const regExUpperLetter=/[A-ZÆØÅ]/; 
const regExNumber =/\d/; //digits 
const regExSpecial = /[^A-ZÆØÅa-zæøå0-9]/; //alt der ikke er bogstaler eller tal

//score 0-5
function checkStrength (password) {
    let score = 0; 
   if (password.length >=8) {
    score++; 
   }
   if (regExLetter.test(password)) {
    score++; 
   }
   if (regExUpperLetter.test(password)) {
    score++; 
   }
   if (regExNumber.test(password)) {
    score++; 
   }
   if (regExSpecial.test(password)) {
    score++;
   }
   return score;
}

//function der tager input fra checkStrength og laver en evaluering af det.
function dinEvaluering(length, score) {
    let styrke =""; 
    let width = (score/5)*100; //procent af baren der skal fyldes ud.
    const value = password.value;
    //let color = "red"; //default farve
    const hue = (score/5)*100; //hue fra 0-120, hvor 0 er rød og 120 er grøn
    const color = `hsl(${hue}, 90%, 47%)`;

    if (value.includes("1234") || value.includes("password") || value.includes("kodeord")) {
        bar.style.width = "100%";
        bar.style.background ="hsl(0,100%,40%)"; 
        outputTekst.textContent="Aj, nu må du altså være seriøs, der er bare nogen ting man ikke gør..";
        return;
    } else if (score <= 2) {
        styrke = "svag brah"; 
        //color="red"; 
    } else if (score === 3 || score ===4) {
        styrke = "ret okay middel"; 
        //color = "orange"; 
    } else {
        styrke = "stærk og sej!";
        //color = "green"; 
    }
    //
    bar.style.width = `${width}%`;
    bar.style.background=color; 
    //
    outputTekst.textContent = `Dit password er ${length} karakterer lang og er ${styrke}`;

}








