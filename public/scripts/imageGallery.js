//  change the main image with a small one

let mainImage = document.getElementById("mainImage");
let smallImage = document.getElementsByClassName("small-img");


smallImage[0].onclick = function(){
    mainImage.src = smallImage[0].src;
}
smallImage[1].onclick = function(){
    mainImage.src = smallImage[1].src;
}
smallImage[2].onclick = function(){
    mainImage.src = smallImage[2].src;
}
smallImage[3].onclick = function(){
    mainImage.src = smallImage[3].src;
}
smallImage[4].onclick = function(){
    mainImage.src = smallImage[4].src;
}