window.common = {
    login : () => {

    },
    logout : () => {

    },
    add_to_cart : (id, name, price) => {
        dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
                items: [{
                    item_id: "cart_"+id,
                    item_name: name,
                    price: price,
                    quantity: 1
                }]
            }
        });
    },
    purchase : () => {

    },
    begin_checkout : () => {

    },
    view_item : () => {

    },
    search : () => {

    },
    thankyou : () => {

    }
}