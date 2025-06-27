//const textOptions = [
  "När klockorna ringde ljusnade jag. Kroppsförvisad men flytande. Efter att ha nedskjutit en ensam vinterduva. Som kanske var min mamma. Och att återvänt hem, doftande av krutrök. Misslyckad till och med att bli en skådespelerska. Så satte jag mig upp på huk. Jag hör min tyngd mot isen i balansjusteringarna för att behålla mitt huksittande. Och lyssnar bara efter ljudet emot min kind. Känslan som om jag hade kunnat stanna här för evigt. Jag ser regndropparna emot isens yta. Kom ihåg en aning av något jag tänkte tidigare men inte kom ihåg. Ögon allt för dyra att köpa… Oskulder liknade med grodor… Och is tappar. Särskrivet. Fler och fler röda frukter faller ut och sprids omkring. Så upphetsad, fortsätter bara gräva ut fler och samla dem i min famn. Jag är så glad att jag inte behöver tänka på något annat. Men kan inte samla alla. Minnesägg som utdrivna och strödda allestädes. En dag faller de nog någonstans. Sedan håller de tyst.",
  "När klockorna ringde ljusnade jag. Kroppsförvisad men flytande. Efter att ha nedskjutit en ensam vinterduva. Som kanske var min mamma. Och att återvänt hem, doftande av krutrök. Misslyckad till och med att bli en skådespelerska. Så satte jag mig upp på huk. Jag hör min tyngd mot isen i balansjusteringarna för att behålla mitt huksittande. Och lyssnar bara efter ljudet emot min kind. Känslan som om jag hade kunnat stanna här för evigt. Jag ser regndropparna emot isens yta. Kom ihåg en aning av något jag tänkte tidigare men inte kom ihåg. Ögon allt för dyra att köpa… Oskulder liknade med grodor… Och is tappar. Särskrivet. Fler och fler röda frukter faller ut och sprids omkring. Så upphetsad, fortsätter bara gräva ut fler och samla dem i min famn. Jag är så glad att jag inte behöver tänka på något annat. Men kan inte samla alla. Minnesägg som utdrivna och strödda allestädes. En dag faller de nog någonstans. Sedan håller de tyst.",
//];

//let currentIndex = 0;
//let isOriginalImage = true;


window.addEventListener('DOMContentLoaded', () => {
    const audio1 = document.getElementById('myAudio1');
    const audio2 = document.getElementById('myAudio2');

    // Ensure both are muted and playing on load
    audio1.muted = true;
    audio2.muted = true;
    audio1.play();
    audio2.play();

    document.getElementById('Button1').addEventListener('click', () => {
        audio1.muted = false;
        audio2.muted = true;
    });

    document.getElementById('Button2').addEventListener('click', () => {
        audio1.muted = true;
        audio2.muted = false;
    });
});
    // Change the links
//    document.getElementById("imageLink").setAttribute("href", "https://nettleskin.bandcamp.com/album/nettle-skin-2");
//    document.getElementById("textLink").setAttribute("href", "https://www.youtube.com/watch?v=On-97XOUOPo&pp=0gcJCdQJAYcqIYzv");
//    console.log("Links updated!");
//
    // Update text
//  if (currentIndex < textOptions.length) {
//    textElement.textContent = textOptions[currentIndex];
//    currentIndex++;
//  }

    // Alternate image only if not at the last text
//  if (currentIndex < textOptions.length) {
//    if (isOriginalImage) {
//      imageElement.src = "images/album2real_01.webp";
//    } else {
//      imageElement.src = "images/cd1ver8.jpg";
//    }
//    isOriginalImage = !isOriginalImage; // Toggle the image state
//  }
