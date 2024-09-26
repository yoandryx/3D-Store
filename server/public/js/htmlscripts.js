
function menuOpen() {

    document.getElementById('menu').classList.toggle("show-menu");
    document.getElementById('bars').classList.toggle("change");

} 


function menuClose(){

    document.getElementById('menu').classList.remove("show-menu");

}


function vaseCardOpen() {

    document.getElementById('vase-card').classList.toggle("show");
   
    let msg = document.getElementById('card-switch').innerText;

    if(msg == "scatter_plot") {
        msg = "close";
        document.getElementById('card-switch').innerText = msg;
    } else if (msg == "close") {
        msg = "scatter_plot";
        document.getElementById('card-switch').innerText = msg;
    }

}


function handCardOpen() {
    document.getElementById('hands-card').classList.toggle("show");

    let msg = document.getElementById('card-switch2').innerText;

    if(msg == "scatter_plot") {
        msg = "close";
        document.getElementById('card-switch2').innerText = msg;
    } else if (msg == "close") {
        msg = "scatter_plot";
        document.getElementById('card-switch2').innerText = msg;
    }
}


function cartOpen() {

    document.getElementById('cart').classList.toggle("show-cart");

    document.getElementById('vase-card').classList.remove("show");

    let msg = document.getElementById('card-switch').innerText;

    if(msg == "scatter_plot" && document.getElementById('vase-card').classList == "show") {
        msg = "close";
        document.getElementById('card-switch').innerText = msg;
    } else if (msg == "close") {
        msg = "scatter_plot";
        document.getElementById('card-switch').innerText = msg;
    }


}


function cartClose(){
    document.getElementById('cart').classList.remove("show-cart");
}

function imgClose(){
    document.getElementById('vase-pic-holder').classList.remove("show-img-holder");
    document.getElementById('hands-pic-holder').classList.remove("show-img-holder");
}

// function imgClose(){
//     document.getElementById('vase-pic-holder').classList.remove("show-img-holder");
// }

function expandVaseImg() {
    document.getElementById('vase-pic-holder').classList.toggle("show-img-holder");
}

function expandHandsImg() {
    document.getElementById('hands-pic-holder').classList.toggle("show-img-holder");
}


