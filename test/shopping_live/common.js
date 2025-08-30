window.common = {
    login : () => {

    },
    logout : () => {

    },
    add_to_cart : (product) => {
        if (product) {
            dataLayer.push({
                event: 'add_to_cart',
                ecommerce: {
                    items: [{
                        item_id: "cart_"+product.id,
                        item_name: product.name,
                        price: product.price,
                        quantity: 1
                    }]
                }
            });
        }
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