var updateBtns = document.getElementsByClassName('update-cart')

for(let i=0;i<updateBtns.length;i++){
    updateBtns[i].addEventListener('click',function(){
        var productId = this.dataset.product
        var action = this.dataset.action

            if(user == 'AnonymousUser'){
                addCookieItem(productId,action)
            }else{
                updateUserOrder(productId,action)
            }
        }
    )
}

function addCookieItem(productId,action){

    if(action=="add"){
        if(cart[productId] == undefined){
            cart[productId] = {'quantity':1};
        }
        else{
            cart[productId]['quantity'] += 1;
        }
    }

    if(action=="remove"){
        cart[productId]['quantity'] -= 1
        if(cart[productId]['quantity'] <= 0){
            delete cart[productId]
        }
    }
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain;path=/"
    window.location.reload()
}

const updateUserOrder = async(productId,action)=>
{

    var data = { 'productId': productId, 'action': action }
    var url = '/update_item/'
   const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken':csrftoken,
        },
        body: JSON.stringify(data)
    })
    if(response.ok){
        location.reload()
    }
    const res_data = await response.json()
}