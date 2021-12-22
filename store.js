// if(document.readyState='loading'){
//     document.addEventListener('DOMContentLoaded',ready)
// }else{
//     ready()
// }
ready()


function ready() {
    var removeCartBtn = document.getElementsByClassName('btn-danger')
    // console.log(removeCartBtn)

    for (var i = 0; i < removeCartBtn.length; i++) {
        var btn = removeCartBtn[i]
        btn.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartItems = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartItems.length; i++) {
        var btn = addToCartItems[i]
        btn.addEventListener('click', addToCartClicked)
    }
}

function addToCartClicked(event) {
    var btn = event.target
    console.log('clicked..!')
    var shopItem = btn.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText

    console.log(title, price, imageSrc)
    addToCart(title, price, imageSrc)
}

function addToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.innerText = title
    var cartItems = document.getElementsByClassName('cart-items')[0]
    console.log(cartItems)

    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("Item already in cart")
            return
        }
    }
    var cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    console.log(cartItems[cartItems.length - 1], cartItems)
    updateTotal()
}


function quantityChanged(event) {
    var quantity = event.target.value
    if (isNaN(quantity) || quantity <= 0) {
        alert("quantity can't be "+quantity)
        event.target.value = 1
    }
    updateTotal()
}
function removeCartItem(event) {
    var btn = event.target
    btn.parentElement.parentElement.remove()
    updateTotal()
}
function updateTotal() {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    // console.log(cartItems)
    var cartRows = cartItems.getElementsByClassName('cart-row')
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var row = cartRows[i]
        var priceElement = row.getElementsByClassName('cart-price')[0]
        var quantityElement = row.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.slice(1))
        var quantity = parseInt(quantityElement.value)
        total = total + price * quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = "$" + total
}